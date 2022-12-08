import inspect
import os
import re
import textwrap
from pathlib import Path

from utils import replace_section, place_links_in_doc, run_lint

DOCS_PATH = Path(__file__).parent.parent.parent / "content" / "docs"
API_DOCS_PATH = str(DOCS_PATH / "api-reference")


def get_signature(cmd):
    source = inspect.getsource(cmd)
    source = "\n".join(l for l in source.split("\n") if not l.startswith("@"))
    return source.split('"""')[0].strip().strip(":")


def get_docs(cmd):
    docs = cmd.__doc__
    if not docs:
        raise ValueError(f"Command {cmd} has no docstring")
    return docs


def generate_signature(cmd):
    docs = get_docs(cmd)
    docs = docs.split("Args:")[0].strip()
    docs = re.subn("\s+", " ", docs)[0]
    docs = textwrap.fill(docs, width=79)
    docs = docs if docs[-1] == "." else f"{docs}."
    return f"""
{docs}

```py
{get_signature(cmd)}
```
"""


def generate_parameters(cmd, sep="\n- "):
    # to add "(required)" or "(optional)"
    required_params = (
            len(inspect.signature(cmd).parameters)
            - len(cmd.__defaults__ or {})
            - len(cmd.__kwdefaults__ or {})
    )
    docs = get_docs(cmd)
    docs = docs.split("Args:\n")[1].split("Returns:")[0]
    default_spaces = default_spaces = len(docs) - len(docs.lstrip())
    docs = docs.strip()
    params = []
    for line in docs.split("\n"):
        spaces = len(line) - len(line.lstrip(" "))
        line = line.lstrip(" ")
        # if the line is a continuation of a previous one
        if spaces > default_spaces:
            params[-1] += line
        else:
            if required_params > 0:
                line = "**`" + line.replace(":", "`** (required) -")
                required_params -= 1
            else:
                line = "`" + line.replace(":", "` (optional) -")
            params.append(line)
    return sep + sep.join(params) + "\n\n"


def generate_returns(cmd, sep="\n- "):
    docs = get_docs(cmd)
    docs = docs.split("Returns:")[1].strip()
    if ":" in docs:
        docs = "`" + docs.replace(":", "`:")
    # docs = docs.replace("None", "`None`")
    return f"\n{docs}\n"


def check_command(cmd, name, path):
    with open(path, "r", encoding="utf8") as f:
        content = f.read()

    if "## Returns" not in content:
        content = content.replace("## Exceptions",
                                  "## Returns\n\n## Exceptions")

    content = replace_section(
        content,
        f"mlem.api.{name}()",
        place_links_in_doc(generate_signature(cmd)),
        section_prefix="#",
    )
    # assert "### Usage" in content, "Usage section not found"
    content = replace_section(content, "Parameters", generate_parameters(cmd))
    content = replace_section(content, "Returns", generate_returns(cmd))

    with open(path, "w", encoding="utf8") as f:
        f.write(content)


def generate_api():
    from mlem import api

    commands = []
    not_commands = []
    for k, v in api.__dict__.items():
        if k.startswith("__") or not callable(v):
            not_commands.append(k)
        else:
            commands.append(v)

    for cmd in commands:
        name = cmd.__name__
        cmd_path = os.path.join(API_DOCS_PATH, name + ".md")
        if not os.path.exists(cmd_path):
            print(f"creating {name}")
        else:
            print(f"checking {name}")
            if hasattr(cmd, "__wrapped__"):
                cmd = cmd.__wrapped__

            check_command(cmd, name, cmd_path)


def main():
    generate_api()


if __name__ == "__main__":
    main()
    run_lint()
