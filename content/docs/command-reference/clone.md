# clone

Copy a [MLEM Object](/doc/user-guide/basic-concepts#mlem-objects)
from `uri` and saves a copy of it to `target` path.

## Synopsis

```usage
usage: mlem clone [options] uri target

arguments:
URI     URI to object you want to clone  [required]
TARGET  Path to store the downloaded object.  [required]
```

## Description

Cloning a [MLEM Object](/doc/user-guide/basic-concepts#mlem-objects) from source
to target destination creates an independent copy of the original object.
This can be useful in cases where you need the model without
cloning the whole repository.

## Options

- `-r, --repo TEXT`: Path to MLEM repo [default: (none)]
- `--rev TEXT`: Repo revision to use [default: (none)]
- `--target-repo, --tr TEXT`: Repo to save target to [default: (none)]
- `-e, --external`: Save result not in .mlem, but directly in repo
- `--link / --no-link`: Whether to create link for output in .mlem directory
- `--help`: Show this message and exit.

## Examples

Copy a remote model (in GitHub) to a local directory
```mlem
$ mlem clone rf --repo https://github.com/iterative/example-mlem-get-started --rev main mymodel
...
```

Copy a remote model from a GitHub repo, to a different, remote, S3 MLEM repo
```mlem
$ mlem clone rf --repo https://github.com/iterative/example-mlem-get-started --rev main mymodel --tr s3://mybucket/mymodel
...
```
