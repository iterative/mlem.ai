# Deploying models

<details>

### 🧳 Requirements

`pip install mlem[fastapi,docker]`

You also need docker up and running on your machine.

</details>

You can also create deployments in cloud from your models.

> ⚠️ This functionality is experimental and is subject to change. We’ll add more
> target platforms in upcoming releases.

Deployment often uses packaging and serving functionalities. For example, Heroku
deployment that is showcased in this section actually uses docker image
packaging with FastAPI serving.

## Defining target environment

To deploy something somewhere, we need to define this “somewhere” first, or in
MLEM terms, create a `target environment` object. It will contain all the
information needed to access it. In the case of Heroku, all we need is an API
key.

<details>

### ⚙️How to obtain Heroku API key

- Go to [heroku.com](http://heroku.com)
- Sign up or login with existing account
- Go to account settings by clicking your profile picture on the main page
- Find API Key section and reveal existing one or re-generate it

</details>

To create a new target env, run

```mlem
$ mlem create env heroku staging -c api_key=<you api key>
💾 Saving env to .mlem/env/staging.mlem
```

> Note that api_key argument is optional and MLEM will use `HEROKU_API_KEY` env
> variable if you don’t provide it via config.

## Defining deployment

Now, as we defined our target env, we can deploy our model there. Deployments
are also MLEM objects, which means that they need to have their definition. To
create one for Heroku, we once again will use `create` command to configure our
deployment.

```bash
$ mlem create deployment heroku myservice -c app_name=example-mlem-get-started -c model=model -c env=staging
💾 Saving deployment to .mlem/deployment/service_name.mlem
```

> 💡 We use `example-mlem-get-started` for app_name, but you should change it to
> something unique.

⛳
[Create deployment definition](https://github.com/iterative/example-mlem-get-started/tree/7-deploy-meta)

Now we can actually run the deployment process (this can take a while):

```bash
$ mlem deploy create myservice
⏳️ Loading deployment from .mlem/deployment/myservice.mlem
🔗 Loading link to .mlem/env/staging.mlem
🔗 Loading link to .mlem/model/rf.mlem
💾 Updating deployment at .mlem/deployment/myservice.mlem
🏛 Creating Heroku App example-mlem-get-started
💾 Updating deployment at .mlem/deployment/myservice.mlem
🛠 Creating docker image for heroku
  💼 Adding model files...
  🛠 Generating dockerfile...
  💼 Adding sources...
  💼 Generating requirements file...
  🛠 Building docker image registry.heroku.com/example-mlem-get-started/web...
  ✅  Built docker image registry.heroku.com/example-mlem-get-started/web
  🔼 Pushed image registry.heroku.com/example-mlem-get-started/web to remote registry at host registry.heroku.com
💾 Updating deployment at .mlem/deployment/myservice.mlem
🛠 Releasing app my-mlem-service formation
💾 Updating deployment at .mlem/deployment/myservice.mlem
✅  Service example-mlem-get-started is up. You can check it out at https://my-mlem-service.herokuapp.com/
```

> 💡 You can also create and configure deployment on-the-fly using `-c` options
> for `mlem deploy create` command:
>
> `$ mlem deploy create service_name -m model -t staging -c app_name=example-mlem-get-started`

⛳
[Service deployed](https://github.com/iterative/example-mlem-get-started/tree/8-deploy-create)

## Making requests

You can go [here](http://example-mlem-get-started.herokuapp.com) and see the
same OpenAPI documentation. For details on it, refer to the **Serving** section.
You can also try to do some requests:

```python
from mlem.api import load
from mlem.runtime.client.base import HTTPClient

client = HTTPClient(host="http://example-mlem-get-started.herokuapp.com", port=80)
res = client.predict(load("test_x.csv"))
```

Also, you can create a client using deployment meta object:

```python
from mlem.api import load

service = load("myservice")
client = service.state.get_client()
res = client.predict(load("test_x.csv"))
```

There is also the remote counterpart of `apply` command. It will send requests
to your service instead of loading model into memory. There are two options to
achieve this in CLI: using the service address or the deploy meta.

```bash
$ mlem apply-remote http test_x.csv -c host=http://my-mlem-service.herokuapp.com -c port=80 --json
[1, 0, 2, 1, 1, 0, 1, 2, 1, 1, 2, 0, 0, 0, 0, 1, 2, 1, 1, 2, 0, 2, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1, 0, 0, 2, 1, 0]

$ mlem deploy apply myservice test_x.csv --json
[1, 0, 2, 1, 1, 0, 1, 2, 1, 1, 2, 0, 0, 0, 0, 1, 2, 1, 1, 2, 0, 2, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1, 0, 0, 2, 1, 0]
```

> 💡 As always, you don’t need to have deployment meta locally:
>
> `$ mlem deploy apply https://github.com/iterative/example-mlem-get-started/myservice https://github.com/iterative/example-mlem-get-started/test_x.csv --json`

## Managing deployment

Finally, you can check the status of your service with:

```bash
$ mlem deploy status myservice
running
```

And stop your service with

```bash
$ mlem deploy teardown myservice
⏳️ Loading deployment from .mlem/deployment/myservice.mlem
🔗 Loading link to .mlem/env/staging.mlem
🔻 Deleting my-mlem-service heroku app
💾 Updating deployment at .mlem/deployment/myservice.mlem
```

Note, that it will not delete the deployment definition, just update its state.
