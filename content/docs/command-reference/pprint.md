# pprint

Display all details about a specific
[MLEM Object](/doc/user-guide/basic-concepts) from an existing MLEM project.

## Synopsis

```usage
usage: mlem pprint [-p <path>] [--rev <commitish>] [-f]
                   [--json] [-h]
                   path

arguments:
  path             Path to object
```

## Description

All MLEM objects can be printed to view their metadata. This includes generic
information such as requirements, type of object, hash, size, as well as object
specific information such as `methods` for a `model` or `reader` for `data`.

Since only one specific object is printed, a `PATH` to the specific MLEM object
is always required.

<admon type="tip">

You can use [`mlem list`](/doc/command-reference/list) to list MLEM objects.

</admon>

## Options

- `-p <path>`, `--project <path>` - Path to MLEM project [default: (none)]
- `--rev <commitish>` - Repo revision to use [default: (none)]
- `-f`, `--follow-links` - If specified, follow the link to the actual object.
- `--json` - Output as json
- `-h`, `--help` - Show this message and exit.

## Example: Showing local model

```cli
$ mlem pprint rf
⏳️ Loading meta from rf.mlem
{'artifacts': {'data': {'hash': 'a61a1fa54893dcebe6fa448df81a1418',
                        'size': 163651,
                        'type': 'dvc',
                        'uri': 'rf'}},
 'model_type': {'methods': {'predict': {'args': [{'name': 'data',
                                                  'type_': {'columns': ['sepal '
                                                                        'length '
                                                                        '(cm)',
...
```

## Example: Showing remote data

```cli
$ mlem pprint https://github.com/iterative/example-mlem-get-started/iris.csv --rev 4-pack
⏳️ Loading meta from https://github.com/iterative/example-mlem-get-started/tree/4-pack/data/iris.csv.mlem
{'artifacts': {'data': {'hash': '45109f850511f9474665f2c26f4c79f3',
                        'size': 2470,
                        'uri': 'iris.csv'}},
 'data_type': {'columns': ['sepal length (cm)',
                           'sepal width (cm)',
                           'petal length (cm)',
                           'petal width (cm)'],
               'dtypes': ['float64', 'float64', 'float64', 'float64'],
               'index_cols': [],
               'type': 'dataframe'},
 'object_type': 'data',
 'reader': {'data_type': {'columns': ['sepal length (cm)',
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
