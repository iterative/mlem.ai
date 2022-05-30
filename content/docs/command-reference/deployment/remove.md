# deployment remove

Stop and destroy deployed instance.

## Synopsis

```usage
usage: mlem deployment remove [options] path

arguments:
PATH  Path to deployment meta  [required]
```

## Description

The `deployment remove` destroys the deployment by first setting its state to
`not_deployed` before proceeding to actually destroying the deployed service,
deleting its associated runtime resources.

## Options

- `-p, --project TEXT`: Path to MLEM project [default: (none)]
- `-h, --help`: Show this message and exit.

## Example: Stop and destroy a deployment

```cli
$ mlem deployment remove service_name
```
