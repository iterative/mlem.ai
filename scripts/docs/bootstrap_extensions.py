import importlib
import inspect
import json
import os.path
import string
import textwrap
from dataclasses import dataclass
from typing import Any, Iterator, List, Tuple, Type
import re

from pydantic import BaseModel, ValidationError
from pydantic.fields import ModelField
from pydantic.typing import display_as_type, get_args, is_union
from typing_extensions import get_origin

from mlem import ExtensionLoader
from mlem.cli.utils import get_field_help
from mlem.core.base import MlemABC, smart_split
from mlem.core.objects import MlemObject
from mlem.ext import Extension, get_ext_type
from mlem.utils.entrypoints import load_entrypoints

SIDEBAR_PATH = "../../content/docs/sidebar.json"
EXTENSIONS_SLUG = "extensions"
EXTENSIONS_DIR = "../../content/docs/extensions"

DOC_REPLACEMENTS = {
    "ModelType": "[ModelType](/doc/user-guide/mlem-abcs#modeltype)",
    "ModelIO": "[ModelIO](/doc/user-guide/mlem-abcs#modelio)"
}

LINE_WIDTH = 80

def add_extension_to_sidebar(type_, slug, label, source):
    with open(SIDEBAR_PATH, "r") as f:
        data = json.load(f)

    extensions = [o for o in data if o["slug"] == EXTENSIONS_SLUG][0]
    types = extensions["children"]
    children = [o for o in types if o["slug"] == type_][0]["children"]
    if any(c["slug"] == slug for c in children):
        return
    children.append({
        "slug": slug,
        "label": label,
        "source": source
    })
    with open(SIDEBAR_PATH, "w") as f:
        json.dump(data, f, indent=2)


def get_extension_doc(module_doc: str):
    doc = "\n\n".join(module_doc.split("\n\n")[1:])
    for key, value in DOC_REPLACEMENTS.items():
        doc = doc.replace(key, value)
    return textwrap.fill(doc.replace("\n\n", "\n"), width=LINE_WIDTH, break_on_hyphens=False)


def get_extension_reqs(ext: Extension):
    if not ext.reqs:
        return ""
    extra = ext.extra or ext.module.split(".")[-1]
    reqs = " ".join(ext.reqs_packages)
    return f"""```bash
pip install mlem[{extra}]
# or
pip install {reqs}
```"""


@dataclass
class Field:
    name: str
    required: bool
    type_: str
    default: Any
    help_: str


def iterate_type_fields(
        cls: Type[BaseModel]
) -> Iterator[Field]:
    """Recursively get CliTypeFields from BaseModel"""
    field: ModelField
    for name, field in sorted(
            cls.__fields__.items(), key=lambda x: not x[1].required
    ):
        name = field.alias or name
        if (
                issubclass(cls, MlemABC)
                and name in cls.__config__.exclude
                or field.field_info.exclude
        ):
            # Skip excluded fields
            continue

        field_type = field.outer_type_
        # field.type_ is element type for collections/mappings

        if not isinstance(field_type, type):
            # skip too complicated stuff
            continue

        yield Field(name=name, type_=repr_field_type(field_type),
                    required=bool(field.required), default=field.default,
                    help_=get_field_help(cls, name))


def repr_field_type(type_: Type) -> str:
    if isinstance(type_, type):
        return type_.__name__

    origin = get_origin(type_)
    if is_union(origin):
        # get first type for union
        generic_args = get_args(type_)
        args = ", ".join(repr_field_type(a) for a in generic_args)
        return f"Union[{args}]"
    if origin is list or origin is dict:
        return display_as_type(type_)

    if type_ is Any:
        return "Any"

    raise ValueError(f"Unknown type: {type_}")

def default_value(fd):
    try:
        return fd.__class__()
    except ValidationError:
        return ...

def repr_field_default(field: Field) -> Tuple[str, Type]:
    fd = field.default
    default = f" = {fd}" if fd is not None and fd != "" else ""
    if default == " = " or issubclass(fd.__class__, BaseModel) and fd == default_value(fd):
        default = f" = {fd.__class__.__name__}()"
    if isinstance(fd, str):
        default = f" = \"{fd}\""
    add_type = None
    if isinstance(fd, BaseModel) and not issubclass(fd.__class__, MlemABC):
        add_type = fd.__class__
    return default, add_type

def with_prev_and_next(iterable):
    prev = None
    current = None
    for o in iterable:
        if current is not None:
            yield prev, current, o
        prev = current
        current = o
    yield current, o, ""

def smart_wrap(value: str, width: int, subsequent_indent: str = ""):
    SPECIAL = "\0"
    QUOTES = "'\"`"
    quotes_open = {q: False for q in QUOTES}
    chars = []
    new_word = False
    for prev, c, nxt in with_prev_and_next(value):
        if nxt in string.ascii_letters:
            new_word = True
        if quotes_open.get(c):
            quotes_open[c] = False
            chars.append(c)
            new_word = False
            continue
        if any(quotes_open.values()) or new_word is False:
            chars.append(SPECIAL if c == " " else c)
            continue
        if c in QUOTES and prev == " ":
            quotes_open[c] = True
        chars.append(c)

    return textwrap.fill("".join(chars), width=width, subsequent_indent=subsequent_indent, break_on_hyphens=False, break_long_words=False).replace(SPECIAL, " ")

def repr_field(field: Field) -> Tuple[str, Type]:
    req = " _(required)_" if field.required else ""
    default, add_type = repr_field_default(field)
    help_ = re.subn(r"\s+", " ", field.help_)[0]
    return smart_wrap(f"- `{field.name}: {field.type_}{default}`{req} - {help_}", width=LINE_WIDTH, subsequent_indent="  "), add_type


def get_impl_docstring(type_):
    doc = inspect.cleandoc(type_.__doc__ or "Class docstring missing").strip()
    return "\n".join(
        f"{textwrap.fill('    ' + line, subsequent_indent='    ', width=LINE_WIDTH - 5)}" for line in
        doc.splitlines())


def get_impl_description(type_: Type[MlemABC]) -> Tuple[str, List[Type]]:
    fields_doc = "**No fields**"
    fields = list(iterate_type_fields(type_))
    add_types = []
    if fields:
        fields_doc = "**Fields**:\n\n"
        fds = []
        for f in fields:
            fd, add_type = repr_field(f)
            fds.append(fd)
            if add_type:
                add_types.append(add_type)
        fields_doc += "\n\n".join(fds)
    doc = get_impl_docstring(type_)
    return f"""### `class {type_.__name__}`

**MlemABC parent type**: `{type_.abs_name}`

**MlemABC type**: `{type_.__get_alias__()}`

{doc}

{fields_doc}
""", add_types


def get_model_description(type_: Type[BaseModel]) -> str:
    fields_doc = "**No fields**"
    fields = list(iterate_type_fields(type_))
    if fields:
        fields_doc = "**Fields**:\n\n"
        fields_doc += "\n\n".join(repr_field(f)[0] for f in fields)
    doc = get_impl_docstring(type_)
    return f"""### `class {type_.__name__}`

{doc}

{fields_doc}
"""


def get_extension_impls(ext: Extension):
    eps = load_entrypoints()
    ext_eps = {
        k: v for k, v in eps.items() if v.ep.module_name.startswith(ext.module)
    }
    add_types = set()
    descr = []
    for e in ext_eps.values():
        d, add = get_impl_description(e.ep.load())
        descr.append(d)
        add_types.update(add)
    for add in add_types:
        descr.append(get_model_description(add))
    return "\n---\n\n".join(descr)


def get_extension_md(ext: Extension) -> str:
    module_doc = importlib.import_module(ext.module).__doc__
    title = module_doc.splitlines()[0].title()
    doc = get_extension_doc(module_doc)
    reqs = get_extension_reqs(ext)
    if reqs:
        reqs = f"""
## Requirements

{reqs}
"""
    implementations = get_extension_impls(ext)
    return f"""# {title}

{doc}
{reqs}
## Examples

```python

```

## Implementation reference

{implementations}"""


def create_extension_page(type_: str, name: str, ext: Extension,
                          overwrite: bool = False):
    filename = f"{type_}/{name.lower()}.md"
    path = os.path.join(EXTENSIONS_DIR, filename)
    if os.path.exists(path):
        if not overwrite:
            return
        os.unlink(path)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        f.write(get_extension_md(ext))
    add_extension_to_sidebar(type_, name.lower(), name.capitalize(), filename)


def main():
    for mod, ext in ExtensionLoader.builtin_extensions.items():
        ext_name = mod.split(".")[-1]
        ext_type = get_ext_type(mod)
        print(ext_name, ext_type)
        create_extension_page(ext_type, ext_name, ext, overwrite=True)


if __name__ == '__main__':
    main()