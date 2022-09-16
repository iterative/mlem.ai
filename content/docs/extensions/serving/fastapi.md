# Fastapi Serving

FastAPIServer implementation

## Description

**TODO**

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

serve(model="https://github.com/iterative/example-mlem-get-started/rf",
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

apply_remote("http",
             "https://github.com/iterative/example-mlem-get-started/iris.csv",
             method="predict",
             host="0.0.0.0",
             port=8000
)
```

### Applying data to running FastAPI server from CLI

```cli
$ mlem apply-remote http --method predict --host 0.0.0.0 --port 8000 \
  --data https://github.com/iterative/example-mlem-get-started/iris.csv
```

## Implementation reference

### `class FastAPIServer`

**MlemABC parent type**: `server`

**MlemABC type**: `fastapi`

    Serves model with http

**Fields**:

- `host: str = "0.0.0.0"` - Network interface to use

- `port: int = 8080` - Port to use
