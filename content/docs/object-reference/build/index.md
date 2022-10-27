# Build extensions

`mlem build` functionality is used to export models to another format that can
be used downstream: Docker image, Python package, or something else. See
[User Guide](/doc/user-guide/building) for more details on how this works.

Build extensions add new types of builders to use with `build`
[API](/doc/api-reference/build) and [CLI](/doc/command-reference/build)
commands.

Typicaly they will implement [Builder](/doc/object-reference/mlem-abcs#builder)
interface.
