# declare

Declares a new [MLEM Object](/doc/user-guide/basic-concepts#mlem-objects) metafile from config args and config files.

## Synopsis

```usage
Usage: mlem declare [options] subtype

Builtin subtypes:
- builder
- client
- deployment
- docker_registry
- env
- server
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

- `--help`: Show this message and exit.

## Examples

Declare an environment object metafile with a config key:

```cli
# Fetch all available config args for a heroku env
$ mlem types env heroku
[not required] api_key: str = None

# Declare the heroku env
$ mlem declare env heroku production --conf api_key="mlem_heroku_staging"
💾 Saving env to .mlem/env/staging.mlem

# Print the contents of the new heroku env metafile
$ cat .mlem/env/staging.mlem
api_key: mlem_heroku_staging
object_type: env
type: heroku
```
