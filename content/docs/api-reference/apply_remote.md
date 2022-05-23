# mlem.api.apply_remote()

Apply deployed model (possibly remote) against provided data.

```py
def apply_remote(
    client: Union[str, BaseClient],
    *data: Union[str, MlemDataset, Any],
    method: str = None,
    output: str = None,
    target_repo: str = None,
    index: bool = False,
    **client_kwargs,
) -> Optional[Any]
```

### Usage:

```py
from mlem.api import apply_remote

res = apply_remote(client_obj, data, method="predict")
```

## Description



## Parameters

- **`client`** (required) - The client to access methods of deployed model.
- **`data`** (required) - Input to the model.
- `method` (optional) - Which model method to use. If None, use the only method model has. If more than one is available, will fail.
- `output` (optional) - If value is provided, assume it's path and save output there.
- `target_repo` (optional) - The path to repo to save the results to.
- `index` (optional) - Whether to index saved output in MLEM root folder.
- `client_kwargs` (optional) - Keyword arguments for the underlying client implementation being used.

## Exceptions

- `WrongMethodError` - Thrown if wrong method name for model is provided
- `InvalidArgumentError` - Thrown if arguments are invalid, when method cannot be None
- `NotImplementedError` - Saving several input data objects is not implemented yet

## Examples

```py
from numpy import ndarray
from sklearn.datasets import load_iris
from mlem.api import apply_remote
from mlem.runtime.client.base import HTTPClient

train, _ = load_iris(return_X_y=True)
client = HTTPClient(host="0.0.0.0", port=8080)

res = apply_remote(client, train, method="predict")
assert isinstance(res, ndarray)
```
