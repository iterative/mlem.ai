# serve

Exposes a model's methods as endpoints and serves them with a server implementation.

## Synopsis

```usage
usage: mlem serve [options] model [subtype]
```

## Description

A model through MLEM can be served via a server implementation (eg: `fastapi`) and its methods can be exposed as API endpoints. This allows us to query and make requests to the served model. In case of `fastapi`, one can see the spec at `/docs` and make requests either with the corresponding in-built client or even through `curl` or `requests` library in python.

## Arguments

```
MODEL      Model to create service from  [required]
[SUBTYPE]  Server type. Choices: ['fastapi', 'heroku']  [default: ]
```

## Options

- `-r, --repo TEXT`: Path to MLEM repo  [default: (none)]
- `--rev TEXT`: Repo revision to use  [default: (none)]
- `-l, --load TEXT`: File to load server config from
- `-c, --conf TEXT`: Options for server in format `field.name=value`
- `-f, --file_conf TEXT`: File with options for server in format
                        `field.name=path_to_config`
- `--help`: Show this message and exit.

## Examples

```mlem
$ mlem serve https://github.com/iterative/example-mlem-get-started/rf fastapi -c port=3000
Starting fastapi server...
💅 Adding route for /predict
💅 Adding route for /predict_proba
💅 Adding route for /sklearn_predict
💅 Adding route for /sklearn_predict_proba
Checkout openapi docs at <http://0.0.0.0:3000/docs>
INFO:     Started server process [6083]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:3000 (Press CTRL+C to quit)
```