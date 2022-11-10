# show

Show the registry state, highest version, or what's assigned in stage.

## Synopsis

```usage
usage: gto show [-r <text>] [-a] [-A] [--json] [--plain]
                [--name] [--version] [--stage] [--ref]
                [--ro] [--av <integer>] [--vs <integer>]
                [--sort <text>] [-h]
                [name]

arguments:
  [name]           Artifact name to show. If empty, show registry
```

## Description

## Options

- `-r <text>`, `--repo <text>` - Local or remote repository [default: .]
- `-a`, `--all-branches` - Read heads from all branches
- `-A`, `--all-commits` - Read all commits
- `--json` - Print output in json format
- `--plain` - Print table in grep-able format
- `--name` - Show artifact name
- `--version` - Output artifact version
- `--stage` - Show artifact stage
- `--ref` - Show ref
- `--ro`, `--registered-only` - Show only registered versions
- `--av <integer>`, `--assignments-per-version <integer>` - Show N last stages
  for each version. -1 for all [default: -1]
- `--vs <integer>`, `--versions-per-stage <integer>` - Show N last versions for
  each stage. -1 for all. Applied after 'assignments-per-version' [default: 1]
- `--sort <text>` - Order assignments by timestamp or semver [default:
  timestamp]
- `-h`, `--help` - Show this message and exit.

## Examples

    Show the registry:
    $ gto show

    Show versions of specific artifact in registry:
    $ gto show nn

    Show greatest version or what's in stage:
    $ gto show nn@greatest
    $ gto show nn#prod
