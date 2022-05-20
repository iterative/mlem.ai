# deploy teardown

Stop and destroy deployed instance.

## Synopsis

```usage
usage: mlem deploy teardown [options] path

arguments:
PATH  Path to deployment meta  [required]
```

## Description

The `deploy teardown` command first destroys the deployed service setting its
state to `not_deployed` and then finally deletes it.

## Options

- `-r, --repo TEXT`: Path to MLEM repo [default: (none)]
- `-h, --help`: Show this message and exit.

## Examples

```mlem
$ mlem deploy teardown service_name
```
