# describe

Display enrichments for an artifact.

## Synopsis

```usage
usage: gto describe [-r <text>] [--rev <text>] [--type] [--path]
                    [--description] [-h]
                    name

arguments:
  name             Artifact name
```

## Description

To get details about an artifact (from `artifacts.yaml`) use `gto describe`:

```cli
$ gto describe churn -r https://github.com/iterative/example-gto
{
    "type": "model",
    "path": "models/churn.pkl",
    "virtual": false
}
```

The output is in JSON format for ease of parsing programatically.

## Options

- `-r <text>`, `--repo <text>` - Local or remote repository [default: .]
- `--rev <text>` - Repo revision to use
- `--type` - Show type
- `--path` - Show path
- `--description` - Show description
- `-h`, `--help` - Show this message and exit.
