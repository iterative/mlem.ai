---
description: 'Learn how you can use MLEM to easily manage and deploy models'
---

# Get Started

We assume MLEM is already [installed](/doc/install) in your active Python
environment, as well as `pandas`, `sklearn`, `fastapi`, `uvicorn` and `docker`

<details>

### ⚙️ Expand for setup instructions

Let's create a separate folder and an isolated virtual environment to cleanly
install all the requirements we need:

```cli
$ mkdir mlem-get-started
$ cd mlem-get-started
$ python3 -m venv .venv
$ source .venv/bin/activate
$ pip install pandas scikit-learn mlem[fastapi,heroku]
```

We'll use docker later on to package and serve a model locally. To install
docker, please refer to the
[official installation guide](https://docs.docker.com/get-docker/).

That's it, it's that simple! You're ready to MLEM.

</details>

## Saving your model

Before we see just how many things MLEM can help us with, we first need to save
an ML model to a file with MLEM.

Let's create and execute the following `train.py` Python script as a basic
example:

```py
from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier

from mlem.api import save


data, y = load_iris(return_X_y=True, as_frame=True)
rf = RandomForestClassifier(
    n_jobs=2,
    random_state=42,
)
rf.fit(data, y)
save(
    rf,
    "models/rf",
    sample_data=data,
)
```

Here, we loaded a well-known
[Iris flower dataset](https://archive.ics.uci.edu/ml/datasets/iris) with
scikit-learn and trained a simple classifier. But instead of pickling the model,
we save it with MLEM (check out the full list of supported
[ML frameworks](/doc/object-reference/model)).

Let's see what we got by using the `tree` terminal command:

```cli
$ tree models/
models
├── rf
└── rf.mlem
```

Along side the model binary `models/rf`, MLEM saved a metadata file
`models/rf.mlem`. We refer to this as a "Codification" of the model.

The `.mlem` metafile contains all the metadata we need in order to use the model
later:

1. Model methods: `predict` and `predict_proba`
2. Input data schema: describes the data frame (Iris dataset)
3. Python Requirements: `sklearn` and `pandas` in this case, with specific
   versions

<admon type='tip'>

Note that we didn't have to specify any of this information ourselves. MLEM
inspects the object (even if it's complex) and infers all of this automatically!

</admon>

<details>

### Click to see the full contents of the `rf.mlem` metafile.

```yaml
artifacts:
  data:
    hash: 5a38e5d68b9b9e69e9e894bcc9b8a601
    size: 163651
    uri: rf
model_type:
  methods:
    predict:
      args:
        - name: data
          type_:
            columns:
              - sepal length (cm)
              - sepal width (cm)
              - petal length (cm)
              - petal width (cm)
            dtypes:
              - float64
              - float64
              - float64
              - float64
            index_cols: []
            type: dataframe
      name: predict
      returns:
        dtype: int64
        shape:
          - null
        type: ndarray
    predict_proba:
      args:
        - name: data
          type_:
            columns:
              - sepal length (cm)
              - sepal width (cm)
              - petal length (cm)
              - petal width (cm)
            dtypes:
              - float64
              - float64
              - float64
              - float64
            index_cols: []
            type: dataframe
      name: predict_proba
      returns:
        dtype: float64
        shape:
          - null
          - 3
        type: ndarray
  type: sklearn
object_type: model
requirements:
  - module: sklearn
    version: 1.1.2
  - module: numpy
    version: 1.22.4
  - module: pandas
    version: 1.5.0
```

</details>

<details>

### Click to learn about model codification

#### Why do it the MLEM way ?

Saving models to files or loading them back into python objects may seem like a
deceptively simple task at first. For example, `pickle` and `torch` libraries
can serialize/deserialize model objects to/from files, but we will see that MLEM
adds some "special sauce" in the form of metadata files that will help us a lot
down the line in the heavier operations like packaging and serving of the models
in various ways. MLEM allows us to automate a lot of the pain points we would
hit later on in our ML workflow by codifying metadata about your models (and
other objects) and intelligently using it later on.

</details>

Once you saved the model with MLEM, you can load it to use in a Python runtime,
or generate predictions for a dataset stored on the disk from the command line.

# Model Prediction

Here we'll go over basic model usage to get you oriented with loading,
predicting and and batch scoring using MLEM.

## Simple Python model prediction

We can use MLEM to load the model back into an `sklearn` object and predict some
probabilities. Create this `predict.py` script:

```py
from mlem.api import load

model = load("models/rf")  # RandomForestClassifier
features = [
    "sepal length (cm)",
    "sepal width (cm)",
    "petal length (cm)",
    "petal width (cm)",
]
x = pd.DataFrame([[0, 1, 2, 3]], columns=features)
y_pred = model.predict_proba(x)

print(y_pred)
```

Now, let's run the script:

```cli
$ python predict.py
[[0.47 0.24 0.29]]
```

We see that the prediction was successfully printed into stdout.

## Batch scoring in CLI

In a Batch scoring scenario you often want to apply your model to a dataset from
a command line to get instant feedback about how your model behaves. Let's see
how MLEM can help by creating an example file and running `mlem apply`:

```cli
$ echo "sepal length (cm),sepal width (cm),petal length (cm),petal width (cm)
0,1,2,3" > new_data.csv

$ mlem apply models/rf new_data.csv \
    --method predict_proba \
    --import --it "pandas[csv]"
⏳️ Importing object from new_data.csv
⏳️ Loading model from models/rf.mlem
🍏 Applying `predict_proba` method...
[[0.47 0.24 0.29]]
```

<details>

### Learn more about `--method`, `--import` and `--it` options used

- The `--method`/`-m` flag tells MLEM to invoke the `predict_proba` method and
  return the class probabilities, instead of the default `predict`.
- The `--import`/`-i` flag tells MLEM to import the data on the fly.
- The `--import-type` / `--it` flag, helps MLEM understand the data format.
  Here, it's `pandas[csv]` a csv file that should be read with Pandas. For that
  to work, your data should be in a format that is supported by
  [MLEM import](/doc/user-guide/importing). You can learn more about specifying
  these arguments on `mlem apply` page.

Alternatively, you could save the [data with MLEM](/doc/user-guide/data) to use
`mlem apply` on it.

</details>

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

## What's next?

That's it! Thanks for checking out the tool.

Please proceed to [Use Cases](/doc/use-cases) if you want to see high-level
scenarios MLEM can cover, or go to [User Guide](/doc/user-guide) to see more
details or short tutorials on how to use specific features of MLEM.

If you have any questions or suggestions for us, please reach us out in
[Discord](https://discord.com/channels/485586884165107732/903647230655881226) or
create a new [GitHub issue](https://github.com/iterative/mlem/issues) in our
repo 🙌.
