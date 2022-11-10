# history

Show a journal of registry operations.

## Synopsis

```usage
usage: gto history [-r <text>] [-a] [-A] [--json] [--plain]
                   [--asc] [-h]
                   [name]

arguments:
  [name]           Artifact name to show. If empty, show all.
```

## Description

## Options

- `-r <text>`, `--repo <text>` - Local or remote repository [default: .]
- `-a`, `--all-branches` - Read heads from all branches
- `-A`, `--all-commits` - Read all commits
- `--json` - Print output in json format
- `--plain` - Print table in grep-able format
- `--ascending`, `--asc` - Show new first
- `-h`, `--help` - Show this message and exit.

## Examples

    $ gto history nn

    Use --all-branches and --all-commits to read more than just HEAD:
    $ gto history nn --all-commits
