# Deploying models

With MLEM you can create and manage deployments of your models in the cloud.
This uses building and serving functionality under the hood.

Each deployment is MLEM Object that holds following parameters:

- **Target environment** **parameters** is where you want your model to be
  deployed
- **Deployment parameters** are additional parameters for specific deployment
  implementation you chose

Also, each deployment has **state**, which is a snapshot of the actual state of
your deployment. It is created and updated by MLEM during deployment process to
keep track of parameters needed for management. It is stored separately from
declaration.

## Simple deployment

You can try out MLEM deployments with just one command without additional
configuration. You just need your model saved with MLEM and an environment you
want to deploy to

```yaml
$ mlem deployment run <env type> <name> \
    --model <model name> \
    --some_option option_value
```

A MLEM Object named `<name>` of type `deployment` will be created and deployed
to target environment.

To view all available `<env type>` values, run `mlem types env`. Some of them may require setting up credential information or other parameters, which can be provided to `mlem deployment run` command via options.

Also, near `<name>.mlem` file there will be `<name>.mlem.state` file, where MLEM
will dump some parameters during deployment process.

## Managing deployment

After deployment process is done you can use MLEM commands to manage it.

To check status of your deployment run

```cli
$ mlem deployment status <name>
```

To remove deployment, run

```cli
$ mlem deployment remove <name>
```

This will stop the deployment and erase deployment state value

## Making requests

You also can create MLEM Client for your deployment to make some requests:

```python
from mlem.api import load

service = load("<name>")
client = service.get_client()
res = client.predict(data)
```

Or run `deployment apply` from command line:

```cli
$ mlem deployment apply <name> <data>
```

---

## Pre-defining deployment

You can also create deployments without actually running them and later trigger
already configured deployments. For example, this allows you to track deployment
parameters in VCS and use it in CI/CD pipelines more easily.

To create deployment declaration, we will use `declare` command:

```cli
$ mlem declare deployment <deployment type> <name> --some_option option_value
```

This will create deployment declaration file `<name>.mlem` with all specified
options.

<admon>
💡 You can see available deployment types with `mlem types deployment` and available options with `mlem types deployment <deployment type>`

</admon>

Now you can actually run the deployment process just by referencing your
declaration:

```cli
$ mlem deployment run --load <name>
```

## Pre-defining target environment

If you want to re-use your target environment parameters, you can declare a
separate MLEM Object of type `env` and reference it when creating deployments.
To do this, run

```yaml
$ mlem declare env <env type> <name> --key1 value1 --key2 value2
```

This will create and `env` MLEM Object with name `<name>` that you can reference
in `mlem deployment run` with `--env <env name>` option or in
`mlem declare deployment` with `--env=<env name>` option.

## Setting up remote state manager

One of the parameters of the deployment is `state_manager`. Before making any
deployments, you should think about which state manager implementation to use.

If you are a sole collaborator of your project, don't use CI/CD and you don't
plan to run multiple deployment commands in parallel, you should be fine with
the default one. It will save state as local files, you can even commit them to
VCS.

However, for more advanced usage it will not suffice, because your local files
will not be available from your colleague’s machine/CI/CD runner/etc, and VCS
tracked files have, well, versions, which means state may be inconsistent
between different branches/repo clones. And this is where remote state managers
come to play.

You can set up a remote filesystem to hold state, which means you'll have
consistent state among all collaborators. Filelocking mechanism will ensure that
no race condition will occur.

Other remote state manager implementations will be available in future like
databases, key-value stores etc. Please express your interest in them via
issues.

Setting up remote state manager is a lot like setting DVC remote. All you need
to do is provide a URI where you want to store state files. E.g. for s3 it will
look like this

```cli
$ mlem config set core.state.uri s3://bucket/path
```

Note, that all deployments created after that will use it by default if no
`state_manager` field provided.

You can also override project-configured state manager with option like
`--state_manager.uri s3://bucket/path` provided to `mlem declare deployment` or
`mlem deployment run` commands.

## Examples of files

If you are inside MLEM project,
`mlem declare env <env type> <env name> --option value` will create a
`<env name>.mlem` file with contents

```yaml
option: value
object_type: env
type: <env_type>
```

You can edit it manually if you need

State configuration `mlem config set core.state.uri s3://bucket/path` will add
this section to `.mlem.yaml`

```yaml
core:
  state:
    uri: s3://bucket/path
```

Declaring deployment with
`mlem declare deployment <name> --option value --env <env name>` or running
`mlem deployment run ...` without declaring first will create MLEM Object at
`<name>.mlem` with contents

```yaml
option: value
env: <env name>
object_type: deployment
type: <deployment type>
```

Running the deployment will create a state file at `<name>.mlem.state` (or
`s3://bucket/path/.mlem.state/<name>.mlem.state` if you configured state
manager) with contents

```yaml
model_hash: 65bd55a3bb4bc829abdb02f5cf6f1018
step1: { step1 metadata }
step2: { step2 metadata }
type: <deployment state type>
```
