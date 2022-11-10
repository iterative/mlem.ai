# mlem.api.deploy()

Deploy a model to a target environment. Can use an existing deployment
declaration or create a new one on-the-fly.

```py
def deploy(
    deploy_meta_or_path: Union[MlemDeployment, str],
    model: Union[MlemModel, str],
    env: Union[MlemEnv, str] = None,
    project: Optional[str] = None,
    rev: Optional[str] = None,
    fs: Optional[AbstractFileSystem] = None,
    env_kwargs: Dict[str, Any] = None,
    **deploy_kwargs,
) -> MlemDeployment
```

## Description

This API is the underlying mechanism for the
[mlem deployment run](/doc/command-reference/deployment/run) command and
provides a programmatic way to create deployments for a target environment.

## Parameters

- **`deploy_meta_or_path`** (required) - MlemDeployment object or path to it.
- **`model`** (required) - The model to deploy.
- **`env`** (required) - The environment to deploy to.
- `project` (optional) - Path to mlem project where to load obj from.
- `rev` (optional) - Revision if object is stored in git repo.
- `fs` (optional) - Filesystem to use to load the object.
- `env_kwargs` (optional) - Additional kwargs to pass to the environment.
- `deploy_kwargs` (optional) - Additional kwargs to pass to the deployment.

## Returns

`MlemDeployment`: The deployment object.

## Exceptions

- `MlemObjectNotFound` - Thrown if we can't find MLEM object
- `ValueError` - Please provide model and env args for new deployment

[//]: # '## Examples'
[//]: #
[//]: # '```py'
[//]: # 'from mlem.api import deploy'
[//]: #
[//]: # '#TODO'
[//]: # '```'
