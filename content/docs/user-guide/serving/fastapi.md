# FastAPI

[FastAPI](https://fastapi.tiangolo.com) is a modern, fast (high-performance),
web framework for building APIs with Python 3.7+ based on standard Python type
hints.

To expose your model to a external users via REST API, MLEM can use FastAPI to
serve it.

## Requirements

```bash
pip install mlem[fastapi]
# or
pip install fastapi uvicorn
```

## Examples

### Running FastAPI model server from code

```python
from mlem.api import serve

serve(
    model="https://github.com/iterative/example-mlem-get-started/rf",
    server="fastapi",
    host="0.0.0.0",
    port=8000,
)
```

### Running FastAPI model server from cli

```cli
$ mlem serve fastapi \
  --model https://github.com/iterative/example-mlem-get-started/rf \
  --host 0.0.0.0 --port 8000
)
```

### Applying data to running FastAPI server from API

```python
from mlem.api import apply_remote

apply_remote(
    "http",
    "https://github.com/iterative/example-mlem-get-started/iris.csv",
    method="predict",
    host="0.0.0.0",
    port=8000,
)
```

### Applying data to running FastAPI server from CLI

```cli
$ mlem apply-remote http \
    --method predict --host 0.0.0.0 --port 8000 \
    --data https://github.com/iterative/example-mlem-get-started/iris.csv
```
