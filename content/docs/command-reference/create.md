# create

Creates a new [MLEM Object](/doc/user-guide/basic-concepts#mlem-objects)
metafile from conf args and config files.

> This is particularly useful in filling up configuration values for
> environments and deployments

## Synopsis

```usage
usage: mlem create [options] object_type [subtype] path

arguments:
OBJECT_TYPE  Type of metafile to create  [required]
[SUBTYPE]    Subtype of MLEM object  [default: ]
PATH         Where to save object  [required]
```

## Description

Metadata files (with `.mlem` file extension) can be created for
[MLEM Objects](/doc/user-guide/basic-concepts#mlem-objects) using the
`mlem create` command. Each MLEM Object, along with its subtype (which
represents a particular implementation), will accept different configuration
arguments. The list of configuration arguments per type can be fetched by
running the [`mlem types`](/doc/command-reference/types) command. For an example
output, check out the last example [here](/doc/command-reference/types#examples)

## Options

- `-c, --conf TEXT`: Values for object fields in format
  `field.nested.name=value`
- `-r, --repo TEXT`: Path to MLEM repo [default: (none)]
- `-e, --external`: Save result not in .mlem, but directly in repo
- `--index / --no-index`: Whether to index output in .mlem directory
- `-h, --help`: Show this message and exit.

## Examples

Create an environment metafile with a config key

```mlem
# Fetch all config arguments which can be passed for a heroku env
$ mlem types env heroku
[not required] api_key: str = None

# Create the heroku env
$ mlem create env heroku production --conf api_key="mlem_heroku_staging"
💾 Saving env to .mlem/env/staging.mlem

# print the contents of the saved metafile for the heroku env
$ cat .mlem/env/staging.mlem
api_key: mlem_heroku_staging
object_type: env
type: heroku
```
