# apply

Apply a model to data. The result will be saved as a MLEM object to `output` if
provided. Otherwise, it will be printed to `stdout`.

## Synopsis

```usage
usage: mlem apply [options] model data

arguments:
MODEL  Path to model object  [required]
DATA   Path to dataset object  [required]
```

## Description

Applying a model to data means calling a model's method (e.g. `predict`) with
all the data points in the dataset, and returning the output as a MLEM Object.

This command addresses a very common workflow, replacing the need to write a
python script to load models & datasets, apply the datasets on the models, and
saving the results.

Models and Data, which represent
[MLEM objects](/doc/user-guide/basic-concepts#mlem-objects), can be used
directly through command line together to easily run inferences on entire
datasets.

## Options

- `-p, --project TEXT`: Path to MLEM project [default: (none)]
- `--rev TEXT`: Repo revision to use [default: (none)]
- `-o, --output TEXT`: Where to store the outputs.
- `-m, --method TEXT`: Which model method is to be applied [default: predict]
- `--data-project, --dr TEXT`: Project with data
- `--data-rev TEXT`: Revision of data
- `-i, --import`: Try to import data on-the-fly
- `--import-type, --it TEXT`: Specify how to read data file for import.
  Available types: ['pandas', 'pickle']
- `-b, --batch_size INTEGER`: Batch size for reading data in batches.
- `--index / --no-index`: Whether to index output in .mlem directory
- `-e, --external`: Save result not in .mlem, but directly in project
- `--json`: Output as json
- `-h, --help`: Show this message and exit.

## Examples

Apply a local MLEM model to a local MLEM dataset

```cli
$ mlem apply mymodel mydata --method predict --output myprediction
```

Apply a local MLEM model to a dataset imported from a local data file

```cli
$ mlem apply mymodel data.csv --method predict --import --import-type pandas[csv] --output myprediction
```

Apply a version of a remote model (from HEAD of `main` branch) to a version of a
remote dataset (again, HEAD of `main` branch)

```cli
$ mlem apply rf --project https://github.com/iterative/example-mlem-get-started --rev main
                iris.csv --data-project https://github.com/iterative/example-mlem-get-started --data-rev main
                --method predict --output myprediction
```
