# mlem.api.load_meta()

Loads MlemObject from a given path

```py
def load_meta(
    path: str,
    project: Optional[str] = None,
    rev: Optional[str] = None,
    follow_links: bool = True,
    load_value: bool = False,
    fs: Optional[AbstractFileSystem] = None,
    *,
    force_type: Optional[Type[T]] = None,
) -> MlemObject
```

### Usage:

```py
import os
from mlem.api import load_meta

out_path = os.path.join(os.getcwd(), "saved-model")
loaded = load_meta(out_path)
```

## Description

Loads a [MlemObject](/doc/user-guide/basic-concepts#mlem-objects) from a given
path. This differs from [load](/doc/api-reference/load) since the latter loads
the actual python object incorporated within MlemObject. In fact, `load` uses
`load_meta` beneath and uses its `get_value()` method to get the underlying
python object.

## Parameters

- **`path`** (required) - Path to the object. Could be local path or path inside
  a Git repo.
- `project` (optional) - URL to project if object is located there.
- `rev` (optional) - revision, could be Git commit SHA, branch name or tag.
- `follow_links` (optional) - If object we read is a MLEM link, whether to load
  the actual object link points to. Defaults to True.
- `load_value` (optional) - Load actual python object incorporated in
  MlemObject. Defaults to False.
- `fs` (optional) - filesystem to load from. If not provided, will be inferred
  from path
- `force_type` (optional) - type of meta to be loaded. Defaults to MlemObject
  (any mlem meta)

## Exceptions

- `WrongMetaType` - Thrown if the loaded meta object has a different type than
  what is expected (force_type or MlemObject)

## Examples

```py
import os
from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier

from mlem.core.objects import MlemModel
from mlem.api import load_meta

train, _ = load_iris(return_X_y=True)
out_path = os.path.join(os.getcwd(), "saved-model")
meta = load_meta(out_path, load_value=True, force_type=MlemModel)

model = meta.get_value()
assert isinstance(model, DecisionTreeClassifier)
model.predict(train)
```
