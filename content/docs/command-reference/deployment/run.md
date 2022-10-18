# deployment run

Deploy a model to a target environment. Can use an existing deployment
declaration or create a new one on-the-fly.

## Synopsis

```usage
usage: mlem deployment run [-l <path>] [-m <path>] [--mp <path>]
                           [--mr <commitish>] [-p <path>]
                           [--rev <commitish>] [-h]
```

## Description

The `deployment run` command creates a new deployment for a target environment.
One can either use an existing deployment declaration (created with
`mlem declare deployment`) or create a new one on-the-fly with various available
options (see below).

## Options

- `-l <path>`, `--load <path>` - File to load deployment config from
- `-m <path>`, `--model <path>` - Path to MLEM model
- `--mp <path>`, `--model-project <path>` - Project with model
- `--mr <commitish>`, `--model-rev <commitish>` - Revision of model
- `-p <path>`, `--project <path>` - Path to MLEM project [default: (none)]
- `--rev <commitish>` - Repo revision to use [default: (none)]
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
