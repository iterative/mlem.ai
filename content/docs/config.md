# Usage templates

This page provides code templates to copy-paste, change and use. For the context
and motivations check out [Get Started](/doc/get-started).

## Save model

<toggle>
<tab title="From code">

Just replace model saving code with

```py
from mlem.api import save
save(
    clf,
    "models/rf",
    sample_data=df,
)
```

</tab>

<tab title="From existing file">

Just run

```cli
$ mlem import models/rf models/rf.mlem --type pickle
```

</tab>

</toggle>

## Use model

<toggle>
<tab title="Serve with REST API">

Online inference is usually done by exposing your model. MLEM allows to build a
FastAPI server, so you can get predictions via REST API.

<toggle>
<tab title="Serve model">

To start up a FastAPI server exposing your model run:

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

</tab>

<tab title="Build model">

Build a docker image with FastAPI server baked in:

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

Now you can distribute and run the Docker image. Running the container with
`$ docker run -p 8080:8080 mlem-model:latest` will start FastAPI server.

</tab>

<tab title="Deploy model">

To deploy a model to Heroku (or Kubernetes, Sagemaker, or run it in docker
container):

```
$ mlem deployment run heroku app.mlem \
  --model models/rf \
  --app_name example-mlem-get-started-app
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

</tab>

</toggle>

## Send requests to model

<toggle>
<tab title="CLI inference example">

### ⚙️ Expand for a CLI inference example

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

The Swagger UI even helps to generate `curl` commands similar to the above
interactively.

</tab>

<tab title="API inference example">

TODO

</tab>
</toggle>

</tab>
<tab title="Use for batch scoring">

<toggle>
<tab title="Apply from CLI">

TODO: Showcase `mlem apply`

</tab>
<tab title="Build a docker image and apply by running it">

TODO: Showcase `mlem build` and `mlem apply` inside

</tab>
</toggle>

</tab>
<tab title="Use in Python process">

<toggle>
<tab title="Load model in Python process">

TODO: Showcase `mlem.api.load()`

</tab>
<tab title="Build a Python package with a model">

TODO: Showcase `mlem build python` and `from package import` inside

</tab>
</toggle>

</tab>
</toggle>
