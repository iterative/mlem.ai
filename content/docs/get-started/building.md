# Exporting models (building)

Saving and loading models is fun, but the real value of a model is how you can
use it. To make it easier to get models to production, MLEM has 3 related
functionalities: building, serving, and deploying. We’ll start with building.

Building is a way to “bake” your model into something usable in production like
a Docker image, or export your model into another format. For this tutorial we
will create a pip-ready package from our model. You can see the full list of
available builders [here](/doc/object-reference/mlem-abcs#builder).

## Creating Python package

To create a `build/` directory with pip package run this command:

```cli
$ mlem build rf pip -c target=build/ -c package_name=example_mlem_get_started
⏳️ Loading model from .mlem/model/rf.mlem
💼 Written `example_mlem_get_started` package data to `build`
```

In this command, we specified that we want to build `rf` model with `pip`
builder and then provided two arguments, `target` is the directory where the
builder will write all the files and `package_name` is the name of our package.

<details>

### ⚙️ About builders and arguments

There are more types of builders and each one has it’s own set of available
arguments. They are listed [here](/doc/object-reference/mlem-abcs#builder), but for
quick reference you can run `mlem types builder` for list of builders and
`mlem types builder pip` for list of available arguments

</details>

## Exploring Python package

Let’s see what we’ve got

```cli
$ tree build/
build/
├── MANIFEST.in
├── example_mlem_get_started
│   ├── __init__.py
│   ├── model
│   └── model.mlem
├── requirements.txt
└── setup.py
```

As you can see, the builder generated all the files necessary for a python
package. This includes sources, requirements,
[setup.py](https://docs.python.org/3/distutils/setupscript.html), and the model
itself.

## Using Python package

Now you can distribute and install the package. Its code declares all the same
methods our model had, so you can try to use it like this:

```py
import example_mlem_get_started

example_mlem_get_started.predict(df)
```

## Pre-configured builders

Alternatively, you can pre configure your builder in the form of yaml file
either manually or via `mlem declare` command which uses the same interface with
multiple `-c` options like this:

```cli
$ mlem declare builder pip pip_config \
  -c target=build/ -c package_name=example_mlem_get_started
💾 Saving builder to .mlem/builder/pip_config.mlem
$ cat .mlem/builder/pip_config.mlem
object_type: builder
package_name: example_mlem_get_started
target: build/
type: pip
```

Now you can use this config as a value for `--load` option in `mlem build`

```cli
$ mlem build rf -l pip_config
⏳️ Loading builder from .mlem/builder/pip_config.mlem
⏳️ Loading model from .mlem/model/rf.mlem
💼 Written `example_mlem_get_started` package data to `build`
```

<details>

### ⛳ [Add builder config](https://github.com/iterative/example-mlem-get-started/tree/4-pack)

```cli
$ git add .mlem/packager/pip_config.mlem
$ git commit -m "Add package config"
$ git diff 4-pack
```

</details>

Also, you can do all of this programmatically via Python API:

```py
from mlem.api import build, load_meta

build("pip", "rf", target="build", package_name="example_mlem_get_started")
build(load_meta("pip_config"), "rf")
```

<details>

### ⚙️ Remote builder config

Like every other MLEM object, builders can be read from remote repos. Try

`mlem build rf -l https://github.com/iterative/example-mlem-get-started/pip_config`

</details>
