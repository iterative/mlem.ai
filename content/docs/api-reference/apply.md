# mlem.api.apply()

Apply provided model against provided data.

```py
def apply(
    model: Union[str, MlemModel, Any],
    *data: Union[str, MlemData, Any],
    method: str = None,
    output: str = None,
    target_project: str = None,
    batch_size: Optional[int] = None,
) -> Optional[Any]
```

### Usage:

```py
from mlem.api import apply

y_pred = apply("rf", "data", method="predict_proba")
```

## Description

This API is the underlying mechanism for the
[mlem apply](/doc/command-reference/apply) command and facilitates running
inferences on entire datasets. The API applies i.e. calls a model's method (eg:
`predict`) and returns the output (as a MLEM object) while also saving it if
required.

## Parameters

- **`model`** (required) - MLEM model.
- **`data`** (required) - Input to the model.
- `method` (optional) - Which model method to use.If None, use the only method
  model has.If more than one is available, will fail.
- `output` (optional) - If value is provided,assume it's path and save output
  there.
- `target_project` (optional) - Path to MLEM project to save the result to.
- `batch_size` (optional) - If provided, will process data in batches of given
  size.

## Returns

If `output=None`, returns results for given data. Otherwise returns None.

## Exceptions

- `WrongMethodError` - Thrown if wrong method name for model is provided
- `NotImplementedError` - Saving several input data objects is not implemented
  yet

## Examples

```py
from numpy import ndarray
from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier
from mlem.core.objects import MlemData, MlemModel
from mlem.api import apply

train, target = load_iris(return_X_y=True)
model = DecisionTreeClassifier().fit(train, target)
d = MlemData.from_data(train)
m = MlemModel.from_obj(model)
res = apply(m, d, method="predict")
assert isinstance(res, ndarray)
```
