# deploy create

Deploy a model to a target environment. You can use an existing deployment
declaration or create a new one on-the-fly.

## Synopsis

```usage
usage: mlem deploy create [options] path

arguments:
PATH  Path to deployment meta (will be created if it does not exist) [required]
```

## Description

The `deploy create` command creates a new deployment for a target environment.
One can either use an existing deployment declaration (created with
`mlem create deployment`) or create a new one on-the-fly with various available
options (see below).

## Options

- `-m, --model TEXT`: Path to model
- `-t, --env TEXT`: Path to target environment
- `-r, --repo TEXT`: Path to MLEM repo [default: (none)]
- `-e, --external`: Save result not in .mlem, but directly in repo
- `--index / --no-index`: Whether to index output in .mlem directory
- `-c, --conf TEXT`: Configuration for new deployment meta if it does not exist
- `-h, --help`: Show this message and exit.

## Example: Create a new deployment from scratch

Here, we define an environment and then create a deployment on it, providing the
deployment configuration on-the-fly

```mlem
$ mlem create env heroku staging --conf api_key=...
...

$ mlem deploy create service_name --model model --env staging --conf name=my_service
...
```

## Example: Create a deployment from a pre-configured deployment

Here, we define an environment, configure a deployment declaration on it using
[`mlem create deployment`](/doc/command-reference/create), and then create our
deployment with a simple concise command which uses the existing pre-configured
deployment declaration

```mlem
$ mlem create env heroku staging --conf api_key=...
...

$ mlem create deployment heroku service_name --conf app_name=my_service --conf model=model --conf env=staging
...

$ mlem deploy create service_name
...
```
