# clone

Copy a [MLEM Object](/doc/user-guide/basic-concepts#mlem-objects) from `uri` and
saves a copy of it to `target` path.

## Synopsis

```usage
usage: mlem clone [-p <path>] [--rev <commitish>]
                  [--tp <path>] [-e] [--index] [-h] 
                  uri target

arguments:
  uri              URI to object you want to clone
  target           Path to store the downloaded object.
```

## Description

Cloning a [MLEM Object](/doc/user-guide/basic-concepts#mlem-objects) from source
to target destination creates an independent copy of the original object. This
can be useful in cases where you need the model without cloning the whole
repository.

## Options

- `-p <path>`, `--project <path>` - Path to MLEM project [default: (none)]
- `--rev <commitish>` - Repo revision to use [default: (none)]
- `--tp <path>`, `--target-project <path>` - Project to save target to [default:
  (none)]
- `-e`, `--external` - Save result not in .mlem, but directly in project
- `--index` / `--no-index` - Whether to index output in .mlem directory
- `-h`, `--help` - Show this message and exit.

## Examples

Copy a remote model (in GitHub) to a local directory

```cli
$ mlem clone rf --project https://github.com/iterative/example-mlem-get-started --rev main mymodel
...
```

Copy a remote model from a GitHub repo, to a different, remote, S3 MLEM project

```cli
$ mlem clone rf --project https://github.com/iterative/example-mlem-get-started --rev main mymodel --tp s3://mybucket/mymodel
...
```
