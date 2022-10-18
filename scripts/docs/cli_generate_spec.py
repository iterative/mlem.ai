import json
from typing import Dict, List, Optional

from click import Command, Context, Group, Option
from pydantic import BaseModel
from typer.main import get_group

from mlem import cli
from mlem.cli.main import get_cmd_name

use_group = ["deployment"]
skip = ["dev"]

abc_group = ["apply-remote", "build", "declare", "serve"]


class Opt(BaseModel):
    decls: List[str]
    secondary: List[str]
    metavar: str
    help: str
    is_flag: bool


class Args(BaseModel):
    args: List[Opt]
    impls: Optional[List[str]]
    impl_metavar: Optional[str]
    subcommands: Optional[Dict[str, str]]


class Spec(BaseModel):
    args: Args
    options: List[Opt]
    doc: str
    name: str


def get_options(command: Command, ctx):
    if command.name not in abc_group:
        yield from command.get_params(ctx)
        return

    options = None
    for subcommand in command.commands.values():
        if options is None:
            options = list(get_options(subcommand, ctx))
            continue
        new_options = {o.help for o in get_options(subcommand, ctx)}
        options = [o for o in options if o.help in new_options]
    yield from options


def repr_option(option, ctx) -> Opt:
    _, help_ = option.get_help_record(ctx)
    help_ = help_.replace("  ", " ")  # TODO: maybe fix in typer code?
    return Opt(
        decls=sorted(option.opts, reverse=True),
        secondary=sorted(option.secondary_opts, reverse=True),
        metavar=option.make_metavar(),
        help=help_,
        is_flag=option.is_flag if isinstance(option, Option) else False,
    )


def generate_options(command: Command, ctx):
    res = []
    for option in get_options(command, ctx):
        if not isinstance(option, Option):
            continue
        res.append(repr_option(option, ctx))
    return res


def generate_args(command, ctx):
    args = []
    for arg in command.get_params(ctx):
        if isinstance(arg, Option):
            continue
        args.append(repr_option(arg, ctx))
    impls = None
    metavar = None
    subcommands = None
    if command.name in abc_group:
        impls = list(sorted([c for c in command.commands if not c.startswith("_")]))
        metavar = command.subcommand_metavar
        args.extend(generate_args(list(command.commands.values())[0], ctx).args)
    if command.name in use_group:
        subcommands = {
            c.name: c.get_short_help_str() for c in command.commands.values()
        }
    return Args(args=args, impls=impls, impl_metavar=metavar, subcommands=subcommands)


def generate_usage(command: Command, ctx):
    if command.name not in abc_group:
        return command.get_usage(ctx)
    subcommand = list(command.commands.values())[0]
    subctx = Context(subcommand, parent=ctx, info_name=subcommand.name)
    sub_usage = generate_usage(subcommand, subctx)
    return sub_usage.replace(subcommand.name, command.subcommand_metavar)


def generate_cli_command(command: Command, ctx):
    return Spec(
        args=generate_args(command, ctx),
        options=generate_options(command, ctx),
        doc=command.help.strip(),
        name=get_cmd_name(ctx),
    )


def main():
    group = get_group(cli.app)
    ctx = Context(group, info_name="mlem", help_option_names=["-h", "--help"])
    spec = {}
    for name, command in group.commands.items():
        if name in skip:
            continue
        subctx = Context(command, ctx, info_name=name)
        if isinstance(command, Group) and name in use_group:

            spec[f"{name}/index"] = generate_cli_command(command, subctx)
            for subname, subcommand in command.commands.items():
                subsubctx = Context(subcommand, subctx, info_name=subname)
                spec[f"{name}/{subname}"] = generate_cli_command(subcommand, subsubctx)
            continue
        spec[name] = generate_cli_command(command, subctx)

    with open("spec.json", "w", encoding="utf8") as f:
        json.dump({k: v.dict() for k, v in spec.items()}, f, indent=2)


if __name__ == "__main__":
    main()
