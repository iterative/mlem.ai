# init

Initialize a MLEM project.

## Synopsis

```usage
usage: mlem init [options] [path]

arguments: [PATH] Where to init project
```

## Description

The `init` command (without given `path`) defaults to the current directory for
the path argument. This creates a `.mlem/` directory and an empty `config.yaml`
file inside it.

Although we recommend using MLEM within a Git repository to track changes using
the standard Git workflows, this is not required. The existence of a `.mlem/`
directory in any path (including remote) constitutes a MLEM project, and MLEM
will be fully functional even without incorporating Git in one's workflow.

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
