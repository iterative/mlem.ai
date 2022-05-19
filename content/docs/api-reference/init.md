# mlem.api.commands.init()

Creates `.mlem` directory in `path`

```py
def init(path: str = ".") -> None
```

### Usage:

```py
from mlem.api import init

init(path)
```

## Description

Initializes a MLEM repository by creating a `.mlem` directory inside the given path. A new and empty `config.yaml` is also created inside it.

## Parameters

- **`path`** (required) - location of the target where an MLEM repository has to be initialized i.e. a `.mlem` folder has to be created.

## Exceptions

None

## Examples

```py
from mlem.api import init

init()
```

> By default, the path is `.` i.e. the current directory
