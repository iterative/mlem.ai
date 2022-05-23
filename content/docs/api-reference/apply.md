# mlem.api.apply()

Apply provided model against provided data

```py
def apply(
    model: Union[str, MlemModel],
    *data: Union[str, MlemDataset, Any],
    method: str = None,
    output: str = None,
    target_repo: str = None,
    index: bool = None,
    external: bool = None,
    batch_size: Optional[int] = None,
) -> Optional[Any]
```

### Usage:

```py
from mlem.api import apply

y_pred = apply("rf", "data", method="predict_proba")
```

## Description

This API is the underlying mechanism for the [mlem apply](/doc/command-reference/apply) command and facilitates running inferences on entire datasets. The API applies i.e. calls a model's method (eg: `predict`) and returns the output (as a MLEM object) while also saving it if required. 

## Parameters

- **`model`** (required) -  MLEM model (a MlemModel object).
- **`data`** (required) - Input to the model.
- `method` (optional) - Which model method to use. If None, use the only method model has. If more than one is available, will fail.
- `output` (optional) - If value is provided, assume its path and save output there.
- `target_repo` (optional) - The path to repo to save the results to.
- `index` (optional) - Whether to index saved output in MLEM root folder.
- `external` (optional) - Whether to save result outside mlem dir.
- `batch_size` (optional) - If data is to be loaded and applied in batches.

## Exceptions

- `WrongMethodError` - Thrown if wrong method name for model is provided
- `NotImplementedError` - Saving several input data objects is not implemented yet

## Examples

```py
from numpy import ndarray
from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier
from mlem.core.objects import MlemDataset, MlemModel
from mlem.api import apply

train, target = load_iris(return_X_y=True)
model = DecisionTreeClassifier().fit(train, target)
d = MlemDataset.from_data(train)
m = MlemModel.from_obj(model)
res = apply(m, d, method="predict")
assert isinstance(res, ndarray)
```
