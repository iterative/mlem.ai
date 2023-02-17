# Fly.io

[Fly.io](http://fly.io) is a platform for deploying and running applications. If
you don't have an experience with deploying to external platforms such as
Sagemaker or Kubernetes, we recommend to start with Fly.io or
[Heroku](/doc/user-guide/deploying/heroku).

## Requirements

```cli
$ pip install mlem[flyio]
# or
$ pip install fastapi uvicorn docker
```

To create applications on Fly.io platform all you need is to install their CLI
tool and log in with it:

1. Go to [fly.io](http://fly.io) and set up an account
2. Install `flyctl` using
   [this instruction](https://fly.io/docs/hands-on/install-flyctl/)
3. Login via `flyctl auth login`
4. You also need to provide a credit card, but they won't charge you
   [until you exceed free limits](https://fly.io/docs/about/pricing/#how-it-works).

## Deployment

As with other deployment targets, you can deploy your model to Fly.io in a
single command, for example:

```cli
$ mlem deploy run flyio cv-app \
    --model torch_resnet \
    --app_name mlem-cv \
    --scale_memory 1024 \
    --server streamlit \
    --server.request_serializer torch_image \
    --server.ui_port 8080 \
    --server.server_port 8081
```

Besides, you can pre-define deployment environment with `mlem declare env flyio`
and deployments with `mlem declare deployment flyio app`, to use them later like
this: `mlem deployment run --load app --model=models/rf`.

For more information on declaring environments and deployments, see
[Deployments User Guide](/doc/user-guide/deploying/). For an example of creating
and using those declarations, check out
[examples for Heroku](/doc/user-guide/deploying/heroku/).
