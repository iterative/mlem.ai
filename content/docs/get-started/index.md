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

Let's take a look at the following Python script:

```py
# train.py
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

Here we load well-known iris dataset with sklearn and train a simple classifier.
But instead of pickling the model we saved it with MLEM. (Check out the
[full list of ML frameworks](/doc/object-reference/model) that MLEM supports.)

Now let's run this script and see how we save the model.

```cli
$ python train.py
...

$ tree models/
models
├── rf
└── rf.mlem
```

The model was saved along with some metadata about it: `rf` containing the model
binary and `rf.mlem` metafile containing information about it. Let's take a look
at it:

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

## Productionization

Saving models is fun, but the real value of a model is how you can use it. To
make it easier to get models to production, MLEM has 4 related functionalities:
applying, serving, building and deploying.

- **[Applying models](/doc/get-started/applying)** explains how to load model in
  Python or get prediction in command line.
- **[Serving models](/doc/get-started/serving)** shows how to create a service
  from your model.
- **[Exporting models (building)](/doc/get-started/building)** describes how
  models can be built into Python packages, Docker images, etc.
- **[Deploying models](/doc/get-started/deploying)** shows how you can deploy
  your model with MLEM.

More examples on how to use MLEM in different scenarios can be found in
[Use Cases](/doc/use-cases) section.
