# FastAPI

[FastAPI](https://fastapi.tiangolo.com) is a modern, fast (high-performance),
web framework for building APIs with Python 3.7+ based on standard Python type
hints.

To expose your model to a external users via REST API, MLEM can use FastAPI to
serve it.

## Requirements

```cli
$ pip install mlem[fastapi]
# or
$ pip install fastapi uvicorn
```

## Examples

Since we showed how to use FastAPI on the
[parent page](/doc/user-guide/serving), let not repeat that, but see few
different examples instead.

### Running FastAPI model server from code

```py
from mlem.api import serve

serve(
    model="https://github.com/iterative/example-mlem-get-started/models/rf",
    server="fastapi",
    host="0.0.0.0",
    port=8000,
)
```

### Running FastAPI model server from cli

```cli
$ mlem serve fastapi \
  --model https://github.com/iterative/example-mlem-get-started/models/rf \
  --host 0.0.0.0 --port 8000
)
⏳️ Loading model from https://github.com/iterative/example-mlem-get-started/tree/main/models/rf.mlem
Starting fastapi server...
🖇️  Adding route for /predict
🖇️  Adding route for /predict_proba
Checkout openapi docs at <http://0.0.0.0:8000/docs>
INFO:     Started server process [86184]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

### Applying data to running FastAPI server from API

```py
from mlem.api import apply_remote

apply_remote(
    "http",
    "https://github.com/iterative/example-mlem-get-started/data/iris.csv",
    method="predict",
    host="0.0.0.0",
    port=8000,
)
```

### Applying data to running FastAPI server from CLI

```cli
$ mlem apply-remote http \
    --method predict --host 0.0.0.0 --port 8000 \
    --data https://github.com/iterative/example-mlem-get-started/data/iris.csv
```
