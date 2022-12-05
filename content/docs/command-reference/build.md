# build

Build models into re-usable assets you can distribute and use in production,
such as a Docker image or Python package.

## Synopsis

```usage
usage: mlem build [-m <path>] [-p <path>] [--rev <commitish>]
                  [-f <text>] [-h]
                  [<builder> [builder options] | --load <declaration>]

Builtin builders:
- conda
- docker
- docker_dir
- pip
- requirements
- venv
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

For examples, please refer to the
[Building User Guide](/doc/user-guide/building).
