# mlem.api.ls()

Get a view of the MLEM repository by listing all of its MLEM Objects

```py
def ls(
    repo: str = ".",
    rev: Optional[str] = None,
    fs: Optional[AbstractFileSystem] = None,
    type_filter: Union[
        Type[MlemObject], Iterable[Type[MlemObject]], None
    ] = None,
    include_links: bool = True,
) -> Dict[Type[MlemObject], List[MlemObject]]
```

### Usage:

```py
from mlem.api import ls

objects = ls(".", rev=None, type_filter=None, include_links=True)
```

## Description

Populates a dictionary where keys are different `types` of
[MlemObjects](/doc/user-guide/basic-concepts#mlem-objects) and values are a
collection of MlemObjects of that type. This API is internally used by the CLI
command [list](/doc/command-reference/list).

## Parameters

- **`repo`** (required) - Path or URL to repo
- `rev` (optional) - revision, could be git commit SHA, branch name or tag.
- `fs` (optional) - filesystem to load from. If not provided, will be inferred
  from repo
- `type_filter` (optional) - type of objects to be listed (eg: models / dataset
  / etc.)
- `include_links` (optional) - whether to include links while fetching the list
  of MlemObjects. Defaults to True

## Exceptions

None

## Examples

```py
from mlem.api import ls

objects = ls(".")
```
