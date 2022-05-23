# deploy teardown

Stop and destroy a deployment.

## Synopsis

```usage
usage: mlem deploy teardown [options] path

arguments:
PATH  Path to deployment meta  [required]
```

## Description

The `deploy teardown` destroys the deployment by first setting its state to
`not_deployed` before proceeding to actually destroying the deployed service,
deleting its associated runtime resources.

## Options

- `-r, --repo TEXT`: Path to MLEM repo [default: (none)]
- `-h, --help`: Show this message and exit.

## Example: Stop and destroy a deployment

```cli
$ mlem deploy teardown service_name
...
```
