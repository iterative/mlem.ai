# deploy

A set of commands to set up and manage deployments.

## Synopsis

```usage
usage: mlem deploy [options] COMMAND [ARGS]...

arguments:
COMMAND
    apply     Apply method of deployed service
    create    Deploy a model to target environment
    status    Print status of deployed service
    teardown  Stop and destroy deployed instance
```

## Description

The `deploy` command is used to manage the lifecycle of deployments along with giving access to methods of the deployed model. Currently, only `heroku` is supported as a target platform.

## Options

- `-h, --help`: Show this message and exit.

## Example: Create a new deployment

```mlem
$ mlem create env heroku staging -c api_key=<...>
$ mlem deploy create service_name -m model -t staging -c name=my_service
```

## Example: Apply method of deployed service

```mlem
$ mlem deploy apply service_name mydatset --method predict
```

## Example: Print status of deployed service

```mlem
$ mlem deploy status service_name
```

## Example: Stop and destroy deployed instance

```mlem
$ mlem deploy teardown service_name
```
