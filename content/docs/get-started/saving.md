# Saving models

After initializing MLEM we have an empty project (except for the config file),
but soon we'll save something with MLEM to fill it up.

## Training the model

To save models with MLEM you just need to use `mlem.api.save()` method instead
of some other way you saved your model before. Let's take a look at the
following python script:

```py
# train.py
from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier

from mlem.api import save


def main():
    data, y = load_iris(return_X_y=True, as_frame=True)
    rf = RandomForestClassifier(
        n_jobs=2,
        random_state=42,
    )
    rf.fit(data, y)

    save(
        rf,
        "rf",
        sample_data=data,
        description="Random Forest Classifier",
    )


if __name__ == "__main__":
    main()

```

Here we load well-known iris dataset with sklearn and train a simple classifier.
But instead of pickling the model we saved it with MLEM.

Now let's run this script and see how we save the model.

```cli
$ python train.py
...

$ tree .mlem/model/
.mlem/model
├── rf
└── rf.mlem
```

<admon type="tip">

By default, MLEM saves your files to `.mlem/` directory, but that can be
changed. See [Project Structure](/doc/user-guide/project-structure) for more
details.

</admon>

The model was saved along with some metadata about it: `rf` containing the model
binary and a `rf.mlem` metafile containing information about it. Let's take a
look at it:

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

Note that we didn't specify requirements: MLEM investigates the object you're
saving (even if it's a complex one) and finds out all requirements needed!

<details>

### ⛳ Train

Tag:
[2-train](https://github.com/iterative/example-mlem-get-started/tree/2-train)

```cli
$ git add .mlem/model
$ git commit -m "Train the model"
$ git diff 2-train
```

</details>
