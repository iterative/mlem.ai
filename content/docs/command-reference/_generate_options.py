import json
import re
from typing import Dict, List

from pydantic import BaseModel, parse_obj_as

from _generate_cli_spec import Args, Opt, Spec

DOC_AUTO_REPLACE = {
    "MLEM Object": "[MLEM Object](/doc/user-guide/basic-concepts#mlem-objects)"
}


def replace_section(data: str, section_name: str, new_value: str,
                    section_prefix: str = "## ") -> str:
    return re.sub(f"{section_prefix}{section_name}(.*?)^{section_prefix}",
                  f"{section_prefix}{section_name}{new_value}{section_prefix}",
                  data, flags=re.MULTILINE | re.DOTALL)


def repr_option(option: Opt):
    return f"- `{option.decl}`: {option.help}"


def generate_options(options: List[Opt]):
    res = ["", ""]
    for option in options:
        res.append(repr_option(option))
    return "\n".join(res + ["", ""])


def generate_usage(usage, argspec: Args):
    if argspec.args:
        args = '\n'.join(repr_option(a) for a in argspec.args)
        args = f"\n\nArguments:\n{args}"
    else:
        args = ""
    if argspec.impls:
        impls = "\n".join(f"- {c}" for c in argspec.impls)
        impls = f"\n\nBuiltin {argspec.impl_metavar}s:\n{impls}"
    else:
        impls = ""
    if argspec.subcommands:
        subcommands = "\n".join(
            f"- {k}: {v}" for k, v in argspec.subcommands.items())
        subcommands = f"\n\nSubcommands:\n{subcommands}"
    else:
        subcommands = ""
    return f"\n{usage}{subcommands}{impls}{args}\n"


def generate_doc(doc):
    for k, v in DOC_AUTO_REPLACE.items():
        doc = doc.replace(k, v)
    return f"\n\n{doc}\n\n"


def generate_cli_command(name: str, spec: Spec):
    with open(f"{name}.md", "r", encoding="utf8") as f:
        data = f.read()

    data = replace_section(data, "usage", generate_usage(spec.usage, spec.args),
                           section_prefix="```")
    data = replace_section(data, "Options", generate_options(spec.options))

    cmd_name = name.replace("/", " ")
    if cmd_name.endswith(" index"):
        cmd_name = cmd_name[:-len(" index")]
    data = replace_section(data, " " + cmd_name, generate_doc(spec.doc),
                           section_prefix="#")
    with open(f"{name}.md", "w", encoding="utf8") as f:
        f.write(data)


class AllSpec(BaseModel):
    __root__: Dict[str, Spec]


def main():
    with open("spec.json", "r", encoding="utf8") as f:
        spec = parse_obj_as(AllSpec, json.load(f))

    for k, s in spec.__root__.items():
        generate_cli_command(k, s)


if __name__ == '__main__':
    from _generate_cli_spec import main as spec_main

    spec_main()
    main()
