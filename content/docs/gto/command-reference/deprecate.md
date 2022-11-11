# deprecate

Deprecate artifact, deregister a version, or unassign a stage.

## Synopsis

```usage
usage: gto deprecate [-r <text>] [-m <text>] [--simple <text>]
                     [--force] [-d] [--push] [-h]
                     name [version] [stage]

arguments:
  name             Artifact name
  [version]        Artifact version
  [stage]          Stage to unassign
```

## Description

## Options

- `-r <text>`, `--repo <text>` - Local or remote repository [default: .]
- `-m <text>`, `--message <text>` - Message to annotate the Git tag with
- `--simple <text>` - Use simple notation, e.g. `rf#prod` instead of `rf#prod-5`
  [supported values: auto, true, false] [default: auto]
- `--force` - Create the Git tag even if it already exists and is in effect
- `-d`, `--delete` - Delete the git tag(s) instead of creating the new one
- `--push` - Push created tag automatically (experimental)
- `-h`, `--help` - Show this message and exit.

## Examples

    Deprecate an artifact:
    $ gto deprecate nn

    Deprecate a version:
    $ gto deprecate nn v0.0.1

    Unassign a stage:
    $ gto deprecate nn v0.0.1 prod
