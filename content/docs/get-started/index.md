---
description: 'Learn how you can use MLEM to easily manage and deploy models'
---

# Get Started

We assume MLEM is already [installed](/doc/install) in your active Python
environment, as well as `pandas` and `sklearn` (if not, you can follow the
instructions below).

<details>

### ⚙️ Expand for setup instructions

Let's create a separate folder and an isolated virtual environment to cleanly
install all the requirements (including MLEM):

```cli
$ mkdir mlem-get-started
$ cd mlem-get-started
$ python3 -m venv .venv
$ source .venv/bin/activate
$ pip install pandas scikit-learn mlem[fastapi,heroku]
```

</details>

## Saving your ML model

To enable all kinds of productionization scenarios supported by MLEM, we first
need to save a machine learning model with MLEM.

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

Here, we load a well-known
[Iris flower dataset](https://archive.ics.uci.edu/ml/datasets/iris) with
scikit-learn and train a simple classifier. But instead of pickling the model,
we save it with MLEM (check out the full list of supported
[ML frameworks](/doc/object-reference/model)).

## Productionization

Now MLEM can do the heavy machinery for us, enabling all these scenarios in a
couple lines of code:

- **[Apply model](/doc/get-started/applying)** - load model in Python or get
  prediction in command line.
- **[Serve model](/doc/get-started/serving)** - create a service from your model
  for online serving.
- **[Build model](/doc/get-started/building)** - export model into Python
  packages, Docker images, etc.
- **[Deploy model](/doc/get-started/deploying)** - deploy your model to Heroku,
  Sagemaker, Kubernetes, etc.

## Codification

Let's see what we got when we saved a model with MLEM.

```cli
$ tree models/
models
├── rf
└── rf.mlem
```

The model binary was saved to `models/rf`, along with some metadata about it in
`models/rf.mlem`. We refer to this as to "Codification".

The `.mlem` file is a bit long, but it contains all the metadata we need to use
the model later:

1. Model methods: `predict` and `predict_proba`
2. Input data schema: describes the data frame (Iris dataset)
3. Requirements: `sklearn` and `pandas`, with specific versions

Note that we didn't specify any of this information. MLEM investigates the
object (even if it's complex) and finds out all of this!

<details>

### Click to see the contents of the `rf.mlem` metafile.

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
