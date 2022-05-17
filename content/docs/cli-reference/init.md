# init

Initialize a MLEM repo in the current working directory.

## Synopsis

```usage
usage: mlem init [options] [path]
```

## Description

The command [mlem init](/doc/cli-reference/init) (without flags) defaults to the current directory for the path argument. This creates a `.mlem` directory and an empty `config.yaml` file. Although, MLEM is best used within a Git repository, the existence of a `.mlem` directory signifies a MLEM Repo and thus can exist even without incorporating `git` in one's workflow.

## Arguments:

    [PATH]  Where to initialize the MLEM repository

## Options:

- `-h, --help`:  Show this message and exit.

## Examples:

    $ mlem init
    $ mlem init some/local/path
    $ mlem init s3://bucket/path/in/cloud
