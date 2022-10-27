# apply

Apply a model to data. The result will be saved as a
[MLEM Object](/doc/user-guide/basic-concepts) to `output` if provided.
Otherwise, it will be printed to `stdout`.

## Synopsis

```usage
usage: mlem apply [-p <path>] [--rev <commitish>] [-o <path>]
                  [-m <text>] [--dp <path>] [--dr <commitish>]
                  [-i] [--it <text>] [-b <integer>] [--json]
                  [-h]
                  model data

arguments:
  model            Path to model object
  data             Path to data object
```

## Description

Applying a model to data means calling a model's method (e.g. `predict`) with
all the data points in the dataset, and returning the output as a MLEM Object.

This command addresses a very common workflow, replacing the need to write a
Python script to load models & datasets, apply the datasets on the models, and
saving the results.

Models and Data, which represent
[MLEM objects](/doc/user-guide/basic-concepts#mlem-objects), can be used
directly through command line together to easily run inferences on entire
datasets.

## Options

- `-p <path>`, `--project <path>` - Path to MLEM project [default: (none)]
- `--rev <commitish>` - Repo revision to use [default: (none)]
- `-o <path>`, `--output <path>` - Where to save model outputs
- `-m <text>`, `--method <text>` - Which model method is to be applied [default:
  predict]
- `--dp <path>`, `--data-project <path>` - Project with data
- `--dr <commitish>`, `--data-rev <commitish>` - Revision of data
- `-i`, `--import` - Try to import data on-the-fly
- `--it <text>`, `--import-type <text>` - Specify how to read data file for
  import. Available types: ['pandas', 'pickle', 'torch']
- `-b <integer>`, `--batch_size <integer>` - Batch size for reading data in
  batches
- `--json` - Output as json
- `-h`, `--help` - Show this message and exit.

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
