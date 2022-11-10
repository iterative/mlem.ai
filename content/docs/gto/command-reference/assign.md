# assign

Assign stage to specific artifact version.

## Synopsis

```usage
usage: gto assign [-r <text>] [--version <text>]
                  [--stage <text>] [-m <text>]
                  [--simple <text>] [--force] [--push] [--sr]
                  [-h]
                  name [ref]

arguments:
  name             Artifact name
  [ref]            Git reference to use
```

## Description

## Options

- `-r <text>`, `--repo <text>` - Local or remote repository [default: .]
- `--version <text>` - If you provide REF, this will be used to name new version
- `--stage <text>` - Stage to assign
- `-m <text>`, `--message <text>` - Message to annotate git tag with
- `--simple <text>` - [auto, true, false] Use simple notation, e.g. rf#prod
  instead of rf#prod-5 [default: auto]
- `--force` - Create a git tag even if it already exists and is in effect
- `--push` - Push created tag automatically (experimental)
- `--sr`, `--skip-registration` - Don't register a version at specified commit
- `-h`, `--help` - Show this message and exit.

## Examples

    Assign "nn" to "prod" at specific ref:
    $ gto assign nn abcd123 --stage prod

    Assign specific version:
    $ gto assign nn --version v1.0.0 --stage prod

    Assign at specific ref and name version explicitly:
    $ gto assign nn abcd123 --version v1.0.0 --stage prod

    Assign without increment:
    $ gto assign nn HEAD --stage prod --simple
