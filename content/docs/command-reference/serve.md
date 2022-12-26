# serve

Create an API from model methods using a server implementation.

## Synopsis

```usage
usage: mlem serve [--request_serializer <str>]
                  [--response_serializer <str>]
                  [--standardize] [--methods <dict>]
                  [--methods.key.name <str>]
                  [--methods.key.returns.data_type <str>]
                  [--methods.key.returns.ser <str>]
                  [--methods.key.args <dict>]
                  [--methods.key.args.key.data_type <str>]
                  [--methods.key.args.key.ser <str>]
                  [--methods.key.args.key.name <str>]
                  [-m <path>] [-p <path>] [--rev <commitish>]
                  [-f <text>] [--standartize] [-h]
                  [<server> [server options] | --load <declaration>]

Builtin servers:
- fastapi
- rmq
- streamlit
```

## Description

An [MLEM Model](/doc/user-guide/basic-concepts#model) can be served via a server
implementation (e.g. `fastapi`) and its methods exposed as API endpoints. This
allows us to easily make requests (inference and others) against the served
model.

For the common `fastapi` server implementation, the OpenAPI spec is available on
the `/docs` endpoint.

HTTP Requests to the model-server can be made either with the corresponding
built-in client, or common HTTP clients, such as [`curl`](https://curl.se/) and
[`httpie`](https://httpie.io/) CLIs, or the
[`requests` Python library](https://requests.readthedocs.io).

## Options

- `--request_serializer <str>` - Serializer to use for all requests. One of
  ['array', 'binary', 'd_dict', 'dataframe', 'dict', 'file', 'lightgbm',
  'ndarray', 'number', 'primitive', 'series', 'tf_tensor', 'torch',
  'xgboost_dmatrix']. Run 'mlem types serializer <subtype>' for list of nested
  fields for each subtype
- `--response_serializer <str>` - Serializer to use for all responses. One of
  ['array', 'binary', 'd_dict', 'dataframe', 'dict', 'file', 'lightgbm',
  'ndarray', 'number', 'primitive', 'series', 'tf_tensor', 'torch',
  'xgboost_dmatrix']. Run 'mlem types serializer <subtype>' for list of nested
  fields for each subtype
- `--standardize <boolean>` - Use standard model interface [default: True]
- `--methods <dict>` - Optional augmented interface [default: __NOT_SET__]
- `--methods.key.name <str>` - If set, match only method with this name
  [default: __NOT_SET__]
- `--methods.key.returns.data_type <str>` - Change data type. One of ['array',
  'binary', 'd_dict', 'dataframe', 'dict', 'lightgbm', 'list', 'ndarray',
  'number', 'primitive', 'series', 'tf_tensor', 'torch', 'tuple', 'unspecified',
  'xgboost_dmatrix']. Run 'mlem types data_type <subtype>' for list of nested
  fields for each subtype [default: __NOT_SET__]
- `--methods.key.returns.ser <str>` - Change serializer. One of ['array',
  'binary', 'd_dict', 'dataframe', 'dict', 'file', 'lightgbm', 'ndarray',
  'number', 'primitive', 'series', 'tf_tensor', 'torch', 'xgboost_dmatrix']. Run
  'mlem types serializer <subtype>' for list of nested fields for each subtype
  [default: __NOT_SET__]
- `--methods.key.args <dict>` - Change arguments options [default: __NOT_SET__]
- `--methods.key.args.key.data_type <str>` - Change data type. One of ['array',
  'binary', 'd_dict', 'dataframe', 'dict', 'lightgbm', 'list', 'ndarray',
  'number', 'primitive', 'series', 'tf_tensor', 'torch', 'tuple', 'unspecified',
  'xgboost_dmatrix']. Run 'mlem types data_type <subtype>' for list of nested
  fields for each subtype [default: __NOT_SET__]
- `--methods.key.args.key.ser <str>` - Change serializer. One of ['array',
  'binary', 'd_dict', 'dataframe', 'dict', 'file', 'lightgbm', 'ndarray',
  'number', 'primitive', 'series', 'tf_tensor', 'torch', 'xgboost_dmatrix']. Run
  'mlem types serializer <subtype>' for list of nested fields for each subtype
  [default: __NOT_SET__]
- `--methods.key.args.key.name <str>` - If set, match only argument with this
  name [default: __NOT_SET__]
- `-m <path>`, `--model <path>` - Path to MLEM model [required]
- `-p <path>`, `--project <path>` - Path to MLEM project [default: (none)]
- `--rev <commitish>` - Repo revision to use [default: (none)]
- `-f <text>`, `--file_conf <text>` - File with options for server in format
  `field.name=path_to_config`
- `--standartize` / `--no-standartize` - Whether to conform model interface to
  standard ('predict' method with single arg 'data') [default: standartize]
- `-h`, `--help` - Show this message and exit.

## Examples

For examples, please refer to the [Get Started](/doc/get-started) or the
[Serving](/doc/user-guide/serving) guide.
