---
description: 'Learn how you can use MLEM to easily manage and deploy models'
---

# Get Started

For this guide, we will need a Python environment with the following python
packages installed: `pandas`, `scikit-learn`, `mlem[fastapi,heroku]`.
Additionally, we'll require `docker` to be installed on your local machine to
showcase building and deploying a containerized model server.

<details>

### ⚙️ Expand for detailed setup instructions

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

Before we see how many things MLEM can do for us, we first need to save an ML
model to a file with MLEM.

As a basic example, create and execute the following `train.py` Python script:

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
`scikit-learn` and trained a simple classifier. Instead of pickling the model,
we persisted it using MLEM's `save` API.

`scikit-learn` is just an example of many supported ML frameworks. Check out the
[full list here](/doc/object-reference/model).

Now, let's see what MLEM saved by using the `tree` terminal command:

```cli
$ tree models/
models
├── rf
└── rf.mlem
```

Alongside the model binary `models/rf`, MLEM saved an additional metadata file
`models/rf.mlem`. We refer to this as a "Codification" of the model. This
`.mlem` "metafile" contains all the information we need in order to use the
model later:

1. Model methods: Like `predict` and `predict_proba`
2. Input data schema: Describes the dataframe (Iris dataset)
3. Python Requirements: `sklearn` and `pandas` in this case, with the specific
   versions used to train the model

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
can serialize/deserialize model objects to/from files. However, MLEM adds some
"special sauce" by inspecting the objects and serializing their metadata into
`.mlem` files and intelligently using this later on. This metadata is necessary
to reliably enable actions like packaging and serving of different models types
down in various ways. MLEM allows us to automate a lot of the pain points we
would hit later on in our ML workflow by codifying and managing this metadata
about our models (or other objects) for us.

</details>

## Model Prediction

Once we saved the model with MLEM we can load it to either use in our Python
code or from the command line to generate predictions for any dataset. This
allows us to easily decouple model training code from testing and deployment
code.

Let's try it out:

<toggle>
<tab title="Python Script">

### Python code usage

Load the model we saved earlier in a simple Python script to predict some
probabilities.

Create this `predict.py` script:

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

We see that the prediction probabilities were successfully printed to stdout.

</tab>

<tab title="Command Line">

### Batch scoring

The MLEM CLI allows us to natively use any saved model directly for prediction
or batch scoring with any local dataset. This is very handy if we want to get
some quick feedback about a model we just created.

First, create an example dataset file to apply, we'll go with a `csv` format:

```cli
$ echo "sepal length (cm),sepal width (cm),petal length (cm),petal width (cm)
0,1,2,3" > new_data.csv
```

Next, simply run `mlem apply` to apply this dataset against our model's
`predict_proba` method:

```cli
$ mlem apply models/rf new_data.csv \
    --method predict_proba \
    --import \
    --import-type "pandas[csv]"
⏳️ Importing object from new_data.csv
⏳️ Loading model from models/rf.mlem
🍏 Applying `predict_proba` method...
[[0.47 0.24 0.29]]
```

And we get our expected prediction probabilities as output.

<details>

#### Learn more about the CLI options used

- The `--method`/`-m` flag tells MLEM to invoke the `predict_proba` method and
  return the class probabilities, instead of the default `predict`.
- The `--import`/`-i` flag tells MLEM to import the data on the fly.
- The `--import-type` / `--it` flag, helps MLEM understand the data format.
  Here, it's `pandas[csv]` - a csv file that should be read with Pandas. For
  that to work, your data should be in a format that is supported by
  [MLEM import](/doc/user-guide/importing). You can learn more about specifying
  these arguments on `mlem apply` page.

Alternatively, you could save the dataset itself
[using MLEM](/doc/user-guide/data) to use `mlem apply` on it.

</details>

</tab>
</toggle>

We saw that MLEM provides a consistent and friendly way for you to work with
models both via API and CLI. However, MLEM **really** shines when you need to
package and deploy your models, either as part of an application or locally for
testing.

## Deploying and Serving models

MLEM can serve a model for you using different server implementations, for
example FastAPI or RabbitMQ. Here we'll check out how it works with FastAPI
since serving models via a REST API is a very common use case.

## Local model serving

First thing first, let's run a model server locally on our machine. To launch a
local FastAPI model server, simply run:

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

<admon type="tip">

Servers automatically create endpoints from model methods using the
`sample_data` argument provided to [`mlem.api.save`](/doc/api-reference/save).

</admon>

#### Making requests

While the model server is running, you can use your browser to open the Swagger
UI (OpenAPI) at [http://localhost:8080/docs](http://localhost:8080/docs) and
check out OpenAPI spec and query examples.

<admon type="info">

MLEM can also generate client-side code to query/infer the model server. Learn
more about this in
[Serving User Guide](/doc/user-guide/serving#making-requests).

</admon>

## Deploying models to production

Now, let's take model serving a step further and use production worthy
deployment technologies. MLEM lets you easily package and deploy your models
using a variety of platforms like [Docker](/doc/user-guide/deploying/docker),
[Heroku](/doc/user-guide/deploying/heroku),
[Sagemaker](/doc/user-guide/deploying/sagemaker) and
[Kubernetes](/doc/user-guide/deploying/kubernetes), so you don't have to deal
with the DevOps and deployment details yourself. See the full list in the
[Deploying User Guide](/doc/user-guide/deploying).

Let's take a look at a few examples:

<toggle>
<tab title="Docker container">

### Running a Dockerized model server

#### Building a Docker container

First, we use a simple `mlem build` command to build a container image. With
this one simple command you build a FastAPI model server and package it into a
Docker container image:

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

This will create a `mlem-model:latest` Docker image, and also a
[builder specification](/doc/user-guide/building) metafile called
`docker-builder.mlem` .

<details>

#### Click to see to see the builder metafile contents

Let's take a look at the created metafile describing the docker container image:

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

Now that we have a docker image for our model server, we can either use it
locally, or push it to any container registry for publishing and distribution
using standard `docker` commands and workflows. To keep this guide short and
local, we'll use `docker` to run the containerized server on our machine:

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

As we can see, the container is running a FastAPI server, in a similar way to
the local serving scenario above. We can now again open the
https://localhost:8080/docs in a browser and query the model with `curl` or with
`mlem apply-remote`.

</tab>

<tab title="Heroku">

### Deploying a Heroku app

To create applications on Heroku platform you need a Heroku API key.

You can either set the `HEROKU_API_KEY` environment variable or use
[Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) and run
`heroku login`.

<details>

#### ⚙️ How to obtain Heroku API key

- Go to [heroku.com](http://heroku.com)
- Sign up or login with an existing account
- Go to account settings by clicking your profile picture on the main page
- Find the API Key section, and reveal an existing key or re-generate it

</details>

To allow MLEM to push the Docker image built to the Heroku Docker Registry,
you'll also need to execute `heroku container:login`.

After getting authorized with Heroku, we can run the deployment command:

```cli
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
Heroku application with a different model.

<details>

#### See app.mlem contents

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

#### Making requests

Your example application is now live on Heroku! You can browse to
[this deployed example](http://example-mlem-get-started-app.herokuapp.com) and
see the same OpenAPI documentation as you would see in your local or docker
deployments. To learn how to easily send requests to your model with MLEM, refer
to the [Deployment User Guide](/doc/user-guide/deploying).

If you would like to destroy the deployment now, you can find the instructions
[here](/doc/user-guide/deploying#managing-deployment).

</tab>
</toggle>

Congratulations! You've made it through and got a model server deployed!! Thank
you for checking out MLEM!

## What's next?

Please go to [Use Cases](/doc/use-cases) if you want to see high-level scenarios
MLEM can cover, or to the [User Guide](/doc/user-guide) to see more details and
examples on how to use specific features of MLEM.

If you have any questions or suggestions for us, please reach out in
[Discord](https://discord.com/channels/485586884165107732/903647230655881226) or
create a new [GitHub issue](https://github.com/iterative/mlem/issues) in our
repo 🙌.
