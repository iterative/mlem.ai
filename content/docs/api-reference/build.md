# mlem.api.build()

Pack model into something useful, such as docker image, Python package or
something else.

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

<details>

### The arguments supplied to this method can be found with `mlem types` command

```cli
$ mlem types builder pip
Type mlem.contrib.pip.base.PipBuilder
MlemABC parent type: builder
MlemABC type: pip
MlemObject type name: builder
Create a directory python package
Fields:
[required] package_name: str
        Name of python package
[required] target: str
        Path to save result
[not required] templates_dir: List[str] = []
        list of directories to look for jinja templates
[not required] templates_dir.0: str = None
        Element of templates_dir
[not required] python_version: str = None
        Required python version
[not required] short_description: str = ""
        short_description
[not required] url: str = ""
        url
[not required] email: str = ""
        author's email
[not required] author: str = ""
        author's name
[not required] version: str = "0.0.0"
        package version
[not required] additional_setup_kwargs: Dict[str, any] = {}
        additional parameters for setup()
[not required] additional_setup_kwargs.key: any = None
        Element of additional_setup_kwargs
```

</details>

## Parameters

- **`builder`** (required) - Builder to use.
- **`model`** (required) - The model to build.
- **`builder_kwargs`** (required) - Additional keyword arguments to pass to the
  builder.

## Returns

The result of the build, different for different builders.

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
