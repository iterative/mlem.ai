# Saving and loading models and datasets

<details>

### 🧳 Requirements

`pip install mlem scikit-learn pandas`

</details>

After initializing MLEM we have an empty repository (except for the config
file), but soon we'll save something with MLEM to fill it up.

The first step is to get some data. For this tutorial, we’ll just generate it.
Let's take a look at this python script:

```python
# prepare.py
from mlem.api import save
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

def main():
    data, y = load_iris(return_X_y=True, as_frame=True)
    data["target"] = y
    train_data, test_data = train_test_split(data, random_state=42)
    save(train_data, "train.csv")
    save(test_data.drop("target", axis=1), "test_x.csv")
    save(test_data[["target"]], "test_y.csv")

if __name__ == "__main__":
    main()
```

Here we load the well-known iris dataset with sklearn, and then save parts of it
with MLEM. For now, we just save them locally and push them to Git later.

By default, MLEM saves your files to `.mlem/` directory, but that could be
changed, see [project structure](https://todo) for reference.

Let's execute this script and see what was produced:

```bash
$ python prepare.py
$ tree .mlem/dataset/
.mlem/dataset/
├── test_x.csv
├── test_x.csv.mlem
├── test_y.csv
├── test_y.csv.mlem
├── train.csv
└── train.csv.mlem
```

What we see here is that every DataFrame was saved along with some metadata
about it. Let's see one example:

```bash
$ head -5 .mlem/dataset/train.csv
,sepal length (cm),sepal width (cm),petal length (cm),petal width (cm),target
4,5.0,3.6,1.4,0.2,0
32,5.2,4.1,1.5,0.1,0
142,5.8,2.7,5.1,1.9,2
85,6.0,3.4,4.5,1.6,1
```

<details>

### `$ cat .mlem/dataset/train.csv.mlem`

```yaml
artifacts:
  data:
    hash: add43029d2b464d0884a7d3105ef0652
    size: 2459
    uri: train.csv
object_type: dataset
reader:
  dataset_type:
    columns:
      - ''
      - sepal length (cm)
      - sepal width (cm)
      - petal length (cm)
      - petal width (cm)
      - target
    dtypes:
      - int64
      - float64
      - float64
      - float64
      - float64
      - int64
    index_cols:
      - ''
    type: dataframe
  format: csv
  type: pandas
requirements:
  - module: pandas
    version: 1.4.2
```

</details>

We can see here what was saved: dataset schema and requirements on the libraries
which were used to save the dataset. That doesn't mean you can't read that
`train` any other way, but if you would use MLEM to load it, it would know that
it needs pandas to do that for you.

⛳
[Data prepared](https://github.com/iterative/example-mlem-get-started/tree/2-prepare)

The next step is even more interesting, as we are getting closer to saving
actual ML models. Let's see the next python script we have:

```python
# train.py
from mlem.api import load, save
from sklearn.ensemble import RandomForestClassifier

def main():
    df = load("train.csv")
    data = df.drop("target", axis=1)
    rf = RandomForestClassifier(
        n_jobs=2,
        random_state=42,
    )
    rf.fit(data, df.target)

    save(
        rf,
        "rf",
        tmp_sample_data=data,
        tags=["random-forest", "classifier"],
        description="Random Forest Classifier",
    )

if __name__ == "__main__":
    main()
```

Here we load the previously saved dataset with `load(input)`, where
`input = "train.csv"`. The dataset is loaded as `pandas.DataFrame` it was before
saving.

Also, note that we didn't specify earlier whether the saved dataset was
`pandas.DataFrame`, `numpy.array` or `tensorflow.Tensor`. MLEM is getting that
for you. And though this is not very hard to guess, this handy magic extends to
ML models. You don't specify whether the model you save is a classifier from
Sklearn, a NN build in PyTorch, or even just a python function. MLEM will figure
this out on its own 👋

Now let's run this script and see how we save the model.

```bash
$ python train.py
$ tree .mlem/model/
.mlem/model
├── rf
└── rf.mlem
```

Again, we see familiar files: `rf` containing the model binary and `.mlem` file
containing metadata. Let's take a look at it:

<details>

### `$ cat .mlem/model/rf.mlem`

```yaml
artifacts:
  data:
    hash: 59440b4398b8d45d8ad64d8d407cfdf9
    size: 993
    uri: logreg
model_type:
  methods:
    predict:
      args:
        - name: data
          type_:
            columns:
              - ''
              - sepal length (cm)
              - sepal width (cm)
              - petal length (cm)
              - petal width (cm)
            dtypes:
              - int64
              - float64
              - float64
              - float64
              - float64
            index_cols:
              - ''
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
              - ''
              - sepal length (cm)
              - sepal width (cm)
              - petal length (cm)
              - petal width (cm)
            dtypes:
              - int64
              - float64
              - float64
              - float64
              - float64
            index_cols:
              - ''
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
              - ''
              - sepal length (cm)
              - sepal width (cm)
              - petal length (cm)
              - petal width (cm)
            dtypes:
              - int64
              - float64
              - float64
              - float64
              - float64
            index_cols:
              - ''
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
              - ''
              - sepal length (cm)
              - sepal width (cm)
              - petal length (cm)
              - petal width (cm)
            dtypes:
              - int64
              - float64
              - float64
              - float64
              - float64
            index_cols:
              - ''
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
    version: 1.0.2
  - module: pandas
    version: 1.4.1
  - module: numpy
    version: 1.22.3
```

</details>

It's a bit long, but we can see all that we need to use the model later:

1. Model methods: `predict` and `predict_proba`
2. Input data schema that describes the DataFrame with the iris dataset
3. Requirements: `sklearn`, `numpy`, `pandas` with particular versions we need
   to run this model.

Note, that we don't need to specify these requirements: MLEM investigates the
object you're saving (even if it's a complex one) and finds out all requirements
needed.

⛳ [Train](https://github.com/iterative/example-mlem-get-started/tree/3-train)

Finally, we can use MLEM to apply the model against a dataset and calculate some
metrics:

```python
# evaluate.py
import json

from mlem.api import apply
from mlem.core.metadata import load
from sklearn import metrics

def main():
    y_pred = apply("rf", "test_x.csv", method="predict_proba")
    y_true = load("test_y.csv")
    roc_auc = metrics.roc_auc_score(y_true, y_pred, multi_class="ovr")

    with open("metrics.json", "w") as fd:
        json.dump({"roc_auc": roc_auc}, fd, indent=4)

if __name__ == "__main__":
    main()
```

Here we use the `apply` function that handles loading of the model and dataset
for us. You could also just load your model and call `predict_proba` manually.
Also, if you don’t have your dataset saved as a MLEM object, you can
[import](https://todo) it as MLEM object on-the-fly.

Now, let's run the script

```bash
$ python evaluate.py
$ cat metrics.json
{
    "roc_auc": 1.0
}
```

⛳
[Evaluation](https://github.com/iterative/example-mlem-get-started/tree/4-eval)

TLDR: we've just

1. generated data,
2. saved data with MLEM,
3. loaded it in another Python script,
4. trained model,
5. saved model with MLEM,
6. used model to get predictions,
7. evaluated model quality.
