# mlem.api.serve()

Serve a model by exposing its methods as endpoints.

```py
def serve(
    model: Union[str, MlemModel],
    server: Union[Server, str],
    **server_kwargs,
)
```

### Usage:

```py
from mlem.api import serve

serve(model, server_obj)
```

## Description

This API is the underlying mechanism for the
[mlem serve](/doc/command-reference/serve) command and allows us to locally
serve a model by exposing its methods as endpoints. This makes it possible to
easily make requests (for inference or otherwise) against the served model.

## Parameters

- **`model`** (required) - The model to serve.
- **`server`** (required) - Out-of-the-box supported one is "fastapi".
- **`server_kwargs`** (required) - Additional kwargs to pass to the server.

## Returns

None

## Exceptions

None

## Examples

```py
from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier
from mlem.core.objects import MlemModel
from mlem.runtime.interface import ModelInterface
from mlem.contrib.fastapi import FastAPIServer

from mlem.api import serve

train, target = load_iris(return_X_y=True)
model = DecisionTreeClassifier().fit(train, target)
m = MlemModel.from_obj(model, sample_data=train)
interface = ModelInterface.from_model(m)

server_obj = FastAPIServer().app_init(interface)
serve(m, server_obj)
```
