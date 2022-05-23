# mlem.api.pack()

Package a [MLEM model](/doc/user-guide/mlem-abcs#modeltype) in pip-ready format,
a built package using whl, docker-build-ready folder or directly build a docker
image.

```py
def pack(
    packager: Union[str, Packager],
    model: Union[str, MlemModel],
    **packager_kwargs,
)
```

### Usage:

```py
from mlem.api import pack

pack("pip", "rf", target="build", package_name="example_mlem_get_started")
```

> The extra kwargs supplied above can be seen from the output of
> `mlem types packager pip` which gives us
>
> ```py
> [required] package_name: str
> [required] target: str
> [not required] templates_dir: str = []
> [not required] python_version: str = None
> [not required] short_description: str = ""
> [not required] url: str = ""
> [not required] email: str = ""
> [not required] author: str = ""
> [not required] version: str = "0.0.0"
> [not required] additional_setup_kwargs: typing.Any = {}
> ```

## Description

This API is the underlying mechanism for the
[mlem pack](/doc/command-reference/pack) command and allows us to programtically
create ship-able assets from MlemModels such as pip-ready packages, docker
images, etc.

## Parameters

- **`packager`** (required) - Packager to use. Out-of-the-box supported string
  values are ['whl', 'pip', 'docker_dir', 'docker'].
- **`model`** (required) - The model to pack.
- `packager_kwargs` (optional) - Keyword arguments for the underlying packager
  being used.

## Exceptions

None

## Examples

```py
from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier

from mlem.contrib.docker import DockerImagePackager
from mlem.contrib.docker.base import DockerImage
from mlem.contrib.fastapi import FastAPIServer

from mlem.api import pack

train, target = load_iris(return_X_y=True)
model = DecisionTreeClassifier().fit(train, target)
model_meta = MlemModel.from_obj(model)

packed = pack(
    DockerImagePackager(
        server=FastAPIServer(),
        image=DockerImage(name="pack_docker_test_image"),
        force_overwrite=True,
    ),
    model_meta,
)
```
