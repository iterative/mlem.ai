# mlem.api.clone()

Clones MLEM object from `path` to `target` and returns Python representation for
the created object.

```py
def clone(
    path: str,
    target: str,
    repo: Optional[str] = None,
    rev: Optional[str] = None,
    fs: Optional[AbstractFileSystem] = None,
    target_repo: Optional[str] = None,
    target_fs: Optional[str] = None,
    follow_links: bool = True,
    load_value: bool = False,
    index: bool = None,
    external: bool = None,
) -> MlemObject
```

### Usage:

```py
from mlem.api import clone

cloned_obj = clone(path="rf", target="mymodel". repo="https://github.com/iterative/example-mlem-get-started", rev="main")
```

## Description

This API is the underlying mechanism for the
[mlem clone](/doc/command-reference/clone) command and facilitates copying of a
[MLEM Object](/doc/user-guide/basic-concepts#mlem-objects) from source to
target.

## Parameters

- **`path`** (required) - Path to the object. Could be local path or path inside
  a Git repo.
- **`target`** (required) - Path to save the copy of initial object to.
- `repo` (optional) - URL to repo if object is located there.
- `rev` (optional) - revision, could be Git commit SHA, branch name or tag.
- `fs` (optional) - filesystem to load object from
- `target_repo` (optional) - path to repo to save cloned object to
- `target_fs` (optional) - target filesystem
- `follow_links` (optional) - If object we read is a MLEM link, whether to load
  the actual object link points to. Defaults to True.
- `load_value` (optional) - Load actual python object incorporated in MlemMeta
  object. Defaults to False.
- `index` (optional) - Whether to index output in .mlem directory
- `external` (optional) - whether to put object inside mlem dir in target repo

## Exceptions

None

## Example: Clone a remote model to a remote repo

```py
from mlem.api import clone

cloned_obj = clone(path="rf", target="mymodel". repo="https://github.com/iterative/example-mlem-get-started", rev="main", target_repo="s3://mybucket/mymodel", load_value=True)
```
