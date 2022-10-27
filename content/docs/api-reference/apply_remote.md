# mlem.api.apply_remote()

Apply provided model against provided data.

```py
def apply_remote(
    client: Union[str, Client],
    *data: Union[str, MlemData, Any],
    method: str = None,
    output: str = None,
    target_project: str = None,
    **client_kwargs,
) -> Optional[Any]
```

### Usage:

```py
from mlem.api import apply_remote

res = apply_remote(client_obj, data, method="predict")
```

## Description

This API is the underlying mechanism for the
[mlem apply-remote](/doc/command-reference/apply-remote) command and facilitates
running inferences on entire datasets for models which are deployed remotely or
are being served locally. The API requires an explicit client object, which
knows how to make requests to the deployed model.

## Parameters

- **`client`** (required) - The client to access methods of deployed model.
- **`data`** (required) - Input to the model.
- **`method`** (required) - Which model method to use.If None, use the only
  method model has.If more than one is available, will fail.
- `output` (optional) - If value is provided,assume it's path and save output
  there.
- `target_project` (optional) - Path to MLEM project to save the result to.
- `**client_kwargs` (optional) - Additional arguments to pass to client.

## Returns

If `output=None`, returns results for given data. Otherwise returns None.

## Exceptions

- `WrongMethodError` - Thrown if wrong method name for model is provided
- `InvalidArgumentError` - Thrown if arguments are invalid, when method cannot
  be None
- `NotImplementedError` - Saving several input data objects is not implemented
  yet

## Examples

```py
from numpy import ndarray
from sklearn.datasets import load_iris
from mlem.api import apply_remote
from mlem.runtime.client import HTTPClient

train, _ = load_iris(return_X_y=True)
client = HTTPClient(host="0.0.0.0", port=8080)

res = apply_remote(client, train, method="predict")
assert isinstance(res, ndarray)
```
