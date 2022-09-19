# Sagemaker Deployments Support

Implements MlemEnv, MlemDeployment and DeployState to work with AWS SageMaker

## Description

MLEM SageMaker allow you to deploy MLEM models to AWS SageMaker. You can learn
more about SageMaker
[here](https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html).

### Preparing infrastructre

To be able to deploy to SageMaker you need to do some AWS configuration. This is
not MLEM specific requirements, rather it's needed for any SageMaker
interaction.

Here is the list:

- AWS User Credentials
- SageMaker access for this user (policy
  `arn:aws:iam::aws:policy/AmazonSageMakerFullAccess`)
- ECR access for this user (policy
  `arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryFullAccess`)
- AWS IAM Role with SageMaker access
- S3 Access

You can configure those manually or use existing ones. You can also use
[terraform](https://www.terraform.io/) with
[this template](https://github.com/iterative/mlem/tree/main/mlem/contrib/sagemaker/mlem_sagemaker.tf)
and
[helper script](https://github.com/iterative/mlem/tree/main/mlem/contrib/sagemaker/env_setup.py)
(terraform needs to be installed).

> This script is not part of MLEM public API, so you'll need to run it manually
> like this

```python
from mlem.contrib.sagemaker.env_setup import sagemaker_terraform

sagemaker_terraform(export_secret="creds.csv")
```

It's recommended to use [aws cli](https://aws.amazon.com/cli/) with separate
profile configured for MLEM. You can also provide credentials with
[AWS environment variables](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html).

### Configuring and running deployment

[SageMaker Environment](#class-sagemakerenv) declaration can be used to hold
your SageMaker configuration.

TODO

You can also pre-declare [SageMaker Deployment](#class-sagemakerdeployment)
itself.

TODO

To run deployment, run

```cli
$ mlem deployment run ... --model <path>
```

### What happens internally

Once you run our this sweet `mlem deployment run ...` command, a number of
things will happen.

1. If you did not specify pre-built image, a new docker image will be built. It
   will include all model's requirements. This image will be pushed to
   configured ECR repository.
2. Model is packaged and uploaded to configured s3 bucket as per
   [this doc](https://docs.aws.amazon.com/sagemaker/latest/dg/realtime-endpoints-deployment.html#realtime-endpoints-deployment-create-model)
3. Enpoint Configuration is created as per
   [this doc](https://docs.aws.amazon.com/sagemaker/latest/dg/realtime-endpoints-deployment.html#realtime-endpoints-deployment-create-endpoint-config)
4. Model is deployed thus creating a SageMaker Endpoint

After this command exits, however it can take some time on SageMakers side to
actually run VMs with your model. You can check status with

```cli
$ mlem deployment status ...
```

or block until model is ready with

```cli
$ mlem deployment wait ... -i starting
```

### Making requests

MLEM SageMaker deployments are fully compatible with SageMaker
[InvokeEndpoint](https://docs.aws.amazon.com/sagemaker/latest/APIReference/API_runtime_InvokeEndpoint.html)
API, however it's a lot easier to use
[MLEM SagemakerClient](#class-sagemakerclient). To obtain one, just call
`get_client` method on your deployment object.

```python
from mlem.api import load_meta

service = load_meta("...")
client = service.get_client()
```

You can then use this `client` instance to invoke your model as if it is local.

```python
data = ...  # pd.DataFrame or whatever model.predict accepts
preds = client.predict(data)
```

> MLEM do not support batch invocations. We will add support for them soon

## Requirements

```bash
pip install mlem[sagemaker]
# or
pip install sagemaker boto3
```

## Examples

```python

```

## Implementation reference

### `class SagemakerClient`

**MlemABC parent type**: `client`

**MlemABC type**: `sagemaker`

    Client to make SageMaker requests

**Fields**:

- `endpoint_name: str` _(required)_ - Name of SageMaker Endpoint

- `aws_vars: AWSVars` _(required)_ - AWS Configuration

- `signature: Signature` _(required)_ - Signature of deployed method

---

### `class SagemakerDeployState`

**MlemABC parent type**: `deploy_state`

**MlemABC type**: `sagemaker`

    State of SageMaker deployment

**Fields**:

- `model_hash: str` - hash of deployed model meta

- `image: DockerImage` - Built image

- `image_tag: str` - Built image tag

- `model_location: str` - Location of uploaded model

- `endpoint_name: str` - Name of SageMaker endpoint

- `endpoint_model_hash: str` - Hash of deployed model

- `method_signature: Signature` - Signature of deployed method

- `region: str` - AWS Region

---

### `class SagemakerDeployment`

**MlemABC parent type**: `deployment`

**MlemABC type**: `sagemaker`

    SageMaker Deployment

**Fields**:

- `state_manager: StateManager` - State manager used

- `method: str = "predict"` - Model method to be deployed

- `image_tag: str` - Name of the docker image to use

- `use_prebuilt: bool = False` - Use pre-built docker image. If True, image_name
  should be set

- `model_arch_location: str` - Path on s3 to store model archive (excluding
  bucket)

- `model_name: str` - Name for SageMaker Model

- `endpoint_name: str` - Name for SageMaker Endpoint

- `initial_instance_count: int = 1` - Initial instance count for Endpoint

- `instance_type: str = "ml.t2.medium"` - Instance type for Endpoint

- `accelerator_type: str` - The size of the Elastic Inference (EI) instance to
  use

---

### `class ECRegistry`

**MlemABC parent type**: `docker_registry`

**MlemABC type**: `ecr`

    ECR registry

**Fields**:

- `account: str` _(required)_ - AWS Account

- `region: str` _(required)_ - AWS Region

- `host: str` - Address of the registry

---

### `class SagemakerEnv`

**MlemABC parent type**: `env`

**MlemABC type**: `sagemaker`

    SageMaker environment

**Fields**:

- `role: str` - Default role

- `account: str` - Default account

- `region: str` - Default region

- `bucket: str` - Default bucket

- `profile: str` - Default profile

- `ecr_repository: str` - Default ECR repository

---

### `class SageMakerServer`

**MlemABC parent type**: `server`

**MlemABC type**: `_sagemaker`

    Server to use inside SageMaker containers

**Fields**:

- `host: str = "0.0.0.0"` - Host to use

- `port: int = 8080` - Port to use

- `method: str = "predict"` - Method to expose
