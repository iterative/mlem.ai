# deployment run

Deploy a model to a target environment. Can use an existing deployment
declaration or create a new one on-the-fly.

## Synopsis

```usage
usage: mlem deployment run [-m <text>] [-t <text>] [-p <path>] [-e]
                           [--index] [-c <text>] [-h] 
                           path

arguments:
  path             Path to deployment meta (will be created if it does not
                   exist)
```

## Description

The `deployment run` command creates a new deployment for a target environment.
One can either use an existing deployment declaration (created with
`mlem declare deployment`) or create a new one on-the-fly with various available
options (see below).

## Options

- `-m <text>`, `--model <text>` - Path to model
- `-t <text>`, `--env <text>` - Path to target environment
- `-p <path>`, `--project <path>` - Path to MLEM project [default: (none)]
- `-e`, `--external` - Save result not in .mlem, but directly in project
- `--index` / `--no-index` - Whether to index output in .mlem directory
- `-c <text>`, `--conf <text>` - Options in format `field.name=value`
- `-h`, `--help` - Show this message and exit.

## Example: Create a new deployment from scratch

Here, we define an environment and then run a deployment on it, providing the
deployment configuration on-the-fly

```cli
$ mlem declare env heroku staging --conf api_key=...
...

$ mlem deployment run service_name --model model --env staging --conf name=my_service
...
```

## Example: Run a deployment from a pre-configured deployment

Here, we define an environment, configure a deployment declaration on it using
[`mlem declare deployment`](/doc/command-reference/declare), and then run our
deployment with a simple concise command which uses the existing pre-configured
deployment declaration

```cli
$ mlem declare env heroku staging --conf api_key=...
...

$ mlem declare deployment heroku service_name --conf app_name=my_service --conf model=model --conf env=staging
...

$ mlem deploy run service_name
...
```
