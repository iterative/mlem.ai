# mlem.api.init()

Creates `.mlem.yaml` config file in `path`. See
[User Guide](/doc/user-guide/configuration) for more details.

```py
def init(path: str = ".") -> None
```

### Usage:

```py
from mlem.api import init

init(path)
```

## Description

Initializes a MLEM project by creating a new and empty `.mlem.yaml` file.

## Parameters

- **`path`** (required) - location of the target where a MLEM project has to be
  initialized i.e. a `.mlem/` folder has to be created. `.` by default

## Exceptions

None
