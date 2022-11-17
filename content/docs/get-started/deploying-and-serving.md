# Deploying and Serving models

The value of MLEM really starts to show when you need to package and deploy
models to serve as part of your application or even for testing. This is where a
lot of Machine Learning engineers and Data Scientists resort to less-than-ideal
solutions, due to lack of experience, knowledge or just in order to stay focused
on modeling, data cleaning or algorithm improvements. For this scenario, we're
assuming you went through the
[model management guide](/doc/get-started/management) and already have a
[model saved locally to a file](/doc/get-started/management#saving-your-model).

## Running a local model server

Let's start with the basics and run a simple local model server. MLEM can do
that for you using FastAPI or, for example, RabbitMQ. We'll check out how it
works with FastAPI since serving models via REST API is quite common. To launch
a FastAPI server serving your model, simply run:

```cli
$ mlem serve fastapi --model models/rf
⏳️ Loading model from models/rf.mlem
Starting fastapi server...
🖇️  Adding route for /predict
🖇️  Adding route for /predict_proba
🖇️  Adding route for /sklearn_predict
🖇️  Adding route for /sklearn_predict_proba
Checkout openapi docs at <http://0.0.0.0:8080/docs>
INFO:     Started server process [16696]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8080 (Press CTRL+C to quit)
```

The server is now running and listening on `http://0.0.0.0:8080` for HTTP
requests.

Servers automatically create endpoints from model methods using the
`sample_data` argument provided to [`mlem.api.save`](/doc/api-reference/save).

### Making requests

While the model server is running, you can use your browser to open the Swagger
UI (OpenAPI) at [http://localhost:8080/docs](http://localhost:8080/docs) and
check out OpenAPI spec and query examples.

<details>

#### ⚙️ Expand for a CLI inference example

You can launch requests at the running server from a terminal, Using CLI
commands like `curl` or `httpie`.

For example:

```cli
$ curl -X 'POST' \
  'http://0.0.0.0:8080/predict_proba' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "data": {
    "values": [
      {
        "sepal length (cm)": 0,
        "sepal width (cm)": 1,
        "petal length (cm)": 2,
        "petal width (cm)": 3
      }
    ]
  }
}'
[[0.47,0.24,0.29]]
```

The Swagger UI also helps to generate `curl` commands similar to the above
interactively.

</details>

When it comes to serving your model, MLEM can do even more to help you. MLEM can
generate client-side code to query/infer the model server. Learn more about this
in [Serving User Guide](/doc/user-guide/serving/).

## Building and Packaging models

Building a model is a way to make it distributable and portable, and “bake” it
into something usable in a production environment. In the modern software stack
this usually comes in the form of creating a Docker container image or a Python
package. Sometimes it may also include exporting the model to a different format
to comply or be compatible with the app or a specific serving environment.

`mlem build` uses the built-in [Serving](/doc/user-guide/serving) functionality
under the hood, which means that with one simple command, MLEM can build a
FastAPI or RabbitMQ server serving your model, and also package it into a Docker
container image for deployment or distribution.

### Building a Docker container image

Let's see how we can easily generate a Docker container for our model:

```cli
$ mlem build docker docker-builder.mlem \
    --model models/rf \
    --image.name mlem-model
⏳️ Loading model from models/rf.mlem
🛠 Building MLEM wheel file...
💼 Adding model files...
🛠 Generating dockerfile...
💼 Adding sources...
💼 Generating requirements file...
🛠 Building docker image mlem-model:latest...
✅  Built docker image mlem-model:latest
```

`docker-builder.mlem` is going to have a
[builder specification](/doc/user-guide/building) (we also call this a
"declaration").

<details>

#### Inspecting the Docker container image metafile

Let's take a look at the simple metafile describing the docker container image:

`$ cat docker-builder.mlem`

```yaml
image:
  name: rf-docker
object_type: builder
server:
  type: fastapi
type: docker
```

We can see most of the complexity is hidden away in the `server` behavior and
`docker` type, allowing MLEM to do all the heavy lifting for us.

</details>

### Using your model Docker container image

Now you can distribute and run the Docker image. Let's run the container:

```cli
$ docker run -p 8080:8080 mlem-model:latest
Starting fastapi server...
🖇️  Adding route for /predict
🖇️  Adding route for /predict_proba
🖇️  Adding route for /sklearn_predict
🖇️  Adding route for /sklearn_predict_proba
Checkout openapi docs at <http://0.0.0.0:8080/docs>
INFO:     Started server process [16696]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8080 (Press CTRL+C to quit)
```

As we can see, this is just a FastAPI server. Just like we saw when
[we ran the server locally](#running-a-local-model-server), we can now open the
https://localhost:8080/docs in the browser and query the model with `curl` or
run `mlem apply-remote`.

## Deploying models to production

For the final steps of taking your models to production, MLEM lets you easily
create deployments in the cloud from your models. This uses the building and
serving functionalities under the hood. For example, a Heroku deployment
combines Docker image building with FastAPI serving.

MLEM can deploy to several supported platforms such as
[Sagemaker](/doc/user-guide/deploying/sagemaker) and
[Kubernetes](/doc/user-guide/deploying/kubernetes) (see the full list in the
[Deploying User Guide](/doc/user-guide/deploying)). For now, we'll use the
Heroku deployment method as an example.

### Deploying to Heroku

To create applications on Heroku platform you need a Heroku API key.

You can either set `HEROKU_API_KEY` environment variable or use
[Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) and run
`heroku login`. To allow MLEM to push the Docker image built to Heroku Docker
Registry, you'll also need to execute `heroku container:login`.

<details>

#### ⚙️ How to obtain Heroku API key

- Go to [heroku.com](http://heroku.com)
- Sign up or login with an existing account
- Go to account settings by clicking your profile picture on the main page
- Find the API Key section, and reveal an existing key or re-generate it

</details>

After getting authorized with Heroku, we can run the deployment command:

```
$ mlem deployment run heroku app.mlem \
  --model models/rf \
  --app_name {your-name}-mlem-get-started-app
⏳️ Loading model from models/rf.mlem
⏳️ Loading deployment from app.mlem
🛠 Creating docker image for heroku
  🛠 Building MLEM wheel file...
  💼 Adding model files...
  🛠 Generating dockerfile...
  💼 Adding sources...
  💼 Generating requirements file...
  🛠 Building docker image registry.heroku.com/{your-name}-mlem-get-started-app/web...
  ✅  Built docker image registry.heroku.com/{your-name}-mlem-get-started-app/web
  🔼 Pushing image registry.heroku.com/{your-name}-mlem-get-started-app/web to registry.heroku.com
  ✅  Pushed image registry.heroku.com/{your-name}-mlem-get-started-app/web to registry.heroku.com
🛠 Releasing app {your-name}-mlem-get-started-app formation
✅  Service {your-name}-mlem-get-started-app is up. You can check it out at https://{your-name}-mlem-get-started-app.herokuapp.com/
```

A Deployment specification (or [declaration](/doc/command-reference/declare))
was saved to `app.mlem`. Using this app declaration, you can re-deploy the same
app with a different model.

<details>

### See app.mlem contents

```yaml
$ cat app.mlem
app_name: example-mlem-get-started-app
object_type: deployment
type: heroku
```

</details>

Beside `app.mlem`, there is one more file that was saved: `app.mlem.state`. It
contains the information about the deployment we just created, including which
MLEM model we used, the URL of the deployment and other useful information. You
can learn more about state files in [User Guide](/doc/user-guide/deploying).

### Making requests

Your example application is now live on Heroku! You can browse to
[this deployed example](http://example-mlem-get-started-app.herokuapp.com) and
see the same OpenAPI documentation as you would see in your local or docker
deployments. To learn how to easily send requests to your model with MLEM, refer
to the [Deployment User Guide](/doc/user-guide/deploying).

If you would like to destroy the deployment now, you can find the instructions
[here](/doc/user-guide/deploying#managing-deployment).
