# init

Initialize a [MLEM project](/doc/user-guide/project-structure).

## Synopsis

```usage
usage: mlem init [-h]
                 path

arguments:
  path             Where to init project
```

## Description

This creates a `.mlem.yaml` file in the desired project `path`, which defaults
to the current working directory (`.`). `.mlem.yaml` is a config file that
configures MLEM project, including the
[integration with DVC](/doc/user-guide/dvc).

## Options

- `-h`, `--help` - Show this message and exit.

## Examples

Default Initialization (current working directory)

```cli
$ mlem init
```

Initialization to a specified local path

```cli
$ mlem init some/local/path
```

Initialization in a remote S3 bucket

```cli
$ mlem init s3://bucket/path/in/cloud
```
