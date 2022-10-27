# mlem.api.clone()

Clones [MLEM Object](/doc/user-guide/basic-concepts) from `path` to `out` and
returns Python representation for the created object.

```py
def clone(
    path: str,
    target: str,
    project: Optional[str] = None,
    rev: Optional[str] = None,
    fs: Optional[AbstractFileSystem] = None,
    target_project: Optional[str] = None,
    target_fs: Optional[str] = None,
    follow_links: bool = True,
    load_value: bool = False,
) -> MlemObject
```

### Usage:

```py
from mlem.api import clone

cloned_obj = clone(path="rf", target="mymodel", project="https://github.com/iterative/example-mlem-get-started", rev="main")
```

## Description

This API is the underlying mechanism for the
[mlem clone](/doc/command-reference/clone) command and facilitates copying of a
[MLEM Object](/doc/user-guide/basic-concepts#mlem-objects) from source to
target.

## Parameters

- **`path`** (required) - Path to the object. Could be local path or path inside
  a git repo.
- **`target`** (required) - Path to save the copy of initial object to.
- `project` (optional) - URL to project if object is located there.
- `rev` (optional) - revision, could be git commit SHA, branch name or tag.
- `fs` (optional) - filesystem to load object from
- `target_project` (optional) - path to project to save cloned object to
- `target_fs` (optional) - target filesystem
- `follow_links` (optional) - If object we read is a MLEM link, whether to
  loadthe actual object link points to. Defaults to True.
- `load_value` (optional) - Load actual python object incorporated in
  MlemObject. Defaults to False.

## Returns

`MlemObject`: Copy of initial object saved to `out`.

## Exceptions

None

## Example: Clone a remote model to a remote project

```py
from mlem.api import clone

cloned_obj = clone(path="rf", target="mymodel", project="https://github.com/iterative/example-mlem-get-started", rev="main", target_project="s3://mybucket/mymodel", load_value=True)
```
