# mlem.api.import_object()

Try to load an object as MLEM model (or dataset) and return it, optionally
saving to the specified target location.

```py
def import_object(
    path: str,
    repo: Optional[str] = None,
    rev: Optional[str] = None,
    fs: Optional[AbstractFileSystem] = None,
    target: Optional[str] = None,
    target_repo: Optional[str] = None,
    target_fs: Optional[AbstractFileSystem] = None,
    type_: Optional[str] = None,
    copy_data: bool = True,
    external: bool = None,
    index: bool = None,
)
```

### Usage:

```py
import os
from mlem.api import import_object
from mlem.core.objects import MlemDataset
from mlem.contrib.pandas import DataFrameType

path = os.path.join(os.getcwd(), "data.csv")
target_path = os.path.join(os.getcwd(), "imported_data")
meta = import_object(path, target=target_path, type_="pandas[csv]", copy_data=True)

assert isinstance(meta, MlemDataset)
dt = meta.dataset
assert isinstance(dt, DataFrameType)
```

## Description

Existing datasets and model files are imported as
[MLEM Objects](/doc/user-guide/basic-concepts#mlem-objects). Specifically, they
are tried to be loaded as `MlemModel` or `MlemDataset`. The function also
supports saving these objects for future use within the MLEM context. This API
is the underlying mechanism for the [mlem import](/doc/command-reference/import)
command.

## Parameters

- **`path`** (required) - Path of file to import.
- `repo` (optional) - Path to MLEM repo.
- `rev` (optional) - revision, could be Git commit SHA, branch name or tag.
- `fs` (optional) - FileSystem for the `path` argument
- `target` (optional) - Path to save MLEM object into.
- `target_repo` (optional) - Path to MLEM repo for `target`.
- `target_fs` (optional) - FileSystem for the `target` argument
- `type_` (optional) - Specify how to read file. Available types: ['pickle',
  'pandas']. Defaults to auto-infer.
- `copy_data` (optional) - Whether to create a copy of file in target location
  or just link existing file. Defaults to True.
- `external` (optional) - Save result directly in repo (not in `.mlem/`)
- `index` (optional) - Whether to index output in `.mlem/` directory

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
