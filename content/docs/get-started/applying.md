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
y_pred = model.predict_proba([[0, 1, 2, 3]])
print(y_pred)
```

Now, let's run the script

```cli
$ python predict.py
[[0.3, 0.3, 0.4]]
```

We see that the prediction was successfully printed in the stdout.

## Batch scoring in CLI

In Batch scoring scenario you often want to apply your model to a dataset from a
command line. Let's see how MLEM can help by creating an example file and
running `mlem apply`:

```cli
$ echo "sepal length (cm),sepal width (cm),petal length (cm),petal width (cm)
0,1,2,3" > new_data.csv

$ mlem apply models/rf new_data.csv -i --it pandas[csv]
⏳️ Importing object from new_data.csv
⏳️ Loading model from models/rf.mlem
🍏 Applying `predict` method...
[[0.3, 0.3, 0.4]]
```

`-i` and `--it pandas[csv]` tells MLEM it's a csv file that should be read with
Pandas. For that to work, your data should be in a format that is supported by
[MLEM import](/doc/user-guide/importing). You can learn more about specifying
these arguments on `mlem apply` page.

Alternatively, you could save the [data with MLEM](/doc/user-guide/data) to use
`mlem apply` on it.
