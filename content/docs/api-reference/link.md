# mlem.api.link()

Creates MlemLink for an `source` object and dumps it if `target` is provided.

```py
def link(
    source: Union[str, MlemObject],
    source_project: Optional[str] = None,
    rev: Optional[str] = None,
    target: Optional[str] = None,
    target_project: Optional[str] = None,
    follow_links: bool = True,
    absolute: bool = False,
) -> MlemLink
```

### Usage:

```py
import os
from mlem.api import link

model_path = os.path.join(os.getcwd(), "mymodel")
link_name = os.path.join(os.getcwd(), "latest")
link_obj = link(
    model_path,
    target=link_name,
    target_project=os.getcwd(),
)
```

## Description

This API is the underlying mechanism for the
[mlem link](/doc/command-reference/link) command and explicitly creates a
`MlemLink` object from a `source`. This `MlemLink` object is dumped to a
`target` (if provided). This allows us to refer objects (even remote ones) using
their aliases for all future purposes.

## Parameters

- **`source`** (required) - The object to create link from.
- `source_project` (optional) - Path to mlem project where to load obj from
- `rev` (optional) - Revision if object is stored in git repo.
- `target` (optional) - Where to store the link object.
- `target_project` (optional) - If provided,treat `target` as link name and dump
  link in MLEM DIR
- `follow_links` (optional) - Whether to make link to the underlying objectif
  `source` is itself a link. Defaults to True.
- `absolute` (optional) - Whether to make link absolute or relative to mlem
  project

## Returns

`MlemLink`: Link object to the `source`.

## Exceptions

- `MlemObjectNotSavedError` - Thrown if we can't do something before we save
  MLEM object.

## Examples

```py
import os
from mlem.api import link, load_meta
from mlem.core.objects import MlemLink, MlemModel

model_path = os.path.join(os.getcwd(), "mymodel")
link_path = os.path.join(os.getcwd(), "latest.mlem")
link(model_path, target=link_path, external=True)
assert os.path.exists(link_path)
link_object = load_meta(link_path, follow_links=False)
assert isinstance(link_object, MlemLink)
model = load_meta(link_path)
assert isinstance(model, MlemModel)
```
