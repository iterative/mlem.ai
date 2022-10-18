# deployment apply

Apply a deployed model to data.

## Synopsis

```usage
usage: mlem deployment apply [-p <path>] [--rev <commitish>]
                             [--dp <path>] [--dr <commitish>] [-o <text>]
                             [--tp <path>] [-m <text>] [--json] [-h]
                             path data

arguments:
  path             Path to deployment meta
  data             Path to data object
```

## Description

The `deployment apply` command lets us apply MLEM deployments (deployed models)
to data (MLEM object). This means the server's method endpoints (such as
`predict` by default) will be called with the given data and the outputs
gathered and returned, also as a MLEM Object.

## Options

- `-p <path>`, `--project <path>` - Path to MLEM project [default: (none)]
- `--rev <commitish>` - Repo revision to use [default: (none)]
- `--dp <path>`, `--data-project <path>` - Project with data
- `--dr <commitish>`, `--data-rev <commitish>` - Revision of data
- `-o <text>`, `--output <text>` - Where to store the outputs.
- `--tp <path>`, `--target-project <path>` - Project to save target to [default:
  (none)]
- `-m <text>`, `--method <text>` - Which model method is to be applied [default:
  predict]
- `--json` - Output as json
- `-h`, `--help` - Show this message and exit.

## Example: Apply a dataset on a deployed model

```cli
$ mlem deployment apply service_name mydata --method predict
```
