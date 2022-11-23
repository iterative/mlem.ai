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

That's it! You're ready to MLEM. It's that simple.

</details>

## Saving your model

Before we see just how many things MLEM can help us simplify and automate, we
first need to save a machine learning model to a file with MLEM.

Let's create and execute the following Python script as a basic example:

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
scikit-learn and train a simple classifier. But instead of pickling the model,
we save it with MLEM (check out the full list of supported
[ML frameworks](/doc/object-reference/model)).

Once you saved the model with MLEM, you can load it to use in a Python runtime,
or generate predictions for a dataset stored on the disk from the command line.

Let's see what we got when we saved the `rf` model with MLEM above.

```cli
$ tree models/
models
├── rf
└── rf.mlem
```

The model binary was saved to `models/rf`, along with some metadata about it in
`models/rf.mlem`. We refer to this as a "Codification" of a model.

The `.mlem` meta file can get a bit verbose, but it contains all the metadata we
need in order to use the model later:

1. Model methods: `predict` and `predict_proba`
2. Input data schema: describes the data frame (Iris dataset)
3. Python Requirements: `sklearn` and `pandas`, with specific versions

<admon type="tip">

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

## Scenarios

To explore the basic functionalities and features MLEM provides, we suggest to
start with these simple scenarios

- **[Model Predictions](/doc/get-started/model-prediction)** - Load the models
  in Python, get predictions and batch scoring.

- **[Deploying and Serving models](/doc/get-started/deploying-and-serving)** -
  Package your model, create a model server for online serving, and deploy it on
  the cloud.

## What's next?

That's it! Thanks for checking out the tool.

Please proceed to [Use Cases](/doc/use-cases) if you want to see high-level
scenarios MLEM can cover, or go to [User Guide](/doc/user-guide) to see more
details or short tutorials on how to use specific features of MLEM.

If you have any questions or suggestions for us, please reach us out in
[Discord](https://discord.com/channels/485586884165107732/903647230655881226) or
create a new [GitHub issue](https://github.com/iterative/mlem/issues) in our
repo 🙌.
