# Using models

Once you saved the model with MLEM, you can load it to use in Python runtime, or
ask to generate predictions for a dataset stored on the disk from the command
line.

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

## Generating predictions for a dataset from the command line

You can also apply your models directly from CLI. For that to work, your data
should be in a file that is supported by
[MLEM import](/doc/user-guide/importing) or you should have the
[data saved with MLEM ](/doc/user-guide/datasets).

Let's create an example file and run `mlem apply`

```cli
$ echo "sepal length (cm),sepal width (cm),petal length (cm),petal width (cm)
0,1,2,3" > new_data.csv
$ mlem apply rf new_data.csv -i --it pandas[csv]
⏳️ Importing object from new_data.csv
⏳️ Loading model from .mlem/model/rf.mlem
🍏 Applying `predict` method...
[[0.3, 0.3, 0.4]]
```
