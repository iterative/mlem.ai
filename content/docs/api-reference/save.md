# mlem.api.save()

Saves given object to a given path.

```py
def save(
    obj: Any,
    path: Union[str, os.PathLike],
    project: Optional[str] = None,
    sample_data=None,
    fs: Optional[AbstractFileSystem] = None,
    params: Dict[str, str] = None,
) -> MlemObject
```

### Usage:

```py
from mlem.api import save

save(obj, path, index=False, external=True)
```

## Description

Saves a given object to a given path. The path can belong to different file
systems (eg: `S3`). The function returns and saves the object as a
[MLEM Object](/doc/user-guide/basic-concepts#mlem-objects).

## Parameters

- **`obj`** (required) - Object to dump
- **`path`** (required) - If not located on LocalFileSystem, then should be
  urior `fs` argument should be provided
- `project` (optional) - path to mlem project (optional)
- `sample_data` (optional) - If the object is a model or function, you
  canprovide input data sample, so MLEM will include it's schemain the model's
  metadata
- `fs` (optional) - FileSystem for the `path` argument
- `params` (optional) - arbitrary params for object

## Returns

None

## Exceptions

- `MlemObjectNotFound` - Thrown if we can't find MLEM object

## Example: Save a trained model with MLEM

```py
import os
from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier
from pandas import DataFrame
from mlem.api import save

train, target = load_iris(return_X_y=True)
train = DataFrame(train)
train.columns = train.columns.astype(str)
model = DecisionTreeClassifier().fit(train, target)
path = os.path.join(os.getcwd(), "saved-model")

save(model, path, sample_data=train)
```
