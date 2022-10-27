# venv

## `class CondaBuilder`

**MlemABC parent type**: `builder`

**MlemABC type**: `conda`

    MlemBuilder implementation for building conda environments

**Fields**:

- `target: str = "venv"` - Name of the virtual environment

- `python_version: str = "3.9"` - The python version to use

- `current_env: bool = False` - Whether to install in the current conda env

---

## `class VenvBuilder`

**MlemABC parent type**: `builder`

**MlemABC type**: `venv`

    MlemBuilder implementation for building virtual environments

**Fields**:

- `target: str = "venv"` - Name of the virtual environment

- `no_cache: bool = False` - Disable cache

- `current_env: bool = False` - Whether to install in the current virtual env,
  must be active
