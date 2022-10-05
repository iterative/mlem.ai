# mlem.api.build()

Build a [MLEM model](/doc/object-reference/mlem-abcs#modeltype) in pip-ready format, a
built package using whl, docker-build-ready folder or directly build a docker
image.

```py
def build(
    builder: Union[str, MlemBuilder],
    model: Union[str, MlemModel],
    **builder_kwargs,
)
```

### Usage:

```py
from mlem.api import build

build("pip", "rf", target="build", package_name="example_mlem_get_started")
```

## Description

This API is the underlying mechanism for the
[mlem build](/doc/command-reference/build) command and allows us to
programmatically create ship-able assets from MlemModels such as pip-ready
packages, Docker images, etc.

<admon type="tip">

The arguments supplied to this method can be found with `mlem types`:

```cli
$ mlem types builder pip
[required] package_name: str
[required] target: str
[not required] templates_dir: str = []
[not required] python_version: str = None
[not required] short_description: str = ""
[not required] url: str = ""
[not required] email: str = ""
[not required] author: str = ""
[not required] version: str = "0.0.0"
[not required] additional_setup_kwargs: typing.Any = {}
```

</admon>

## Parameters

- **`builder`** (required) - Builder to use. Out-of-the-box supported string
  values are ['whl', 'pip', 'docker_dir', 'docker'].
- **`model`** (required) - The model to build.
- `builder_kwargs` (optional) - Keyword arguments for the underlying builder
  being used.

## Exceptions

None

## Examples

```py
from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier

from mlem.contrib.docker import DockerImageBuilder
from mlem.contrib.docker.base import DockerImage
from mlem.contrib.fastapi import FastAPIServer

from mlem.api import build

train, target = load_iris(return_X_y=True)
model = DecisionTreeClassifier().fit(train, target)
model_meta = MlemModel.from_obj(model)

built = build(
    DockerImageBuilder(
        server=FastAPIServer(),
        image=DockerImage(name="pack_docker_test_image"),
        force_overwrite=True,
    ),
    model_meta,
)
```
