# mlem.api.import_object()

Try to load an object as MLEM model (or data) and return it, optionally saving
to the specified target location.

```py
def import_object(
    path: str,
    project: Optional[str] = None,
    rev: Optional[str] = None,
    fs: Optional[AbstractFileSystem] = None,
    target: Optional[str] = None,
    target_project: Optional[str] = None,
    target_fs: Optional[AbstractFileSystem] = None,
    type_: Optional[str] = None,
    copy_data: bool = True,
)
```

### Usage:

```py
import os
from mlem.api import import_object
from mlem.core.objects import MlemData
from mlem.contrib.pandas import DataFrameType

path = os.path.join(os.getcwd(), "data.csv")
target_path = os.path.join(os.getcwd(), "imported_data")
meta = import_object(path, target=target_path, type_="pandas[csv]", copy_data=True)

assert isinstance(meta, MlemData)
dt = meta.dataset
assert isinstance(dt, DataFrameType)
```

## Description

Existing datasets and model files are imported as
[MLEM Objects](/doc/user-guide/basic-concepts#mlem-objects). Specifically, they
are tried to be loaded as `MlemModel` or `MlemData`. The function also supports
saving these objects for future use within the MLEM context. This API is the
underlying mechanism for the [mlem import](/doc/command-reference/import)
command.

## Parameters

- **`path`** (required) - Path to the object to import.
- `project` (optional) - Path to mlem project where to load obj from.
- `rev` (optional) - Revision if object is stored in git repo.
- `fs` (optional) - Filesystem to use to load the object.
- `target` (optional) - Where to store the imported object.
- `target_project` (optional) - If provided, treat `target` as object name and
  dumpobject in this MLEM Project.
- `target_fs` (optional) - Filesystem to use to save the object.
- `type_` (optional) - Type of the object to import. If not provided, will try
  toinfer from the object itself.
- `copy_data` (optional) - Whether to copy data to the target location.

## Returns

`MlemObject`: Imported object.

## Exceptions

None

## Example: Import a saved model as MlemModel

```py
import os
from mlem.core.objects import MlemModel
from mlem.api import import_object

path = os.path.join(os.getcwd(), "mymodel")
target_path = os.path.join(os.getcwd(), "mlem_model")
meta = import_object(path, target=target_path, type_="pickle", copy_data=True)
assert isinstance(meta, MlemModel)
```
