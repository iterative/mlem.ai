# config

Manipulate [MLEM config](/doc/user-guide/configuration).

## Synopsys

```usage
usage: mlem config [-h]
```

## Description

Use `mlem config set` to set config values and `mlem config get` to get
currently active settings.

## Options

- `-h`, `--help` - Show this message and exit.

## Examples

Set default artifact storage to DVC

```cli
$ mlem config set core.storage.type dvc
```

Get current value of artifact storage

```cli
$ mlem config get core.storage
```
