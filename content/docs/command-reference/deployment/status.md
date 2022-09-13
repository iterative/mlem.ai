# deployment status

Print status of deployed service.

## Synopsis

```usage
usage: mlem deployment status [-p <path>] [-h] 
                              path

arguments:
  path             Path to deployment meta
```

## Description

The `deployment status` command lets us check the status of the deployment,
which is the deployed app/service serving the model.

### Heroku

The possible statuses for deployments using the `heroku` target platform is:

- unknown
- not_deployed
- starting
- crashed
- stopped
- running

## Options

- `-p <path>`, `--project <path>` - Path to MLEM project [default: (none)]
- `-h`, `--help` - Show this message and exit.

## Example: Get the status of a deployment

```cli
$ mlem deployment status service_name
```
