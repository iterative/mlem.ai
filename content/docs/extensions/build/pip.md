# Python Package Builds Support

Contains two Builder implementations: `pip` to create a directory with Python
Package from model and `whl` to create a wheel file with Python Package

## Examples

```python

```

## Implementation reference

### `class PipBuilder`

**MlemABC parent type**: `builder`

**MlemABC type**: `pip`

    Create a directory python package

**Fields**:

- `package_name: str` _(required)_ - Name of python package

- `target: str` _(required)_ - Path to save result

- `python_version: str` - Required python version

- `short_description: str = ""` - short_description

- `url: str = ""` - url

- `email: str = ""` - author's email

- `author: str = ""` - author's name

- `version: str = "0.0.0"` - package version

---

### `class WhlBuilder`

**MlemABC parent type**: `builder`

**MlemABC type**: `whl`

    Create a wheel with python package

**Fields**:

- `package_name: str` _(required)_ - Name of python package

- `target: str` _(required)_ - Path to save result

- `python_version: str` - Required python version

- `short_description: str = ""` - short_description

- `url: str = ""` - url

- `email: str = ""` - author's email

- `author: str = ""` - author's name

- `version: str = "0.0.0"` - package version
