# pprint

Get information about a specific [MLEM object](/doc/user-guide/basic-concepts#mlem-objects) from a MLEM repository (should contain `.mlem` directory)

> Useful to see generic metadata information such as requirements, type of object, hash, size, etc. as well as object specific information such as `methods` for a `model` or perhaps `reader` for a `dataset`.

## Synopsis

```usage
usage: mlem pprint [options] path

arguments: PATH Path to object [required]
```

## Description

The MLEM objects (a list of which can be seen from `mlem list`) can be printed to check for their metadata information. Since only one object is printed at a particular time, a path to a specific MLEM object is always required.

## Options

- `-r, --repo TEXT`: Path to MLEM repo  [default: (none)]
- `--rev TEXT`: Repo revision to use  [default: (none)]
- `-f, --follow-links`: If specified, follow the link to the actual object.
- `--json`: Output as json
- `--help`: Show this message and exit.

## Examples

```mlem
Print remote object

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

> The `iris.csv` dataset used in the above example was present in the list of MLEM objects obtained from this repository [here](/doc/cli-reference/list#examples)
