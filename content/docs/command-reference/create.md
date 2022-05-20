# create

Creates new mlem object metafile from conf args and config files

## Synopsis

```usage
usage: mlem create [options] object_type [subtype] path

arguments:
OBJECT_TYPE  Type of metafile to create  [required]
[SUBTYPE]    Subtype of MLEM object  [default: ]
PATH         Where to save object  [required]
```

## Description

Metadata files (ending with `.mlem`) can be created for
[MLEM objects](/doc/user-guide/basic-concepts#mlem-objects) using the
`mlem create` command. This is particularly useful in filling up configuration
values for environments and deployments using command line. Each MLEM object,
along with its subtype (particular implementation) will accept different
configuration arguments, the list of which can be fetched by using
`mlem types OBJECT_TYPE SUBTYPE` (See the last example
[here](/doc/command-reference/types#examples))

## Options

- `-c, --conf TEXT`: Values for object fields in format
  `field.nested.name=value`
- `-r, --repo TEXT`: Path to MLEM repo [default: (none)]
- `-e, --external`: Save result not in .mlem, but directly in repo
- `--index / --no-index`: Whether to index output in .mlem directory
- `-h, --help`: Show this message and exit.

## Examples

```mlem
Fetch which all config can be passed to create a heroku env
$ mlem types env heroku
[not required] api_key: str = None

Create heroku env
$ mlem create env heroku production -c api_key="mlem_heroku_staging"
💾 Saving env to .mlem/env/staging.mlem

See the contents of saved metafile
$ cat .mlem/env/staging.mlem
api_key: mlem_heroku_staging
object_type: env
type: heroku
```
