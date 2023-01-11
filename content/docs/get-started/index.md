---
description: 'Learn how you can use MLEM to easily manage and deploy models'
---

# Get Started

For this guide, we will need a Python environment with the following python
packages installed: `pandas`, `scikit-learn` and `mlem[fastapi]`. Additionally,
we'll require `docker` to be installed on your machine to showcase building and
deploying a containerized model servers.

<details>

### ⚙️ Expand for detailed setup instructions

Let's create a separate folder and an isolated virtual environment to cleanly
install all the requirements we need:

```cli
$ mkdir mlem-get-started
$ cd mlem-get-started
$ python3 -m venv .venv
$ source .venv/bin/activate
$ pip install pandas scikit-learn mlem[fastapi]
```

- We'll use docker later on to package and serve a model locally. To install
  docker, please refer to the
  [official installation guide](https://docs.docker.com/get-docker/).
- In the [last section](#deploying-models-in-production) of the guide, we will
  mention additional pip packages which will be needed per our deployment type
  (e.g. `mlem[kubernetes]` to deploy on a Kubernetes cluster).

That's it, it's that simple! You're ready to MLEM.

</details>

## Saving models

To unlock MLEM's power, we need to capture model metadata that is not usually
captured when models are saved.

Let's say we want to save a model to the path `models/rf`. This is usually done
with a framework helpers like `torch.save()`, or better yet, libraries like
`pickle` or `joblib`.

<details>

### Here's a typical example of training code

Consider the following `train.py`:

```py
from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier
import joblib

# load data
data, y = load_iris(return_X_y=True, as_frame=True)

# instantiate and train model
rf = RandomForestClassifier(
    n_jobs=2,
    random_state=42,
)
rf.fit(data, y)

# save to file
joblib.dump(rf, "models/rf")
```

Here We loaded a well-known
[Iris flower dataset](https://archive.ics.uci.edu/ml/datasets/iris) with
`scikit-learn` and trained a simple classifier. Note that `scikit-learn` is just
an example of many MLEM supported ML frameworks (
[full list here](/doc/object-reference/model)). Finally, we used `joblib` to
serialize it to file, so executing the script will dump the model to
`./models/rf`.

</details>

MLEM can analyze the code (or model files), and extract extra metadata which
will become very useful when using the model.

We can either save the model with MLEM to begin with, or use MLEM to import
existing model file and save the metadata as a side effect.

<toggle>
<tab title="Save new models">

Just replace the line saving the model with a call to `mlem.api.save`:

```py
from mlem.api import save
...

# instead of joblib.dump(rf, "models/rf")
save(rf, "models/rf", sample_data=df)
```

The `sample_data` argument will prove useful later when serving the model. MLEM
uses it to infer the data schema of the payload automatically!

</tab>

<tab title="Import existing models">

You can use `mlem.api.import_object()` to "import" the object from Python code,
which would create the the `rf.mlem` metadata file:

```py
from mlem.api import import_object

model = import_object(path="models/rf", target="models/rf.mlem", type_="pickle")
```

or just use `mlem import` from your terminal for the same effect:

```cli
$ mlem import models/rf models/rf.mlem --type pickle
```

Learn more about importing models in the [importing](/doc/user-guide/importing)
guide.

</tab>

</toggle>

Alongside the model binary `models/rf`, MLEM added the metadata file
`models/rf.mlem`. We refer to this as a
["Codification" of the model](/doc/user-guide/basic-concepts#model-codification).

```cli
$ tree models/
models
├── rf
└── rf.mlem
```

Actually, this is all also true for other types of objects, like
[datasets](/doc/user-guide/data)!

## Getting Model Predictions

Using your model is now natural. You can either load and natively call the model
object in your Python code anywhere, or use MLEM CLI for batch scoring against
any dataset. Let's try our model out:

<toggle>
<tab title="Python Code">

Let's load the model we saved earlier using `mlem.api.load()` and predict some
probabilities.

Try creating and running this simple `predict.py` script:

```py
from mlem.api import load

model = load("models/rf")  # RandomForestClassifier
features = [
    "sepal length (cm)",
    "sepal width (cm)",
    "petal length (cm)",
    "petal width (cm)",
]
df = pd.DataFrame([[0, 1, 2, 3]], columns=features)
y_pred = model.predict_proba(df)

print(y_pred)
```

The loaded object is fully functioning, and as expected, we get:

```cli
$ python predict.py
[[0.47 0.24 0.29]]
```

</tab>

<tab title="Command Line">

Use MLEM CLI to apply any local dataset against any model for prediction or
batch scoring.

Let's create an example dataset file, we'll go with a `csv` format:

```cli
$ cat <<EOF > new_data.csv
sepal length (cm),sepal width (cm),petal length (cm),petal width (cm)
0,1,2,3
4,5,6,7
EOF
```

Next, simply run `mlem apply` to apply this dataset against our model's
`predict_proba` method:

```cli
$ mlem apply models/rf new_data.csv \
    --method predict_proba \
    --import \
    --import-type "pandas[csv]"
```

And we get our expected probabilities as output:

```cli
⏳️ Importing object from new_data.csv
⏳️ Loading model from models/rf.mlem
🍏 Applying `predict_proba` method...
[[0.47, 0.24, 0.29], [0.03, 0.1, 0.87]]
```

<admon type="info">

This is very handy to get quick feedback about a model without writing any code.

</admon>

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

Ok, we saw how easy working with models is, both via API and CLI. However, MLEM
**really shines** when you need to package and deploy your models! (⌐■_■)

## Serving models locally

MLEM can serve any model for you using different server implementations like
[FastAPI](/doc/user-guide-serving/fastapi),
[RabbitMQ](/doc/user-guide/serving/rabbitmnq) or
[Streamlit](/doc/user-guide/serving/streamlit). Let's check out how it works
with FastAPI since using it for serving is very common.

To launch a FastAPI model server locally, simply run:

```cli
$ mlem serve fastapi --model models/rf
```

🤩 The server is now running, **serving your model**, and listening on
`http://0.0.0.0:8080` for HTTP requests.

### Making requests

While the model server is running, you can use your browser to open the Swagger
UI at [http://localhost:8080/docs](http://localhost:8080/docs) and check out
OpenAPI spec and query examples.

<admon type="info">

MLEM can also generate a client code object to query/infer the model server.

</admon>

Check out the [serving guide](/doc/user-guide/serving) to learn more.

## Deploying models in production

💪 Now, let's take model serving a step further.

MLEM lets you easily package and deploy your models to a variety of platforms
like [Docker](/doc/user-guide/deploying/docker),
[Heroku](/doc/user-guide/deploying/heroku),
[Sagemaker](/doc/user-guide/deploying/sagemaker) and
[Kubernetes](/doc/user-guide/deploying/kubernetes). This way, you don't have to
deal with the DevOps and implementation details of the servers and deployments.

<admon type="warn">

**Security Notice:** Be careful when exposing resources / servers on a public
network. For any production use case make sure you have proper authentication
and authorization layers set up (not covered in this guide). The examples below
assume no sensitive code, data or infra are involved for the sake of simplicity.

</admon>

Let's take a look at a few examples:

<toggle>
<tab title="Docker container">

### Python requirements

```py
pip install mlem[docker]
```

### Deploying a Docker container

With one simple command, you can package your model+server into a Docker image,
and run it in a container:

```cli
$ mlem deployment run docker_container docker_app.mlem \
    --model models/rf \
    --image_name mlem-rf-server \
    --server fastapi
```

The container is now running your model server, and you can open
https://localhost:8080/docs in a browser, or query the model with `curl` /
`mlem apply-remote`.

The above command will create a `mlem-rf-server:latest` Docker image, which can
now be pushed to any container registry for publishing and distribution.

<admon type="tip">

You can run `mlem build` if you only want to build the Docker image. Check out
the [docker deployment](/doc/user-guide/deploying/docker) guide for more
details.

</admon>

### Removing the deployment

To remove the deployment, simply run:

```cli
mlem deployment remove docker_app.mlem
```

</tab>

<tab title="Heroku">

### Python requirements

```py
pip install mlem[heroku]
```

### Deploying a Heroku app

To create applications on the Heroku platform you need a Heroku API key.

<details>

#### ⚙️ working with the Heroku API key

To obtain a Heruko API key:

- Go to [heroku.com](http://heroku.com)
- Sign up or login with an existing account
- Go to account settings by clicking your profile picture on the main page
- Find the API Key section, and reveal an existing key or re-generate it

After obtaining the key, you can either set the `HEROKU_API_KEY` environment
variable or use [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
and run `heroku login`.

</details>

To allow MLEM to push the Docker image built to the Heroku Docker Registry,
you'll also need to execute `heroku container:login`.

After getting authorized with Heroku, we can run the deployment command:

```
$ mlem deployment run heroku heroku_app.mlem \
  --model models/rf \
  --app_name {your-name}-mlem-get-started-app
```

#### Making requests

Your application is now live on Heroku! You can browse to
[this deployed example](http://example-mlem-get-started-app.herokuapp.com) and
see the same OpenAPI docs UI as you would see in your local or docker
deployments. To learn how to easily send requests to your model with MLEM, refer
to the [deployment](/doc/user-guide/deploying) guide.

### Removing the deployment

To remove the deployment, simply run:

```cli
mlem deployment remove heroku_app.mlem
```

</tab>

<tab title="Kubernetes">

### Python requirements

```py
pip install mlem[kubernetes]
```

### Deploying on a Kubernetes cluster

If you have a K8s cluster available and properly configured (see
[prerequisites](/doc/user-guide/deploying/kubernetes#prerequisites)), MLEM will
deploy your model to the cluster with a single command. This includes the
following key steps:

- building a Docker image
- pushing it to the configured docker registry (this example uses
  [dockerhub](https://hub.docker.com/))
- creating the appropriate K8s resources to spin up your server on the cluster
  using the pushed image

Before running the MLEM command to deploy, we'll first have to `docker login` to
the container registry to allow pushing the image there:

```cli
$ docker login docker.io/{username}
Username: ******
Password: ******
Login Succeeded
```

Great, we're ready to deploy the app:

```
$ mlem deployment run kubernetes k8s_app.mlem \
  --model models/rf \
  --registry remote \
  --registry.host=docker.io/{username} \
  --image_name mlem-rf-server \
  --namespace mlem
```

That's it! We're already up and running, check it out:

```cli
$ kubectl -n mlem get all
NAME                                  READY   STATUS    RESTARTS   AGE
pod/mlem-rf-server-6c9945bcdf-rh9fc   1/1     Running   0          71s

NAME                     TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
service/mlem-rf-server   NodePort   10.104.251.44   <none>        8080:32701/TCP   71s

NAME                             READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/mlem-rf-server   1/1     1            1           71s

NAME                                        DESIRED   CURRENT   READY   AGE
replicaset.apps/mlem-rf-server-6c9945bcdf   1         1         1       71s
```

To expose your model server for external requests, MLEM creates a `NodePort`
service by default. You can use other service types using the `--service_type`
option.

If you're running a local K8s cluster (e.g. Docker Desktop) for example, you'd
be able to access the cluster network from your localhost interface, and your
app would be available on http://localhost:31103, as seen in the
`service/mlem-rf-server` resource above.

### Removing the deployment

To remove the deployment, simply run:

```cli
mlem deployment remove k8s_app.mlem
```

</tab>

</toggle>

For any of the deployments above, `mlem deployment run` will create 2 auxiliary
files:

- `{deployment}.mlem` - A deployment spec (or
  [declaration](/doc/command-reference/declare)). Reusing this app declaration
  you can, for example, re-deploy the same application with a different model.

- `{deployment}.mlem.state` - A state file containing more information about the
  deployment, including which MLEM model we used, and the URL of the deployment.
  You can learn more about state files in the
  [deploying](/doc/user-guide/deploying) guide.

🙌 Congratulations! You've made it through and got a model server deployed!!
Thank you for checking out MLEM!

## What's next?

Please go to [Use Cases](/doc/use-cases) if you want to see high-level scenarios
MLEM can cover, or to the [User Guide](/doc/user-guide) to see more details and
examples on how to use specific features of MLEM.

If you have any questions or suggestions for us, please reach out in
[Discord](https://discord.com/channels/485586884165107732/903647230655881226) or
create a new [GitHub issue](https://github.com/iterative/mlem/issues) in our
repo.
