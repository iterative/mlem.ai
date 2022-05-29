# mlem.api.init()

Creates and populates the `.mlem/` directory in `path`.

```py
def init(path: str = ".") -> None
```

### Usage:

```py
from mlem.api import init

init(path)
```

## Description

Initializes a MLEM project by creating a `.mlem/` directory inside the given
path. A new and empty `config.yaml` is also created inside it.

## Parameters

- **`path`** (required) - location of the target where a MLEM project has to
  be initialized i.e. a `.mlem/` folder has to be created. `.` by default

## Exceptions

None
