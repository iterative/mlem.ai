# init

Initialize a MLEM working directory.

> An Initialized working directory is required for running other MLEM commands.

## Synopsis

```usage
usage: mlem init [options] [path]

arguments: [PATH] Target path to workspace
```

## Description

The `init` command (without given `path`) defaults to the current directory for
the path argument. This creates a `.mlem` directory and an empty `config.yaml`
file inside it. Although we recommend using MLEM within a Git repository to
track changes using the standard git workflows, this is not required for MLEM.
The existence of a `.mlem` subdirectory in any path (including remote)
constitutes a MLEM workspace, and MLEM will be fully functional even without
incorporating `git` in one's workflow.

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
