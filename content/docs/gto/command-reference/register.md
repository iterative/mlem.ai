# register

Create an artifact version to signify an important, published or released
iteration

## Synopsis

```usage
usage: gto register [-r <text>] [--ver <text>] [-m <text>]
                    [--simple <text>] [--force] [--bump-major]
                    [--bump-minor] [--bump-patch] [--push] [-h]
                    name [ref]

arguments:
  name             Artifact name
  [ref]            Git reference to use for registration [default: HEAD]
```

## Description

## Options

- `-r <text>`, `--repo <text>` - Local or remote repository [default: .]
- `--version <text>`, `--ver <text>` - Version name in SemVer format
- `-m <text>`, `--message <text>` - Message to annotate git tag with
- `--simple <text>` - [auto, true, false] Use simple notation, e.g. rf#prod
  instead of rf#prod-5 [default: auto]
- `--force` - Create a git tag even if it already exists and is in effect
- `--bump-major` - Bump major version
- `--bump-minor` - Bump minor version
- `--bump-patch` - Bump patch version
- `--push` - Push created tag automatically (experimental)
- `-h`, `--help` - Show this message and exit.

## Examples

    Register new version at HEAD:
    $ gto register nn

    Register new version at a specific ref:
    $ gto register nn abc1234

    Assign version name explicitly:
    $ gto register nn --version v1.0.0

    Choose a part to bump version by:
    $ gto register nn --bump-minor
