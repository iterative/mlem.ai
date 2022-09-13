# serve

Create an API from model methods using a server implementation.

## Synopsis

```usage
usage: mlem serve [-m <path>] [-p <path>] [--rev <commitish>]
                  [-f <text>] [-h] 
                  [<server> [server options] | --load <declaration>]

Builtin servers:
- fastapi
- rmq
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
[`requests` Python library](https://docs.python-requests.org/).

## Options

- `-m <path>`, `--model <path>` - Path to MLEM model object [required]
- `-p <path>`, `--project <path>` - Path to MLEM project [default: (none)]
- `--rev <commitish>` - Repo revision to use [default: (none)]
- `-f <text>`, `--file_conf <text>` - File with options for server in format
  `field.name=path_to_config`
- `-h`, `--help` - Show this message and exit.

## Example: FastAPI HTTP server

Easily serve a model from a remote GitHub repository on a local FastAPI HTTP
server

```cli
$ mlem serve https://github.com/iterative/example-mlem-get-started/rf fastapi --conf port=3000
Starting fastapi server...
🖇️ Adding route for /predict
🖇️ Adding route for /predict_proba
🖇️ Adding route for /sklearn_predict
🖇️ Adding route for /sklearn_predict_proba
Checkout openapi docs at <http://0.0.0.0:3000/docs>
INFO:     Started server process [6083]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:3000 (Press CTRL+C to quit)
```
