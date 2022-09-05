# deployment apply

Apply a deployed model to data.

## Synopsis

```usage
Usage: mlem deployment apply [options] path data

Arguments:
- `PATH`: Path to deployment meta [required]
- `DATA`: Path to data object [required]
```

## Description

The `deployment apply` command lets us apply MLEM deployments (deployed models)
to data (MLEM object). This means the server's method endpoints (such as
`predict` by default) will be called with the given data and the outputs
gathered and returned, also as a MLEM Object.

## Options

- `-p, --project TEXT`: Path to MLEM project [default: (none)]
- `--rev TEXT`: Repo revision to use [default: (none)]
- `--data-project, --dr TEXT`: Project with data
- `--data-rev TEXT`: Revision of data
- `-o, --output TEXT`: Where to store the outputs.
- `--target-project, --tp TEXT`: Project to save target to [default: (none)]
- `-m, --method TEXT`: Which model method is to be applied [default: predict]
- `--index / --no-index`: Whether to index output in .mlem directory
- `--json`: Output as json
- `--help`: Show this message and exit.

## Example: Apply a dataset on a deployed model

```cli
$ mlem deployment apply service_name mydata --method predict
```
