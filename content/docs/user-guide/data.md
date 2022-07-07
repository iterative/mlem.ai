# Working with Data

You need to save data as [MLEM Objects] so that it is compatible with operations
such as [mlem apply](/doc/command-reference/apply).

[mlem objects]: /doc/user-guide/basic-concepts#mlem-objects

## Saving data with MLEM

Use the `mlem.api.save()` method in your Python code.

For example, let's load a well-known IRIS dataset with `sklearn`, and then save
parts of it locally with MLEM:

```py
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

Executing this script results in a few data frames saved to disk along with
certain metadata about them in the `.mlem/data` directory:

```
.mlem/data
├── test_x.csv
├── test_x.csv.mlem
├── test_y.csv
├── test_y.csv.mlem
├── train.csv
└── train.csv.mlem
```

Le'ts inspect the contents of the main data frame (`train.csv`):

```csv
,sepal length (cm),sepal width (cm),petal length (cm),petal width (cm),target
4,5.0,3.6,1.4,0.2,0
32,5.2,4.1,1.5,0.1,0
142,5.8,2.7,5.1,1.9,2
85,6.0,3.4,4.5,1.6,1
```

MLEM captures the data schema and library requirements for the saved data in the
corresponding metafile (`train.csv.mlem`):

```yaml
artifacts:
  data:
    hash: add43029d2b464d0884a7d3105ef0652
    size: 2459
    uri: train.csv
data_type:
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
object_type: data
reader:
  data_type:
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

MLEM now "knows" that it needs `pandas` to load the data -- You don't have to
specify if it was of type `pd.DataFrame`, `np.array` or `tf.Tensor`.

This out and this handy magic also extends to ML models: when you run
`mlem.api.save(mymodel, "mymodel", sample_data=X)`, MLEM will investigate `X` to
find out the expected schema of the model's input data.
