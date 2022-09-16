# Python Package Builds Support

Contains two Builder implementations: `pip` to create a directory with Python
Package from model and `whl` to create a wheel file with Python Package

## Examples

### Creating Python package from model using API

```python
from mlem.api import build

build(builder="pip",
      model="https://github.com/iterative/example-mlem-get-started/rf",
      package_name="my_model_package",
      target="./build"
)

# ! pip install ./build
import my_model_package

data = ...
my_model_package.predict(data)
```

### Creating Python wheel package from model using CLI

```cli
$ mlem build whl -m https://github.com/iterative/example-mlem-get-started/rf \
  --package_name my_model_package --target ./build --version 1.0.0
$ pip install ./build/my_model_package-1.0.0-py3-none-any.whl
```

### Creating wheel builder declaration and using it with CLI

```cli
$ mlem declare builder whl whl_conf --package_name my_model_package \
  --target ./build --author mike0sv --email mike0sv@gmail.com --version 1.0.0
$ mlem build --load whl_conf \
  --model https://github.com/iterative/example-mlem-get-started/rf
$ pip install ./build/my_model_package-1.0.0-py3-none-any.whl
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
