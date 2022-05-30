# pprint

Display all details about a specific
[MLEM object](/doc/user-guide/basic-concepts#mlem-objects) from an existing MLEM
project.

## Synopsis

```usage
usage: mlem pprint [options] path

arguments: PATH Path to object [required]
```

## Description

All MLEM objects can be printed to view their metadata. This includes generic
metadata information such as requirements, type of object, hash, size, as well
as object specific information such as `methods` for a `model` or `reader` for a
`dataset`.

Since only one specific object is printed, a `PATH` to the specific MLEM object
is always required.

> You can use [`mlem list`](/doc/command-reference/list) to list MLEM objects.

## Options

- `-r, --repo TEXT`: Path to MLEM repo [default: (none)]
- `--rev TEXT`: Repo revision to use [default: (none)]
- `-f, --follow-links`: If specified, follow the link to the actual object.
- `--json`: Output as json
- `--help`: Show this message and exit.

## Example: Showing local model

```cli
$ mlem pprint rf
⏳️ Loading meta from .mlem/model/rf.mlem
{'artifacts': {'data': {'hash': 'a61a1fa54893dcebe6fa448df81a1418',
                        'size': 163651,
                        'type': 'dvc',
                        'uri': 'rf'}},
 'description': 'Random Forest Classifier',
 'model_type': {'methods': {'predict': {'args': [{'name': 'data',
                                                  'type_': {'columns': ['sepal '
                                                                        'length '
                                                                        '(cm)',
...
```

## Example: Showing remote dataset

```cli
$ mlem pprint https://github.com/iterative/example-mlem-get-started/iris.csv
⏳️ Loading meta from https://github.com/iterative/example-mlem-get-started/tree/main/.mlem/dataset/iris.csv.mlem
{'artifacts': {'data': {'hash': '45109f850511f9474665f2c26f4c79f3',
                        'size': 2470,
                        'type': 'dvc',
                        'uri': 'iris.csv'}},
 'object_type': 'dataset',
 'reader': {'dataset_type': {'columns': ['sepal length (cm)',
                                         'sepal width (cm)',
                                         'petal length (cm)',
                                         'petal width (cm)'],
                             'dtypes': ['float64',
                                        'float64',
                                        'float64',
                                        'float64'],
                             'index_cols': [],
                             'type': 'dataframe'},
            'format': 'csv',
            'type': 'pandas'},
 'requirements': [{'module': 'pandas', 'version': '1.4.2'}]}
```
