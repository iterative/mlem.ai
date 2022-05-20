# deploy create

Deploy a model to target environment. Can use existing deployment declaration or
create a new one on-the-fly.

## Synopsis

```usage
usage: mlem deploy create [options] path

arguments:
PATH  Path to deployment meta (will be created if it does not exist) [required]
```

## Description

The `deploy create` command creates a new deployment for a target environment.
One can either use an existing deployment declaration (created with
`mlem create deployment`) OR perhaps create a new one too directly with various
options available (see below).

## Options

- `-m, --model TEXT`: Path to model
- `-t, --env TEXT`: Path to target environment
- `-r, --repo TEXT`: Path to MLEM repo [default: (none)]
- `-e, --external`: Save result not in .mlem, but directly in repo
- `--index / --no-index`: Whether to index output in .mlem directory
- `-c, --conf TEXT`: Configuration for new deployment meta if it does not exist
- `-h, --help`: Show this message and exit.

## Examples

```mlem
$ mlem create env heroku staging -c api_key=...
$ mlem deploy create service_name -m model -t staging -c name=my_service

Deploy existing meta
$ mlem create env heroku staging -c api_key=...
$ mlem create deployment heroku service_name -c app_name=my_service -c model=model -c env=staging
$ mlem deploy create service_name
```
