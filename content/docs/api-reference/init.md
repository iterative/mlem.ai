# mlem.api.init()

Creates `.mlem/` directory in `path`

```py
def init(path: str = ".") -> None
```

### Usage:

```py
from mlem.api import init

init(path)
```

## Description

Initializes a MLEM repository by creating a `.mlem/` directory inside the given
path. A new and empty `config.yaml` is also created inside it.

## Parameters

- **`path`** (required) - location of the target where a MLEM repository has to
  be initialized i.e. a `.mlem/` folder has to be created. `.` by default

## Exceptions

None
