# import

Create a MLEM model or dataset metadata from a file/directory.

> This is useful to quickly make existing datasets and model files compatible
> with MLEM, which can then be used in future operations such as `mlem apply`.

## Synopsis

```usage
usage: mlem import [options] uri target

arguments:
URI     File to import  [required]
TARGET  Path whare to save MLEM object  [required]
```

## Description

Use `import` on an existing datasets or model files (or directories) to
auto-generate the necessary MLEM metadata (`.mlem`) files for them. This command
provides a quick and easy alternative to writing python code to load those
models/datasets into object for subsequent usage in MLEM context.

## Options

- `-r, --repo TEXT`: Path to MLEM repo [default: (none)]
- `--rev TEXT`: Repo revision to use [default: (none)]
- `--target-repo, --tr TEXT`: Repo to save target to [default: (none)]
- `--copy / --no-copy`: Whether to create a copy of file in target location or
  just link existing file [default: copy]
- `--type TEXT`: Specify how to read file Available types: ['pandas', 'pickle']
  [default: (auto infer)]
- `--index / --no-index`: Whether to index output in .mlem directory
- `-e, --external`: Save result not in .mlem, but directly in repo
- `-h, --help`: Show this message and exit.

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
$ mlem import .mlem/model/rf --repo https://github.com/iterative/example-mlem-get-started --rev simple data/imported_model --type pickle
💾 Saving model to .mlem/model/data/imported_model.mlem
```
