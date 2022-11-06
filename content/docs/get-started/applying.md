# Using models

Once you saved the model with MLEM, you can load it to use in Python runtime, or
ask to generate predictions for a dataset stored on the disk from the command
line, like in a batch scoring.

## Loading model in Python

Now, we can use MLEM to load the model and calculate some metrics:

```py
# predict.py
from mlem.api import load

model = load("models/rf")
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

We see that the prediction was successfully printed in the stdout.

## Batch scoring in CLI

In Batch scoring scenario you often want to apply your model to a dataset from a
command line. Let's see how MLEM can help by creating an example file and
running `mlem apply`:

```cli
$ echo "sepal length (cm),sepal width (cm),petal length (cm),petal width (cm)
0,1,2,3" > new_data.csv

$ mlem apply models/rf new_data.csv  --m predict_proba -i --it "pandas[csv]"
⏳️ Importing object from new_data.csv
⏳️ Loading model from models/rf.mlem
🍏 Applying `predict` method...
[[0.47 0.24 0.29]]
```

- The `--import`/`-i` flag tells MLEM to import the data on the fly.
- The `--import-type` / `--it` flag, helps MLEM understand the data format.
  Here, it's `pandas[csv]` a csv file that should be read with Pandas. For that
  to work, your data should be in a format that is supported by
  [MLEM import](/doc/user-guide/importing). You can learn more about specifying
  these arguments on `mlem apply` page.

- The `--method`/`-m` flag tells MLEM to invoke the `predict_proba` method and
  return the class probabilities, instead of the default `predict`.

Alternatively, you could save the [data with MLEM](/doc/user-guide/data) to use
`mlem apply` on it.
