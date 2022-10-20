---
description: 'Learn how you can use MLEM to easily manage and deploy models'
---

# Get Started

We assume MLEM is already [installed](/doc/install) in your active Python
environment, as well as `pandas` and `sklearn`. If not, you can follow the
instructions below:

<details>

### ⚙️ Expand for setup instructions

Let's create a separate folder and an isolated virtual environment to cleanly
install all the requirements (including MLEM) there:

```cli
$ mkdir mlem-get-started
$ cd mlem-get-started
$ python3 -m venv .venv
$ source .venv/bin/activate
$ pip install pandas scikit-learn mlem[fastapi,heroku]
```

</details>

## Saving your ML model

To enable all kinds of productionization scenarios MLEM supports, we first need
to save a ML model with MLEM.

Let's take a look and run the following Python script:

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

## Productionization

Ok, you just saved your model with MLEM. Now MLEM can do the heavy machinery for
you, enabling all these scenarios in a couple lines of code:

- **[Apply model](/doc/get-started/applying)** - load model in Python or get
  prediction in command line.
- **[Serve model](/doc/get-started/serving)** - create a service from your model
  for online serving.
- **[Build model](/doc/get-started/building)** - export model into Python
  packages, Docker images, etc.
- **[Deploy model](/doc/get-started/deploying)** - deploy your model to Heroku,
  Sagemaker, Kubernetes, etc.

More examples on how to use MLEM in different scenarios can be found in
[Use Cases](/doc/use-cases) section.

## Codification

Meanwhile, let's see what we got when we saved a model with MLEM (check out the
[full list of ML frameworks](/doc/user-guide/model) that MLEM supports).

```cli
$ tree models/
models
├── rf
└── rf.mlem
```

The model was saved along with some metadata about it: `rf` is the model binary
and `rf.mlem` is a metafile containing information about the model. We refer to
this as to "Codification". Let's take a look at the metafile:

<details>

### `$ cat models/rf.mlem`

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
    sklearn_predict:
      args:
        - name: X
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
    sklearn_predict_proba:
      args:
        - name: X
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

It's a bit long, but we can see all that we need to use the model later:

1. Model methods: `predict` and `predict_proba`
2. Input data schema that describes the DataFrame with the iris dataset
3. Requirements: `sklearn`, `pandas` with particular versions we need to run
   this model.

Note that we didn't specify requirements: MLEM investigates the object you're
saving (even if it's a complex one) and finds out all requirements needed!
