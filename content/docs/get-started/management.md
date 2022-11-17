# Basic Model Management

Here we'll go over basic model management operations to get you oriented with
saving, loading and inferencing using MLEM.

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

Here, we load a well-known
[Iris flower dataset](https://archive.ics.uci.edu/ml/datasets/iris) with
scikit-learn and train a simple classifier. But instead of pickling the model,
we save it with MLEM (check out the full list of supported
[ML frameworks](/doc/object-reference/model)).

Once you saved the model with MLEM, you can load it to use in a Python runtime,
or generate predictions for a dataset stored on the disk from the command line.

## Loading a model

Now, we can use MLEM to load the model and calculate some metrics:

```py
# predict.py
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

Now, let's run the script

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

## Model Codification

### Why do it the MLEM way

Saving models to files or loading them back into python objects may seem like a
deceptively simple task at first. For example, `pickle` and `torch` libraries
can serialize/deserialize model objects to/from files, but we will see that MLEM
adds some "special sauce" in the form of metadata files that will help us a lot
down the line in the heavier operations like packaging and serving of the models
in various ways. MLEM allows us to automate a lot of the pain points we would
hit later on in our ML workflow by codifying metadata about your models (and
other objects) and intelligently using it later on.

### MLEM Model Metafiles

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
