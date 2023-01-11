# SageMaker

MLEM SageMaker allow you to deploy MLEM models to AWS SageMaker. You can learn
more about SageMaker
[here](https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html).

## Requirements

```cli
$ pip install mlem[sagemaker]
# or
$ pip install sagemaker boto3
```

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

```py
from mlem.contrib.sagemaker.env_setup import sagemaker_terraform

sagemaker_terraform(export_secret="creds.csv")
```

It's recommended to use [aws cli](https://aws.amazon.com/cli/) with separate
profile configured for MLEM. You can also provide credentials with
[AWS environment variables](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html).

## Configuring and running deployment

[SageMaker Environment](#class-sagemakerenv) declaration can be used to hold
your SageMaker configuration.

```cli
$ mlem declare env sagemaker ... --role <role> \
                                 --account <account> \
                                 --region <region> \
                                 --bucket <bucket> \
                                 --ecr_repository <repo>
```

You can also pre-declare [SageMaker Deployment](#class-sagemakerdeployment)
itself.

```cli
$ mlem declare deployment sagemaker ... --env ... \
                                        --method predict \
                                        --instance_type ml.t2.medium
```

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
3. Endpoint configuration is created as per
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

## Making requests

MLEM SageMaker deployments are fully compatible with SageMaker
[InvokeEndpoint](https://docs.aws.amazon.com/sagemaker/latest/APIReference/API_runtime_InvokeEndpoint.html)
API, however it's a lot easier to use
[MLEM SagemakerClient](#class-sagemakerclient). To obtain one, just call
`get_client` method on your deployment object.

```py
from mlem.api import load_meta

service = load_meta("...")
client = service.get_client()
```

You can then use this `client` instance to invoke your model as if it is local.

```py
data = ...  # pd.DataFrame or whatever model.predict accepts
preds = client.predict(data)
```

> MLEM do not support batch invocations. We will add support for them soon
