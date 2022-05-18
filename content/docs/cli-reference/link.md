# link

Create a link / alias for a [MLEM Object](/doc/user-guide/basic-concepts#mlem-objects).

## Synopsis

```usage
usage: mlem link [options] source target

arguments:
SOURCE  URI to object you are creating link to  [required]
TARGET  Path to save link object  [required]
```

## Description

The command creates links for MLEM Objects which allows us to refer to that object using the link we just created for all future operations. A common use-case is to create links for MLEM Objects present in remote repositories.

## Options

- `--source-repo, --sr TEXT`: Repo for source object
- `--rev TEXT`: Repo revision to use  [default: (none)]
- `--target-repo, --tr TEXT`: Repo to save target to  [default: (none)]
- `-e, --external`: Save result not in .mlem, but directly in repo
- `--follow-links, --f / --no-follow-links, --nf`: If True, first follow links while reading {source} before creating this link. [default: follow-links]
- `--absolute, --abs / --relative, --rel`: Which path to linked object to specify: absolute or relative. [default: relative]
- `-h, --help`: Show this message and exit.

## Examples

```mlem
Add alias to local object
$ mlem link my_model latest

Add remote object to your repo without copy
$ mlem link rf --source-repo https://github.com/iterative/example-mlem-get-started remote_model
```

> One can then serve this remote model using the link we just created using `mlem serve remote_model fastapi`
