# init

Initialize a MLEM repo in the current working directory.

## Synopsis

```usage
usage: mlem init [options] [path]

arguments: [PATH] Where to init repo
```

## Description

The `mlem init` command (without flags) defaults to the
current directory for the path argument. This creates a `.mlem` directory and an
empty `config.yaml` file. Although MLEM is best used within a Git repository to 
track changes, the existence of a `.mlem` directory signifies a MLEM Repo and thus
can exist even without incorporating `git` in one's workflow.

## Options

- `-h, --help`: Show this message and exit.

## Examples

```mlem
$ mlem init
$ mlem init some/local/path
$ mlem init s3://bucket/path/in/cloud
```
