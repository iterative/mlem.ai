# deploy status

Print status of deployed service.

## Synopsis

```usage
usage: mlem deploy status [options] path

arguments:
PATH  Path to deployment meta  [required]
```

## Description

The `deploy status` command lets us check the status of the deployed service.
The current possible list of statuses with the `heroku` implementation are:

- unknown
- not_deployed
- starting
- crashed
- stopped
- running

## Options

- `-r, --repo TEXT`: Path to MLEM repo [default: (none)]
- `-h, --help`: Show this message and exit.

## Examples

```mlem
$ mlem deploy status service_name
```
