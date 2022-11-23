# Model Prediction

Here we'll go over basic model usage to get you oriented with loading,
predicting and and batch scoring using MLEM.

## Simple Python model prediction

We can use MLEM to load the model and calculate some metrics. Create this
`predict.py` script:

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
