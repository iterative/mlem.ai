# deployment apply

Apply a deployed model to data.

## Synopsis

```usage
usage: mlem deployment apply [options] path data

arguments:
- `path`: Path to deployment meta [required]
- `data`: Path to data object [required]
```

## Description

The `deployment apply` command lets us apply MLEM deployments (deployed models)
to data (MLEM object). This means the server's method endpoints (such as
`predict` by default) will be called with the given data and the outputs
gathered and returned, also as a MLEM Object.

## Options

- `-p <path>, --project <path>`: Path to MLEM project [default: (none)]
- `--rev TEXT`: Repo revision to use [default: (none)]
- `--dr <path>, --data-project <path>`: Project with data
- `--data-rev TEXT`: Revision of data
- `-o TEXT, --output TEXT`: Where to store the outputs.
- `--tp <path>, --target-project <path>`: Project to save target to [default:
(none)]
- `-m TEXT, --method TEXT`: Which model method is to be applied [default:
predict]
- `--index / --no-index`: Whether to index output in .mlem directory
- `--json`: Output as json
- `-h, --help`: Show this message and exit.

## Example: Apply a dataset on a deployed model

```cli
$ mlem deployment apply service_name mydata --method predict
```
