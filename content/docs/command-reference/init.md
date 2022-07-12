# init

Initialize a MLEM project.

## Synopsis

```usage
usage: mlem init [options] [path]

arguments:
[path]      Location (file path or URL) to initialize a MLEM project
```

## Description

This creates a `.mlem/` directory and an empty `config.yaml` file in the desired
project `path`, which defaults to the current working directory (`.`).

The existence of a valid `.mlem/` directory in any location (including [remote])
enables all of MLEM's functions. Specifically, it allows for storing references
to MLEM objects found in the project (required by `mlem list`) as well as to
[integrate with DVC](/doc/use-cases/dvc).

<admon type="tip">

We recommend initializing MLEM projects inside Git repositories to track changes
and manage them using standard Git workflows.

</admon>

[remote]: /doc/user-guide/remote-objects

## Options

- `-h, --help`: Show this message and exit.

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
