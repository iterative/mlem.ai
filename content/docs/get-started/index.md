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
$ pip install pandas scikit-learn mlem[fastapi,heroku,docker]
```

We'll use docker later on to package and serve a model locally. To install
docker, please refer to the
[official installation guide](https://docs.docker.com/get-docker/).

That's it, it's that simple! You're ready to MLEM.

</details>

## Saving your model

Before we see how many things MLEM can do for us, we first need to save an ML
model to a file with MLEM.

<details>

### As a basic example, create and execute the following `train.py` Python script:

```py
from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier
import joblib

df, y = load_iris(return_X_y=True, as_frame=True)
clf = RandomForestClassifier(
    n_jobs=2,
    random_state=42,
)
clf.fit(df, y)
joblib.dump(clf, "models/rf")
```

</details>

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

`scikit-learn` is just an example of many supported ML frameworks. Check out the
[full list here](/doc/object-reference/model).

MLEM automatically saved an additional metadata file `models/rf.mlem`. We refer
to this as a "Codification" of the model. This `.mlem` "metafile" contains all
the information we need in order to use the model later.

<details>

### Click to see the description and full contents of the `rf.mlem` metafile.

1. Model methods: Like `predict` and `predict_proba`
2. Input data schema: Describes the dataframe (Iris dataset)
3. Python Requirements: `sklearn` and `pandas` in this case, with the specific
   versions used to train the model

<admon type='tip'>

Note that we didn't have to specify any of this information ourselves. MLEM
inspects the object (even if it's complex) and infers all of this automatically!

</admon>

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

## Getting those sweet predictions

Let's try it out:

<toggle>
<tab title="From code">

Load the model we saved earlier in a simple Python script to predict some
probabilities.

```py
from mlem.api import load

model = load("models/rf")

y_pred = model.predict_proba(df)
```

</tab>

<tab title="Command Line">

### Batch scoring

Assuming `new_data.csv` has the same columns as our model expects:

```cli
$ mlem apply models/rf new_data.csv \
    --method predict_proba \
    --import \
    --import-type "pandas[csv]"

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

## Deploying and Serving models

MLEM can serve a model for you using different server implementations, for
example FastAPI or RabbitMQ. Here we'll check out how it works with FastAPI
since serving models via a REST API is a very common use case.

## Local model serving

To launch a local FastAPI model server, simply run:

<toggle>
<tab title="Command Line">

```cli
$ mlem serve fastapi --model models/rf
```

</tab>
<tab title="From code">

```py
from mlem.api import serve

serve("models/rf", "fastapi")
```

</tab>
</toggle>

The server is now running and listening on `http://0.0.0.0:8080` for HTTP
requests.

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

TODO: tabs with SwaggerUI/cURL/mlem apply remote/using mlem clients

</tab>

MLEM also lets you easily package and deploy your models using a variety of
platforms like [Docker](/doc/user-guide/deploying/docker),
[Heroku](/doc/user-guide/deploying/heroku),
[Sagemaker](/doc/user-guide/deploying/sagemaker) and
[Kubernetes](/doc/user-guide/deploying/kubernetes). See the full list in the
[Deploying User Guide](/doc/user-guide/deploying).

Let's take a look at a few examples:

<toggle>
<tab title="Docker container">

### Running a Dockerized model server

#### Running a Docker container

With one simple command you can build and run a Docker container image with
FastAPI model server:

<toggle>
<tab title="Command Line">

```cli
$ mlem deployment run docker_container app.mlem \
    --model models/rf \
    --image_name mlem-model \
    --server fastapi
```

</tab>

<tab title="From code">

```py
# TODO
```

</tab>

</toggle>
This will create a `mlem-model:latest` Docker image, and also a
[deployment specification](/doc/user-guide/deploying) metafile called
`app.mlem` .

The container is running a FastAPI server, in a similar way to the local serving
scenario above. We can now again open the https://localhost:8080/docs (TODO:
check ports config) in a browser and query the model with `curl` or with
`mlem apply-remote`.

<admon type="info">

You can also just build docker images without running them. For that use
`mlem build`

</admon>

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

```
$ mlem deployment run heroku app.mlem \
  --model models/rf \
  --app_name {your-name}-mlem-get-started-app
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

Please proceed to [Use Cases](/doc/use-cases) if you want to see high-level
scenarios MLEM can cover, or go to [User Guide](/doc/user-guide) to see more
details or short tutorials on how to use specific features of MLEM.

If you have any questions or suggestions for us, please reach us out in
[Discord](https://discord.com/channels/485586884165107732/903647230655881226) or
create a new [GitHub issue](https://github.com/iterative/mlem/issues) in our
repo 🙌.
