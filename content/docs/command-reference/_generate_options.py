import json
import os
import re
import textwrap
from typing import Dict, List

from pydantic import BaseModel, parse_obj_as

from _generate_cli_spec import Opt, Spec

DOC_AUTO_REPLACE = {
    "MLEM Object": "[MLEM Object](/doc/user-guide/basic-concepts#mlem-objects)",
    "MLEM project": "[MLEM project](/doc/user-guide/project-structure)"
}
LINE_WIDTH = 80


def replace_section(data: str, section_name: str, new_value: str,
                    section_prefix: str = "## ") -> str:
    return re.sub(f"{section_prefix}{section_name}(.*?)^{section_prefix}",
                  f"{section_prefix}{section_name}{new_value}{section_prefix}",
                  data, flags=re.MULTILINE | re.DOTALL)


def repr_option(option: Opt):
    decls = ", ".join(f"`{d} <{option.metavar.lower()}>`" for d in option.decls)
    if option.is_flag:
        decls = ", ".join(f"`{d}`" for d in option.decls)
        if option.secondary:
            decls += " / " + ", ".join(f"`{d}`" for d in option.secondary)
    return textwrap.fill(f"- {decls} - {option.help}", width=LINE_WIDTH,
                         subsequent_indent="  ")


def repr_arg(option: Opt):
    margin = 17
    metavar = option.metavar.lower()
    option_help = option.help
    if option_help.endswith(" [required]"):
        option_help = option_help[:-len(" [required]")]
    return textwrap.fill(f"  {metavar:{margin}}{option_help}", width=LINE_WIDTH,
                         subsequent_indent=" " * (margin + 2))


def generate_options(options: List[Opt]):
    res = ["", ""]
    for option in options:
        res.append(repr_option(option))
    return "\n".join(res + ["", ""])


def _gen_usage_string(spec: Spec):
    usage = f"usage: mlem {spec.name} "
    indent = len(usage)
    options = []
    for opt in spec.options:
        decl = min(opt.decls, key=len)
        metavar = opt.metavar.lower()
        if metavar == "boolean":
            options.append(f"[{decl}]")
        else:
            options.append(f"[{decl} <{metavar}>]")
    max_opts_len = min(45, LINE_WIDTH - indent)
    option_lines = [""]
    for o in options:
        line = f"{option_lines[-1]}{o} "
        if len(line) > max_opts_len:
            option_lines[-1] = option_lines[-1].strip()
            option_lines.append(o + " ")
        else:
            option_lines[-1] = line
    options = ("\n" + " " * indent).join(option_lines)
    impl = ""
    if spec.args.impl_metavar:
        impl = f"[<{spec.args.impl_metavar}> [{spec.args.impl_metavar} options] | --load <declaration>]"
    args = impl + " ".join(a.metavar for a in spec.args.args).lower()
    if spec.args.subcommands:
        args += "command "
    res = f"{usage}{options}"
    if args:
        res += "\n" + " " * indent + f"{args}"
    return res


def generate_usage(spec: Spec):
    usage = _gen_usage_string(spec)
    argspec = spec.args
    if argspec.args:
        args = '\n'.join(repr_arg(a) for a in argspec.args)
        args = f"\n\narguments:\n{args}"
    else:
        args = ""
    if argspec.impls:
        impls = "\n".join(f"- {c}" for c in argspec.impls)
        impls = f"\n\nBuiltin {argspec.impl_metavar}s:\n{impls}"
    else:
        impls = ""
    if argspec.subcommands:
        margin = 17
        subcommands = "\n".join(
            f"  {k:{margin}}{v}" for k, v in argspec.subcommands.items())
        subcommands = f"\n\nsubcommands:\n{subcommands}"
    else:
        subcommands = ""
    usage = usage[0].lower() + usage[1:]
    return f"\n{usage}{subcommands}{impls}{args}\n"


def generate_doc(doc):
    for k, v in DOC_AUTO_REPLACE.items():
        doc = doc.replace(k, v)
    return f"\n\n{textwrap.fill(doc, width=LINE_WIDTH)}\n\n"


def generate_cli_command(name: str, spec: Spec):
    with open(f"{name}.md", "r", encoding="utf8") as f:
        data = f.read()

    data = replace_section(data, "usage", generate_usage(spec),
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

    # spec.__root__ = {"apply": spec.__root__["apply"]}
    for k, s in spec.__root__.items():
        generate_cli_command(k, s)

    os.unlink("spec.json")


if __name__ == '__main__':
    from _generate_cli_spec import main as spec_main

    spec_main()
    main()
