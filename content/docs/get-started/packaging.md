# Packaging models

Saving and loading models is fun, but the real value of a model is how you can
use it. To make it easier to get models to production, MLEM has 3 related
functionalities: packaging, serving, and deploying. We’ll start with packaging.

Packaging is a way to “bake” your model into something usable in production like
a Docker image, or export your model into another format. For this tutorial we
will create a pip-ready package from our model. You can see the full list of
available packagers [here](/doc/user-guide/mlem-abcs#packager).

## Creating python package

To create a `build/` directory with pip package run this command:

```cli
$ mlem pack rf pip -c target=build/ -c package_name=example_mlem_get_started
⏳️ Loading model from .mlem/model/rf.mlem
💼 Written `example_mlem_get_started` package data to `build`
```

In this command, we specified that we want to build `rf` model with `pip`
packager and then provided two arguments, `target` is the directory where the
packager will write all the files and `package_name` is the name of our package.

<details>

### ⚙️ About packagers and arguments

There are more types of packagers and each one has it’s own set of available
arguments. They are listed [here](/doc/user-guide/mlem-abcs#packager), but for
quick reference you can run `mlem types packager` for list of packagers and
`mlem types packager pip` for list of available arguments

</details>

## Exploring python package

Let’s see what we’ve got

```bash
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

As you can see, the packager generated all the files necessary for a python
package. This includes sources, requirements,
[setup.py](https://docs.python.org/3/distutils/setupscript.html), and the model
itself.

## Using python package

Now you can distribute and install the package. It's code declares all the same
methods our model had, so you can try to use it like this:

```py
import example_mlem_get_started

example_mlem_get_started.predict(df)
```

## Pre-configured packagers

Alternatively, you can pre configure your packager in the form of yaml file
either manually or via `mlem create` command which uses the same interface with
multiple `-c` options like this:

```bash
$ mlem create packager pip pip_config \
  -c target=build/ -c package_name=example_mlem_get_started
💾 Saving packager to .mlem/packager/pip_config.mlem
$ cat .mlem/packager/pip_config.mlem
object_type: packager
package_name: example_mlem_get_started
target: build/
type: pip
```

Now you can use this config as a value for `--load` option in `mlem pack`

```bash
$ mlem pack rf -l pip_config
⏳️ Loading packager from .mlem/packager/pip_config.mlem
⏳️ Loading model from .mlem/model/rf.mlem
💼 Written `example_mlem_get_started` package data to `build`
```

<details>

### ⛳ [Add packager config](https://github.com/iterative/example-mlem-get-started/tree/5-pack)

```bash
$ git add .mlem/packager/pip_config.mlem
$ git commit -m "Add package config"
$ git diff 5-pack
```

</details>

Also, you can do all of this programmatically via Python API:

```py
from mlem.api import pack, load_meta

pack("pip", "rf", target="build", package_name="example_mlem_get_started")
pack(load_meta("pip_config"), "rf")
```

<details>

### ⚙️ Remote packager config

Like every other MLEM object, packagers can be read from remote repos. Try

`mlem pack rf -l https://github.com/iterative/example-mlem-get-started/pip_config`

</details>
