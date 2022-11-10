# import

Create a `.mlem` [MLEM Object](/doc/user-guide/basic-concepts) for a model or
data in any file or directory.

## Synopsis

```usage
usage: mlem import [-p <path>] [--rev <commitish>]
                   [--tp <path>] [--copy] [--type <text>] [-h]
                   uri target

arguments:
  uri              File to import
  target           Path to save MLEM object
```

## Description

Use `import` on an existing data or model files (or directories) to generate the
necessary `.mlem` metafiles for them. This is useful to quickly make existing
data and model files compatible with MLEM, which then can be used in future
operations such as `mlem apply`.

This command provides a quick and easy alternative to writing Python code to
load those models/datasets into object for subsequent usage in MLEM context.

## Options

- `-p <path>`, `--project <path>` - Path to MLEM project [default: (none)]
- `--rev <commitish>` - Repo revision to use [default: (none)]
- `--tp <path>`, `--target-project <path>` - Project to save target to [default:
  (none)]
- `--copy` / `--no-copy` - Whether to create a copy of file in target location
  or just link existing file [default: copy]
- `--type <text>` - Specify how to read file Available types: ['pandas',
  'pickle', 'torch'] [default: (auto infer)]
- `-h`, `--help` - Show this message and exit.

## Examples

Create a MLEM dataset from a local `.csv` file

```cli
$ mlem import data/data.csv data/imported_data --type pandas[csv]
...
```

Create a MLEM model from local `.pkl` (pickle) file

```cli
$ mlem import data/model.pkl data/imported_model
...
```

Create a MLEM model from remote `.pkl` (pickle) file

```cli
$ mlem import models/rf \
    --project https://github.com/iterative/example-mlem-get-started \
    --rev main \
    data/imported_model \
    --type pickle
💾 Saving model to data/imported_model.mlem
```
