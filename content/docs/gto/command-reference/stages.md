# stages

Print list of stages used in the registry.

## Synopsis

```usage
usage: gto stages [-r <text>] [--allowed] [--used] [--json]
                  [-h]
```

## Description

## Options

- `-r <text>`, `--repo <text>` - Local or remote repository [default: .]
- `--allowed` - Show allowed stages from config
- `--used` - Show stages that were ever used (from all git tags)
- `--json` - Print output in json format
- `-h`, `--help` - Show this message and exit.

## Examples

    $ gto stages
    $ gto stages --allowed
