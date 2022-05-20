# deploy apply

Apply method of deployed service.

## Synopsis

```usage
usage: mlem deploy apply [options] path data

arguments:
PATH  Path to deployment meta  [required]
DATA  Path to dataset object  [required]
```

## Description

The `deploy apply` command lets us apply deployed models to a dataset i.e. their
methods (such as `predict`) can be called with the dataset to get outputs and
results (again as a MLEM Object).

## Options

- `-r, --repo TEXT`: Path to MLEM repo [default: (none)]
- `--rev TEXT`: Repo revision to use [default: (none)]
- `--data-repo, --dr TEXT`: Repo with dataset
- `--data-rev TEXT`: Revision of dataset
- `-o, --output TEXT`: Where to store the outputs.
- `--target-repo, --tr TEXT`: Repo to save target to [default: (none)]
- `-m, --method TEXT`: Which model method is to be applied [default: predict]
- `--index / --no-index`: Whether to index output in .mlem directory
- `--json`: Output as json
- `-h, --help`: Show this message and exit.

## Examples

```mlem
$ mlem deploy apply service_name mydatset --method predict
```
