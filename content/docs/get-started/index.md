---
description:
  'Learn how to use MLEM to manage and deploy machine learning models easily.'
---

# Get Started with MLEM

<!--
## Get Started with MLEM
-->

<admon type="info">

You will need a Python environment with the following packages: `pandas`,
`scikit-learn`, `mlem[fastapi,heroku]`.

<details>

### ⚙️ Click for setup instructions

Let's create a [`venv`] to cleanly install all the requirements:

```cli
$ mkdir mlem-get-started
$ cd mlem-get-started
$ python3 -m venv .venv
$ source .venv/bin/activate
$ pip install pandas scikit-learn mlem[fastapi,heroku]
```

[`venv`]: https://docs.python.org/3/library/venv.html

</details>

We'll also use [Docker](https://docs.Docker.com/get-docker/) as a way to
[build and serve](#deploying-models-to-production) an ML model locally.

</admon>

## Saving your model

Before we explore everything that MLEM can do, you need to save a machine
learning model with MLEM. As an example, create and execute the following
`train.py` Python script:

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

Here, we loaded a well-known [Iris flower dataset] with scikit-learn and trained
a simple classifier (see the full list of [supported ML frameworks]). We then
capture it using `mlem.api.save`, which creates the following files:

```
models
├── rf
└── rf.mlem
```

Alongside the model binary `models/rf`, MLEM saved metafile `models/rf.mlem`,
which contains all the information needed to use the model later:

1. Model methods: Like `predict` and `predict_proba`
2. Input data schema: Describes the dataframe (Iris dataset)
3. Python Requirements: `sklearn` and `pandas` in this case, with the specific
   versions used to train the model

<admon type="info">

We didn't have to specify any of this information directly: MLEM inspects the
object and infers all of this automatically! We call this process [codification]
of the model.

</admon>

[iris flower dataset]: https://archive.ics.uci.edu/ml/datasets/iris
[supported ml frameworks]: /doc/object-reference/model
[codification]: /doc/user-guide

<details>

### Click to see the full contents of `rf.mlem`.

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

## Model prediction

MLEM provides a consistent and friendly way for you to use models both via
Python API and CLI, for example to generate predictions for any dataset. This
allows you to decouple Ml model training code from testing and deployment
scripts.

<toggle>
<tab title="Python code">

### Load your model

Load the `rf` model we saved earlier in a `predict.py` Python script:

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

You can run it to print the prediction probabilities:

```cli
$ python predict.py
[[0.47 0.24 0.29]]
```

</tab>

<tab title="Command line">

### Model scoring

`mlem` lets you use any saved model natively for prediction or batch scoring
with any dataset. This is very handy if you want to get quick feedback about a
model, for example. Let's create a sample `new_data.csv` dataset and apply it to
our `rf` model:

```csv
sepal length (cm),sepal width (cm),petal length (cm),petal width (cm)
0,1,2,3
```

After creating the CSV file, `mlem apply` it to our model's `predict_proba`
method as shown below to print the prediction probabilities:

```cli
$ mlem apply models/rf new_data.csv \
    --method predict_proba \
    --import --import-type "pandas[csv]"
⏳️ Importing object from new_data.csv
⏳️ Loading model from models/rf.mlem
🍏 Applying `predict_proba` method...
[[0.47 0.24 0.29]]
```

<details>

#### Click to learn more about the command options used.

- The `--method`/`-m` flag tells MLEM to invoke the `predict_proba` method and
  return the class probabilities, instead of the default `predict`.
- The `--import`/`-i` flag tells MLEM to import the data on the fly.
- The `--import-type` / `--it` flag, helps MLEM understand the data format.
  (`pandas[csv]`, a CSV file that should be read with `pandas`). See all the
  data formats [supported for import].

Alternatively, you could save the dataset itself [using MLEM] and `mlem apply`
it.

[supported for import]: /doc/user-guide/importing
[using mlem]: /doc/user-guide/data

</details>

</tab>
</toggle>

## Packaging and deploying models

MLEM really shines when you need to distribute your ML models, either as part of
an application or locally for testing.

### Local model serving

You can `mlem serve` a model using different [server implementations]. Let's use
FastAPI here, since serving models as a REST API is a common need:

```cli
$ mlem serve fastapi --model models/rf
⏳️ Loading model from models/rf.mlem
Starting fastapi server...
🖇️  Adding route for /predict
🖇️  Adding route for /predict_proba
🖇️  Adding route for /predict
🖇️  Adding route for /predict_proba
Checkout openapi docs at <http://0.0.0.0:8080/docs>
...
INFO:     Uvicorn running on http://0.0.0.0:8080 (Press CTRL+C to quit)
```

The server is now running and listening for requests on `localhost:8080`.
Endpoints are created automatically from model methods (using the `sample_data`
[provided earlier](#saving-your-model)). You can open the
[Swagger UI](http://localhost:8080/docs) in your browser to explore the OpenAPI
spec and query examples.

[server implementations]: /doc/user-guide/serving

<admon type="tip">

MLEM can also [generate client-side] code to infer and query the model server

[generate client-side]: /doc/user-guide/serving#making-requests

</admon>

### Deploying models to production

MLEM lets you easily deliver your models for testing, shadowing, or production
with a variety of platforms like [Docker], [Heroku], [Sagemaker] and
[Kubernetes] (see also the [Deploying] guide). Now you don't have to deal with
low-level DevOps yourself. Let's look at a few examples:

[docker]: /doc/user-guide/deploying/docker
[heroku]: /doc/user-guide/deploying/heroku
[sagemaker]: /doc/user-guide/deploying/sagemaker
[kubernetes]: /doc/user-guide/deploying/kubernetes
[deploying]: /doc/user-guide/deploying

<toggle>
<tab title="Docker container">

### Building and running a Dockerized ML model server

Let's first use the `mlem build` command to build a containerized model server.
With this single command, you build a FastAPI server packaged into a Docker
container image:

```cli
$ mlem build docker docker-builder.mlem \
    --model models/rf \
    --image.name mlem-model
⏳️ Loading model from models/rf.mlem
...
✅  Built Docker image mlem-model:latest
```

This creates a `mlem-model:latest` Docker image and a builder metafile called
`docker-builder.mlem` describing the container.

<details>

#### Click to see to see the contents of `docker-builder.mlem`.

```yaml
image:
  name: rf-docker
object_type: builder
server:
  type: fastapi
type: docker
```

Most of the complexity is hidden away in the `server` implementation and
`docker` type, allowing MLEM to do all the heavy lifting for us.

</details>

You can either use the Docker image locally, or push it to a container registry
for publishing and distribution using standard Docker workflows. Let's [`docker
run`] the server on our machine, for example:

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

You can now open the Swagger UI at `https://localhost:8080/docs` in a browser
and [query the model] with `curl`, `mlem apply-remote`, etc.

[`docker run`]: https://docs.docker.com/engine/reference/commandline/run/
[query the model]: /doc/user-guide/serving#making-requests

</tab>

<tab title="Heroku app">

### Deploying an ML model application on Heroku

<admon type="info">

To create applications on Heroku platform, you need a Heroku API key. Set it
with the `HEROKU_API_KEY` env var or use the [`heroku login`] command.

You'll also need to run [`heroku container:login`] to allow MLEM to push Docker
images to Heroku's container registry.

[`heroku login`]:
  https://devcenter.heroku.com/articles/heroku-cli#get-started-with-the-heroku-cli
[`heroku container:login`]:
  https://devcenter.heroku.com/articles/heroku-cli-commands#heroku-container
[heroku api key]: http://heroku.com#

</admon>

After authenticating with Heroku, use `mlem deployment` (change `{myapp}`):

```cli
$ mlem deployment run heroku app.mlem \
  --model models/rf \
  --app_name {myapp}-mlem-get-started-app
⏳️ Loading model from models/rf.mlem
...
  🛠 Building Docker image registry.heroku.com/{myapp}-mlem-get-started-app/web...
  ✅  Built Docker image registry.heroku.com/{myapp}-mlem-get-started-app/web
  🔼 Pushing image registry.heroku.com/{myapp}-mlem-get-started-app/web to registry.heroku.com
  ✅  Pushed image registry.heroku.com/{myapp}-mlem-get-started-app/web to registry.heroku.com
🛠 Releasing app {myapp}-mlem-get-started-app formation
✅  Service {myapp}-mlem-get-started-app is up. You can check it out at https://{myapp}-mlem-get-started-app.herokuapp.com/
```

A Deployment specification (or [declaration](/doc/command-reference/declare))
was written to the `app.mlem` metafile. You can use it to re-deploy the same
Heroku app with a different model.

<details>

#### Click to see the contents of `app.mlem`.

```yaml
app_name: example-mlem-get-started-app
object_type: deployment
type: heroku
```

<admon type="info">

Another special file was created: `app.mlem.state`. It contains metadata about
the deployment, including which MLEM model we used, the URL of the deployment,
and other useful information ([more info]).

[more info]: /doc/user-guide/deploying

</details>

</admon>

Your example application is now live on Heroku! You can check out
[this deployed example](http://example-mlem-get-started-app.herokuapp.com) and
see the same OpenAPI documentation as you would see in local deployments. Learn
more about [making requests]. You can also [destroy the deployment] when needed.

[making requests]: /doc/user-guide/deploying#making-requests
[destroy the deployment]: /doc/user-guide/deploying#managing-deployment

</tab>
</toggle>

**Congratulations!** You've made it through! Thank you for checking out MLEM.

## What's next?

Please go to [Use Cases](/doc/use-cases) if you want to see high-level scenarios
MLEM can cover, or to the [User Guide](/doc/user-guide) to see more details and
examples on MLEM usage.

If you have any questions or suggestions for us, please reach out in
[Discord](https://discord.com/channels/485586884165107732/903647230655881226) or
create a new [GitHub issue](https://github.com/iterative/mlem/issues) in our
repo 🙌.
