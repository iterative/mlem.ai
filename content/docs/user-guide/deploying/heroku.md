# Heroku

[Heroku](https://heroku.com) is the platform suitable for deploy of simple
applications. If you don't have an experience with deploying to external
platforms such as Sagemaker or Kubernetes, we recommend to start with Heroku.

## Requirements

```bash
pip install mlem[heroku]
# or
pip install fastapi uvicorn docker
```

To create applications on Heroku platform all you need is Heroku API key. You
need to either set `HEROKU_API_KEY` environment variable or use
[Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) to run
`heroku login`. To push your Docker image to Heroku Docker Registry, you'll also
need to execute `heroku container:login`.

<details>

### ⚙️How to obtain Heroku API key

- Go to [heroku.com](http://heroku.com)
- Sign up or login with existing account
- Go to account settings by clicking your profile picture on the main page
- Find API Key section and reveal existing one or re-generate it

</details>

> You can also set API token via `--api_key` option to some commands, but this
> may have security issues

## Defining target environment

To deploy something somewhere, we need to define this “somewhere” first, or in
MLEM terms, declare a `target environment` object. It will contain all the
information needed to access it. In the case of Heroku, all we need is an API
key.

To declare a new target env, run

```cli
$ mlem declare env heroku staging
💾 Saving env to staging.mlem
```

## Defining deployment

Now, as we defined our target env, we can deploy our model there. Deployments
are also MLEM objects, which means that they need to have their definition.

To create one for Heroku, we once again will use `declare` command to configure
our deployment. We use `example-mlem-get-started-app` for the app name, but you
can change it to something unique:

```cli
$ mlem declare deployment heroku app \
    --app_name=example-mlem-get-started-app \
    --env=staging
💾 Saving deployment to app.mlem
```

Now we can actually run the deployment process (this can take a while):

```cli
$ mlem deployment run --load app.mlem --model=models/rf
⏳️ Loading model from models/rf.mlem
⏳️ Loading deployment from app.mlem
🛠 Creating docker image for heroku
  🛠 Building MLEM wheel file...
  💼 Adding model files...
  🛠 Generating dockerfile...
  💼 Adding sources...
  💼 Generating requirements file...
  🛠 Building docker image registry.heroku.com/example-mlem-get-started-app/web...
  ✅  Built docker image registry.heroku.com/example-mlem-get-started-app/web
  🔼 Pushing image registry.heroku.com/example-mlem-get-started-app/web to registry.heroku.com
  ✅  Pushed image registry.heroku.com/example-mlem-get-started-app/web to registry.heroku.com
🛠 Releasing app example-mlem-get-started-app formation
✅  Service example-mlem-get-started-app is up. You can check it out at https://example-mlem-get-started-app.herokuapp.com/
```

<admon type="tip">

You can also define and run the deployment on-the-fly using options for
`mlem deployment run`, e.g.:

```cli
$ mlem deployment run heroku app \
    --model models/rf \
    --app_name=example-mlem-get-started-app
```

</admon>

## Making requests

The application is now live on Heroku. You can go
[here](http://example-mlem-get-started-app.herokuapp.com) and see the same
OpenAPI documentation. For details on it, refer to the **Serving** section. You
can also try to do some requests:

```py
from mlem.api import load
from mlem.runtime.client.base import HTTPClient

client = HTTPClient(host="http://example-mlem-get-started-app.herokuapp.com", port=80)
res = client.predict(load("test_x.csv"))
```

Also, you can create a client using deployment meta object:

```py
from mlem.api import load

service = load("app")
client = service.state.get_client()
res = client.predict(load("test_x.csv"))
```

There is also the remote counterpart of `apply` command. It will send requests
to your service instead of loading model into memory. There are two options to
achieve this in CLI: using the service address or the deploy meta.

```cli
$ mlem apply-remote http test_x.csv --host=http://example-mlem-get-started-app.herokuapp.com --port=80 --json
[1, 0, 2, 1, 1, 0, 1, 2, 1, 1, 2, 0, 0, 0, 0, 1, 2, 1, 1, 2, 0, 2, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1, 0, 0, 2, 1, 0]

$ mlem deployment apply app test_x.csv --json
[1, 0, 2, 1, 1, 0, 1, 2, 1, 1, 2, 0, 0, 0, 0, 1, 2, 1, 1, 2, 0, 2, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1, 0, 0, 2, 1, 0]
```

<admon type="tip">

You don’t even need to have the deployment metadata locally:

```cli
$ mlem deployment apply --json \
  https://github.com/iterative/example-mlem-get-started/myservice \
  https://github.com/iterative/example-mlem-get-started/test_x.csv
```

</admon>

## Managing deployment

Finally, you can check the status of your service with:

```cli
$ mlem deployment status app
running
```

And stop your service with

```cli
$ mlem deployment remove app
⏳️ Loading deployment from app.mlem
🔗 Loading link to staging.mlem
🔻 Deleting example-mlem-get-started-app heroku app
💾 Updating deployment at app.mlem
```

Note, that it will not delete the deployment definition, just update its state.
