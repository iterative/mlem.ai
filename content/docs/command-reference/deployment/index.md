# deployment

A set of commands to set up and manage deployments

## Synopsis

```usage
usage: mlem deployment [-h]
                       command 

subcommands:
  run              Deploy a model to a target environment.
  remove           Stop and destroy deployed instance.
  status           Print status of deployed service.
  apply            Apply a deployed model to data.
```

## Description

The `deployment` commands are used to manage the lifecycle of deployments along
with giving access to methods of the deployed model.

A "deployment" is an application/service instance consisting of a server,
serving a specific model, using a specific environment definition, and running
on a target platform.

MLEM deployments allow `applying` methods and even whole datasets on models.
Each model lists its supported methods in its `.mlem` metafile, and those are
automatically used by MLEM to wire and expose endpoints on the application
server upon deployment. Applying data on the deployment is a very handy shortcut
of bulk inferring data on the served model.

> Currently, only `heroku` is supported as a target but more platforms will be
> added soon!

## Options

- `-h, --help`: Show this message and exit.
