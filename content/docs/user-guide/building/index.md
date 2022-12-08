# Building models

Building is a way to “bake” your model into something usable in production like
a Docker image, or export your model into another format or even export the
underlying requirements and dependencies of the model, allowing one to create
virtual environments out of it. You can see the full list of available builders
[here](/doc/object-reference/build).

To build your MLEM model you need to use either
[CLI](/doc/command-reference/build) or [API](/doc/api-reference/build) `build`
command and provide builder-specific arguments.

<details>

### ⚙️ About builders and arguments

There are different types of builders and each one has it’s own set of available
arguments. You can find them in the nested pages, but for quick reference you
can run `mlem build --help` for list of builders and
`mlem build $BUILDER --help` for list of available arguments.

</details>

## Pre-configured builders

In the [Get Started Tutorial](/doc/get-started) we demonstrated how to build a
docker image out of the model server. Now let's see what is the builder
declaration we mentioned there. You can pre-configure your builder in the form
of yaml file that we call "declaration" either manually or via `mlem declare`
command:

```cli
$ mlem declare builder docker docker_builder.mlem \
    --image.name mlem-model \
    --env.daemon.host "" \
    --server fastapi
💾 Saving builder to docker_builder.mlem
```

Let's see the builder declaration:

```yaml
$ cat docker_builder.mlem
image:
  name: mlem-model
object_type: builder
server:
  type: fastapi
type: docker
```

This declaration basically defines all things you need to build a docker image.
It includes image name, what server you want to serve your model with, and some
optional things like image tag. Now you can use this config as a value for
`--load` option in `mlem build`:

```cli
$ mlem build --load docker_builder.mlem \
    --model https://github.com/iterative/example-mlem-get-started/rf
⏳️ Loading builder from docker_builder.mlem
⏳️ Loading model from https://github.com/iterative/example-mlem-get-started/rf
🛠 Building MLEM wheel file...
💼 Adding model files...
🛠 Generating dockerfile...
💼 Adding sources...
💼 Generating requirements file...
🛠 Building docker image mlem-model:latest...
✅ Built docker image mlem-model:latest
```

Also, you can do all of this programmatically via Python API:

```py
from mlem.api import build, load_meta

build(
    "docker",
    "https://github.com/iterative/example-mlem-get-started/rf",
    image={"name": "build"},
    server="fastapi",
    env={"daemon": {"host": ""}},
)
# or
build(
    load_meta("docker_builder"),
    "https://github.com/iterative/example-mlem-get-started/rf",
)
```

<details>

### ⚙️ Remote builder config

Like every other MLEM object, builders can be read from remote repos. Try

```cli
mlem build \
    --load https://github.com/iterative/example-mlem-get-started/pip_config \
    --model https://github.com/iterative/example-mlem-get-started/rf
```

</details>
