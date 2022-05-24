# pack

Package models to create re-usable, ship-able, entities such as a docker image
or pip-ready python packages.

> Use packaged models as distribution-ready release assets

## Synopsis

```usage
usage: mlem pack [options] model [subtype]

arguments:
MODEL      Path to model  [required]
[SUBTYPE]  Type of packing. Choices: ['whl', 'pip', 'docker_dir', 'docker']
```

## Description

The `pack` command provides flexible options to create various ship-able assets
from your models like python packages or docker images.

## Options

- `-r, --repo TEXT`: Path to MLEM repo [default: (none)]
- `--rev TEXT`: Repo revision to use [default: (none)]
- `-l, --load TEXT`: File to load packing config from
- `-c, --conf TEXT`: Options for packing in format `field.name=value`
- `-f, --file_conf TEXT`: File with options for packing in format
  `field.name=path_to_config`
- `-h, --help`: Show this message and exit.

## Examples

Build a docker image from a model

```cli
$ mlem pack mymodel docker --conf server.type=fastapi --conf image.name=myimage
```

Create a `docker_dir` packager config called `pack_dock`, and use it to package
a model

```cli
$ mlem create packager docker_dir --conf server=fastapi --conf target=build pack_dock
...

$ mlem pack mymodel --load pack_dock
...
```

For a detailed example using python-package, see the get-started guide
[packaging example](/doc/get-started/packaging).
