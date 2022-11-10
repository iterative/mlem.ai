# describe

Display enrichments for an artifact

## Synopsis

```usage
usage: gto describe [-r <text>] [--rev <text>] [--type] [--path]
                    [--description] [-h]
                    name

arguments:
  name             Artifact name
```

## Description

## Options

- `-r <text>`, `--repo <text>` - Local or remote repository [default: .]
- `--rev <text>` - Repo revision to use
- `--type` - Show type
- `--path` - Show path
- `--description` - Show description
- `-h`, `--help` - Show this message and exit.

## Examples

    $ gto describe nn --rev HEAD
    $ gto describe nn@v0.0.1
