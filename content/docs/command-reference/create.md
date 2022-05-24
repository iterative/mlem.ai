# create

Creates a new [MLEM Object](/doc/user-guide/basic-concepts#mlem-objects)
metafile from config args and config files.

## Synopsis

```usage
usage: mlem create [options] object_type [subtype] path

arguments:
OBJECT_TYPE  Type of metafile to create  [required]
[SUBTYPE]    Subtype of MLEM object  [default: ]
PATH         Where to save object  [required]
```

## Description

`.mlem` metafiles can be created for
[MLEM Objects](/doc/user-guide/basic-concepts#mlem-objects) using this command.
This is particularly useful for configuring environments and deployments.

Each MLEM Object, along with its subtype (which represents a particular
implementation), will accept different configuration arguments. The list of
configuration arguments per type can be fetched by running the
[`mlem types`](/doc/command-reference/types) command. For an example output,
check out the last example [here](/doc/command-reference/types#examples)

## Options

- `-c, --conf TEXT`: Values for object fields in format
  `field.nested.name=value`
- `-r, --repo TEXT`: Path to MLEM repo [default: (none)]
- `-e, --external`: Save result not in .mlem, but directly in repo
- `--index / --no-index`: Whether to index output in .mlem directory
- `-h, --help`: Show this message and exit.

## Examples

Create an environment object metafile with a config key:

```cli
# Fetch all available config args for a heroku env
$ mlem types env heroku
[not required] api_key: str = None

# Create the heroku env
$ mlem create env heroku production --conf api_key="mlem_heroku_staging"
💾 Saving env to .mlem/env/staging.mlem

# Print the contents of the new heroku env metafile
$ cat .mlem/env/staging.mlem
api_key: mlem_heroku_staging
object_type: env
type: heroku
```
