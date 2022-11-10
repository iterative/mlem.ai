# check-ref

Find out the artifact version registered/assigned with ref.

## Synopsis

```usage
usage: gto check-ref [-r <text>] [--json] [--name] [--version]
                     [--event] [--stage] [-h]
                     ref

arguments:
  ref              Git reference to analyze
```

## Description

## Options

- `-r <text>`, `--repo <text>` - Local or remote repository [default: .]
- `--json` - Print output in json format
- `--name` - Show artifact name
- `--version` - Output artifact version
- `--event` - Show event
- `--stage` - Show artifact stage
- `-h`, `--help` - Show this message and exit.

## Examples

    $ gto check-ref rf@v1.0.0
    $ gto check-ref rf#prod --name
    $ gto check-ref rf#prod --version
