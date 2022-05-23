# mlem.api.deploy()

Deploy a model to target environment. Can use existing deployment declaration or create a new one on-the-fly.

```py
def deploy(
    deploy_meta_or_path: Union[MlemDeploy, str],
    model: Union[MlemModel, str] = None,
    env: Union[MlemEnv, str] = None,
    repo: Optional[str] = None,
    fs: Optional[AbstractFileSystem] = None,
    external: bool = None,
    index: bool = None,
    **deploy_kwargs,
) -> MlemDeploy
```

### Usage:

```py
from mlem.api import deploy

#TODO
```

## Description

This API is the underlying mechanism for the [mlem deploy create](/doc/command-reference/deploy/create) command and provides a programmatic way to create deployments for a target environment.

## Parameters

- **`deploy_meta_or_path`** (required) - Path to deployment meta (will be created if it does not exist)
- `model` (optional) - Path to model
- `env` (optional) - Path to target environment
- `repo` (optional) - Path to MLEM repo
- `fs` (optional) - filesystem to load deploy meta from. If not provided, will be inferred from `deploy_meta_or_path`
- `external` (optional) - Save result not in mlem dir, but directly in repo
- `index` (optional) - Whether to index output in .mlem directory
- `deploy_kwargs` (optional) - Configuration for new deployment meta if it does not exist

## Exceptions

- `MlemObjectNotFound` - Thrown if we can't find MLEM object
- `ValueError` - Please provide model and env args for new deployment

## Examples

```py
from mlem.api import deploy

#TODO
```
