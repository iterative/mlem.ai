# Exporting models (building)

Building is a way to “bake” your model into something usable in production like
a Docker image, or export your model into another format. You can see the full
list of available builders [here](/doc/object-reference/build).

To build your MLEM model you need to use either
[CLI](/doc/command-reference/build) or [API](/doc/api-reference/build) `build`
command and provide builder-specific arguments.

<details>

### ⚙️ About builders and arguments

There are different types of builders and each one has it’s own set of available
arguments. They are listed [here](/doc/object-reference/build), but for quick
reference you can run `mlem types builder` for list of builders and
`mlem types builder pip` for list of available arguments

</details>

## Pre-configured builders

Alternatively, you can pre configure your builder in the form of yaml file
either manually or via `mlem declare` command which uses the same interface:

```cli
$ mlem declare builder pip my_pip_config \
  --target build/ --package_name example_mlem_get_started
💾 Saving builder to my_pip_config.mlem
$ cat my_pip_config.mlem
object_type: builder
package_name: example_mlem_get_started
target: build/
type: pip
```

Now you can use this config as a value for `--load` option in `mlem build`

```cli
$ mlem build --load my_pip_config --model rf
⏳️ Loading builder from pip_config.mlem
⏳️ Loading model from rf.mlem
💼 Written `example_mlem_get_started` package data to `build`
```

Also, you can do all of this programmatically via Python API:

```py
from mlem.api import build, load_meta

build("pip", "rf", target="build", package_name="example_mlem_get_started")
# or
build(load_meta("my_pip_config"), "rf")
```

<details>

### ⚙️ Remote builder config

Like every other MLEM object, builders can be read from remote repos. Try

`mlem build --load https://github.com/iterative/example-mlem-get-started/pip_config --model rf`

</details>
