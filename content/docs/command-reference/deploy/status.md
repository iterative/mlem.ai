# deploy status

Show the status of a deployment.

## Synopsis

```usage
usage: mlem deploy status [options] path

arguments:
PATH  Path to deployment meta  [required]
```

## Description

The `deploy status` command lets us check the status of the deployment, which is
the deployed app/service serving the model.

### Heroku

The possible statuses for deployments using the `heroku` target platform is:

- unknown
- not_deployed
- starting
- crashed
- stopped
- running

## Options

- `-r, --repo TEXT`: Path to MLEM repo [default: (none)]
- `-h, --help`: Show this message and exit.

## Example: Get the status of a deployment

```mlem
$ mlem deploy status service_name
...
```
