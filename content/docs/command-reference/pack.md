# pack

Pack models to create re-usable entities such as a docker image, pip-ready
python packages etc. that can be used in production ready settings.

## Synopsis

```usage
usage: mlem pack [options] model [subtype]

arguments:
MODEL      Path to model  [required]
[SUBTYPE]  Type of packing. Choices: ['whl', 'pip', 'docker_dir', 'docker']
```

## Description

The `pack` command provides options to create python packages / docker images
from your models (which are available as
[MLEM objects](/doc/user-guide/basic-concepts#mlem-objects)). For a detailed
example, see the get-started guide [here](/doc/get-started/packaging).

## Options

- `-r, --repo TEXT`: Path to MLEM repo [default: (none)]
- `--rev TEXT`: Repo revision to use [default: (none)]
- `-l, --load TEXT`: File to load packing config from
- `-c, --conf TEXT`: Options for packing in format `field.name=value`
- `-f, --file_conf TEXT`: File with options for packing in format
  `field.name=path_to_config`
- `-h, --help`: Show this message and exit.

## Examples

```mlem
Build docker image from model
$ mlem pack mymodel docker -c server.type=fastapi -c image.name=myimage

Create pack docker_dir declaration and build it
$ mlem create packager docker_dir -c server=fastapi -c target=build pack_dock
$ mlem pack mymodel --load pack_dock
```
