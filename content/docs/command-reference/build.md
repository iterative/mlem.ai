# build

Build models into re-usable assets you can distribute and use in production,
such as a Docker image or Python package.

## Synopsis

```usage
usage: mlem build [-m <path>] [-p <path>] [--rev <commitish>]
                  [-f <text>] [-h]
                  [<builder> [builder options] | --load <declaration>]

Builtin builders:
- docker
- docker_dir
- kubernetes
- pip
- whl
```

## Description

This command provides flexible options to create various distribution-ready
release assets from your models, like `pip`-ready Python packages or Docker
images.

## Options

- `-m <path>`, `--model <path>` - Path to MLEM model [required]
- `-p <path>`, `--project <path>` - Path to MLEM project [default: (none)]
- `--rev <commitish>` - Repo revision to use [default: (none)]
- `-f <text>`, `--file_conf <text>` - File with options for builder in format
  `field.name=path_to_config`
- `-h`, `--help` - Show this message and exit.

## Examples

Build a Docker image from a model

```cli
$ mlem build mymodel docker --conf server.type=fastapi --conf image.name=myimage
```

Create a `docker_dir` builder config called `build_dock`, and use it to package
a model

```cli
$ mlem declare builder docker_dir --conf server=fastapi --conf target=build build_dock
...

$ mlem build mymodel --load build_dock
...
```

For a detailed example using python-package, see the get-started guide
[building example](/doc/get-started/building).
