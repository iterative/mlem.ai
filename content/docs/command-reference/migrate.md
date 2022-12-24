# migrate

Migrate metadata objects from older MLEM version

## Synopsis

```usage
usage: mlem migrate [-p <path>] [-r] [-h]
                    path

arguments:
  path             URI of the MLEM object you are migrating or directory to
                   migrate
```

## Description

This command will help you migrate to newer MLEM versions. When backward
compatibility was broken and the new MLEM version can't work with older `.mlem`
metafiles, you can run `mlem migrate` to re-write the metafiles to adhere to the
new format.

## Options

- `-p <path>`, `--project <path>` - Path to MLEM project [default: (none)]
- `-r`, `--recursive` - Enable recursive search of directory
- `-h`, `--help` - Show this message and exit.

## Examples

Migrate all files in the current dir and all its subdirs to the new format with:

```cli
$ mlem migrate -r .
```
