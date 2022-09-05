# link

Create a link (read alias) for an existing [MLEM Object](/doc/user-guide/basic-concepts#mlem-objects), including from
remote MLEM projects.

## Synopsis

```usage
Usage: mlem link [options] source target

Arguments:
- `SOURCE`: URI of the object you are creating a link to [required]
- `TARGET`: Path to save link object [required]
```

## Description

This command is used to create links to existing
[MLEM objects](/doc/user-guide/basic-concepts#mlem-objects), which in turn
allows you to refer to the object using the `TARGET` path in all future
operations.

A common use-case is to create links for objects present in remote MLEM projects
to incorporate them in the local workspace.

## Options

- `--source-project, --sp TEXT`: Project for source object
- `--rev TEXT`: Repo revision to use  [default: (none)]
- `--target-project, --tp TEXT`: Project to save target to  [default: (none)]
- `-e, --external`: Save result not in .mlem, but directly in project
- `--follow-links, --f / --no-follow-links, --nf`: If True, first follow links while reading {source} before creating this link.  [default: follow-links]
- `--absolute, --abs / --relative, --rel`: Which path to linked object to specify: absolute or relative.  [default: relative]
- `--help`: Show this message and exit.

## Examples

Add a remote object to your local workspace (aka project) without copying it

```cli
$ mlem link rf --source-project https://github.com/iterative/example-mlem-get-started remote_model
```

<admon type="tip">

The remote model can now be served with the link created above, using the
command `mlem serve remote_model fastapi`.

</admon>

Alias a local object with a different name

```cli
$ mlem link my_model latest
```
