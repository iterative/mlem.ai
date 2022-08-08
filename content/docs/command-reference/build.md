# build

Build models to create re-usable, ship-able entities such as a Docker image or
Python package.

## Synopsis

```usage
usage: mlem build [options] model [subtype]

arguments:
MODEL      Path to model  [required]
[SUBTYPE]  Type of build. Choices: ['whl', 'pip', 'docker_dir', 'docker']
```

## Description

This command provides flexible options to create various distribution-ready
release assets from your models, like `pip`-ready Python packages or Docker
images.

## Options

- `-p, --project TEXT`: Path to MLEM project [default: (none)]
- `--rev TEXT`: Repo revision to use [default: (none)]
- `-l, --load TEXT`: File to load builder config from
- `-c, --conf TEXT`: Options for builder in format `field.name=value`
- `-f, --file_conf TEXT`: File with options for builder in format
  `field.name=path_to_config`
- `-h, --help`: Show this message and exit.

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
