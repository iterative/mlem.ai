# list

List MLEM objects inside a [MLEM project](/doc/user-guide/project-structure).

## Synopsis

```usage
usage: mlem list [-t <[all|link|model|data|builder|env|deployment]>]
                 [--rev <commitish>] [+l] [--json] [-i] [-h]
                 project

arguments:
  project          Project to list from [default: (current directory)]
```

## Description

Produces a view of the MLEM project listing
[MLEM objects](/doc/user-guide/basic-concepts#mlem-objects) like models,
datasets, and links.

Running the command without an explicit `project` argument defaults to the
current working directory. The `project` argument can take a local path, or
point to a remote repository (e.g. GitHub).

This command also supports additional options, allowing filtering of MLEM
Objects by type, producing JSON output, selectively displaying
[links](/doc/user-guide/linking) and choosing a particular revision in case of
remote repositories.

## Options

- `-t <[all|link|model|data|builder|env|deployment]>`,
  `--type <[all|link|model|data|builder|env|deployment]>` - Type of objects to
  list [default: all]
- `--rev <commitish>` - Repo revision to use [default: (none)]
- `--links`, `+l` / `-l`, `--no-links` - Whether to include links [default: l]
- `--json` - Output as json
- `-i`, `--ignore-errors` - Ignore corrupted objects
- `-h`, `--help` - Show this message and exit.

## Examples

List MLEM objects on a remote GitHub repository

```cli
$ mlem list https://github.com/iterative/example-mlem-get-started
Models:
- rf
Datasets:
- iris.csv
```
