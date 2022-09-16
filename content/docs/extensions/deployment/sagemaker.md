# Sagemaker Deployments Support

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
