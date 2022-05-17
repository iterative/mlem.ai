# list

List [MLEM objects](/doc/user-guide/basic-concepts#mlem-objects) inside a MLEM repository (should contain `.mlem` directory)

> Useful to see models, datasets, links, and other types of MLEM Objects

## Synopsis

```usage
usage: mlem list [options] [repo]
```

## Description

Produces a view of the MLEM repository listing models, datasets, links, and other MLEM objects. The command (without flags) defaults to the current directory for the repo argument. One can of course point to remote repositories as well. The command also allows us to filter MLEM Objects by type, produce json output, selectively display links, and choose a particular revision in case of remote repositories.

## Arguments

```
[REPO] Repo to list from [default: (current directory)]
```

## Options

- `-t, --type [all|link|model|dataset|env|deployment|packager]`:
    Type of objects to list  [default: all]
- `--rev TEXT`: Repo revision to use  [default: (none)]
- `+l, --links / -l, --no-links`: Include links  [default: l]
- `--json`: Output as json
- `--help`: Show this message and exit.

## Examples

```mlem
$ mlem list https://github.com/iterative/example-mlem-get-started
Models:
- rf
Datasets:
- iris.csv
```