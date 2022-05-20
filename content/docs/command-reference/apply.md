# apply

Apply a model to a dataset. Resulting dataset will be saved as MLEM object to
`output` if it is provided, otherwise will be printed.

## Synopsis

```usage
usage: mlem apply [options] model data

arguments:
MODEL  Path to model object  [required]
DATA   Path to dataset object  [required]
```

## Description

Models and Datasets which are
[MLEM objects](/doc/user-guide/basic-concepts#mlem-objects) can be used directly
through command line. Such models can be applied to a dataset i.e. their methods
(such as predict) can be called with the dataset to get outputs and results
(again as a MLEM Object). This workflow avoids the need of writing python
scripts to load models and datasets and then subsequently use them.

## Options

- `-r, --repo TEXT`: Path to MLEM repo [default: (none)]
- `--rev TEXT`: Repo revision to use [default: (none)]
- `-o, --output TEXT`: Where to store the outputs.
- `-m, --method TEXT`: Which model method is to be applied [default: predict]
- `--data-repo, --dr TEXT`: Repo with dataset
- `--data-rev TEXT`: Revision of dataset
- `-i, --import`: Try to import data on-the-fly
- `--import-type, --it TEXT`: Specify how to read data file for import.
  Available types: ['pandas', 'pickle']
- `-b, --batch_size INTEGER`: Batch size for reading data in batches.
- `--index / --no-index`: Whether to index output in .mlem directory
- `-e, --external`: Save result not in .mlem, but directly in repo
- `--json`: Output as json
- `-h, --help`: Show this message and exit.

## Examples

```mlem
Apply local mlem model to local mlem dataset
$ mlem apply mymodel mydatset --method predict --output myprediction

Apply local mlem model to local data file
$ mlem apply mymodel data.csv --method predict --import --import-type pandas[csv] --output myprediction

Apply a version of remote model to a version of remote dataset
$ mlem apply rf --repo https://github.com/iterative/example-mlem-get-started --rev main
                iris.csv --data-repo https://github.com/iterative/example-mlem-get-started --data-rev main
                --method predict --output myprediction
```
