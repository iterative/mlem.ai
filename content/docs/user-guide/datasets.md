# WIP Woring with datasets

## Getting the data

The first step is to get some data. For this tutorial, we’ll just generate it.
Let's take a look at this python script:

```py
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

<details>

### ⛳ [Data prepared](https://github.com/iterative/example-mlem-get-started/tree/2-prepare)

```bash
$ git add .mlem
$ git commit -m "Added data"
$ git diff 2-prepare
```

</details>

# ---------

> Note that we didn't specify whether the saved dataset was `pd.DataFrame`,
> `np.array` or `tf.Tensor`. MLEM is getting that for you, and this handy magic
> extends to ML models 👋
