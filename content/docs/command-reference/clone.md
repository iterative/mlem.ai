# clone

Download MLEM object from `uri` and save it to `target`

## Synopsis

```usage
usage: mlem clone [options] uri target

arguments:
URI     URI to object you want to clone  [required]
TARGET  Path to store the downloaded object.  [required]
```

## Description

Clones a [MLEM Object](/doc/user-guide/basic-concepts#mlem-objects) from source to target destination. This is useful in cases where you need the model without cloning the whole repository.

## Options

- `-r, --repo TEXT`: Path to MLEM repo  [default: (none)]
- `--rev TEXT`: Repo revision to use  [default: (none)]
- `--target-repo, --tr TEXT`: Repo to save target to  [default: (none)]
- `-e, --external`: Save result not in .mlem, but directly in repo
- `--link / --no-link`: Whether to create link for output in .mlem directory
- `--help`: Show this message and exit.

## Examples

```mlem
Copy remote model to local directory
$ mlem clone rf --repo https://github.com/iterative/example-mlem-get-started --rev main mymodel

Copy remote model to remote MLEM repo
$ mlem clone rf --repo https://github.com/iterative/example-mlem-get-started --rev main mymodel --tr s3://mybucket/mymodel
```
