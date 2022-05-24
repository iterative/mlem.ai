# Applying models

## Evaluating the model

Now, we can use MLEM to apply the model against a dataset and calculate some
metrics:

```python
# evaluate.py
import json

from sklearn import metrics
from sklearn.datasets import load_iris

from mlem.api import apply


def main():
    data, y_true = load_iris(return_X_y=True, as_frame=True)
    y_pred = apply("rf", data, method="predict_proba")
    roc_auc = metrics.roc_auc_score(y_true, y_pred, multi_class="ovr")

    with open("metrics.json", "w") as fd:
        json.dump({"roc_auc": roc_auc}, fd, indent=4)



if __name__ == "__main__":
    main()

```

Here we use the `apply` function that handles loading of the model for us. But
you can always load your model with [`mlem.api.load`](/doc/api-reference/load)
and call any method manually.

Now, let's run the script

```bash
$ python evaluate.py
$ cat metrics.json
{
    "roc_auc": 1.0
}
```

<details>

### ⛳ [Evaluation](https://github.com/iterative/example-mlem-get-started/tree/4-eval)

```bash
$ git add metrics.json
$ git commit -m "Evaluate model"
$ git diff 4-eval
```

</details>

## Applying from CLI

You can also apply your models directly from CLI. For that to work, your data
should be in a file that is supported by
[MLEM import](/doc/user-guide/importing) or you should have your
[dataset saved with MLEM ](/doc/user-guide/datasets).

Let's create an example file and run `mlem apply`

```bash
$ echo "sepal length (cm),sepal width (cm),petal length (cm),petal width (cm)
0,1,2,3" > new_data.csv
$ mlem apply rf new_data.csv -i --it pandas[csv] -o prediction
⏳️ Importing object from new_data.csv
⏳️ Loading model from .mlem/model/rf.mlem
🍏 Applying `predict` method...
💾 Saving dataset to .mlem/dataset/prediction.mlem
```

Or, if you save your dataset like this:

```python
from sklearn.datasets import load_iris
from mlem.api import save


def main():
    data, _ = load_iris(return_X_y=True, as_frame=True)
    save(data, "iris.csv")


if __name__ == '__main__':
    main()
```

You can just reference it by name:

```bash
$ mlem apply rf iris.csv -o prediction
⏳️ Loading dataset from .mlem/dataset/iris.csv.mlem
⏳️ Loading model from .mlem/model/rf.mlem
🍏 Applying `predict` method...
💾 Saving dataset to .mlem/dataset/prediction.mlem

```
