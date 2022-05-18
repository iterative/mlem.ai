# import

Create MLEM model or dataset metadata from file/dir

## Synopsis

```usage
usage: mlem import [options] uri target

arguments:
URI     File to import  [required]
TARGET  Path whare to save MLEM object  [required]
```

## Description

With MLEM, one can use existing saved datasets or models and use the `mlem import` command to create the necessary `metadata` files (ending with `.mlem`) for them. This is useful to quickly make the existing datasets and models compatible with MLEM, which can then be used in further operations such as `mlem apply`. This workflow is faster than writing a python script to load models and datasets and then subsequently use them.

## Options

- `-r, --repo TEXT`: Path to MLEM repo  [default: (none)]
- `--rev TEXT`: Repo revision to use  [default: (none)]
- `--target-repo, --tr TEXT`: Repo to save target to  [default: (none)]
- `--copy / --no-copy`: Whether to create a copy of file in target location or just link existing file  [default: copy]
- `--type TEXT`: Specify how to read file Available types: ['pandas', 'pickle']  [default: (auto infer)]
- `--index / --no-index`: Whether to index output in .mlem directory
- `-e, --external`: Save result not in .mlem, but directly in repo
- `-h, --help`: Show this message and exit.

## Examples

```mlem
Create MLEM dataset from local csv
$ mlem import data/data.csv data/imported_data --type pandas[csv]

Create MLEM model from local pickle file
$ mlem import data/model.pkl data/imported_model

Create MLEM model from remote pickle file
$ mlem import .mlem/model/rf --repo https://github.com/iterative/example-mlem-get-started --rev simple data/imported_model --type pickle
💾 Saving model to .mlem/model/data/imported_model.mlem
```
