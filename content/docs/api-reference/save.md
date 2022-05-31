# mlem.api.save()

Saves given object to a given path

```py
def save(
    obj: Any,
    path: str,
    project: Optional[str] = None,
    sample_data=None,
    fs: Union[str, AbstractFileSystem] = None,
    index: bool = None,
    external: Optional[bool] = None,
    description: str = None,
    params: Dict[str, str] = None,
    labels: List[str] = None,
    update: bool = False,
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
- **`path`** (required) - If not located on LocalFileSystem, then should be uri
  or `fs` argument should be provided
- `project` (optional) - path to mlem project
- `sample_data` (optional) - If the object is a model or function, you can
  provide input data sample, so MLEM will include it's schema in the model's
  metafile
- `fs` (optional) - FileSystem for the `path` argument
- `index` (optional) - Whether to add object to mlem project index
- `external` (optional) - Save result directly to `path` (not inside `.mlem/`)
- `description` (optional) - description for object
- `params` (optional) - arbitrary params for object
- `labels` (optional) - labels for object
- `update` (optional) - whether to keep old description/labels/params if new
  values were not provided

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

save(model, path, sample_data=train, index=False)
```
