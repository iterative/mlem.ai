# mlem.api.save()

Saves given object to a given path.

```py
def save(
    obj: Any,
    path: Union[str, os.PathLike],
    project: Optional[str] = None,
    sample_data=None,
    fs: Optional[AbstractFileSystem] = None,
    params: Dict[str, str] = None,
    preprocess: Union[Any, Dict[str, Any]] = None,
    postprocess: Union[Any, Dict[str, Any]] = None,
) -> MlemObject
```

### Usage:

```py
from mlem.api import save

save(obj, path, index=False, external=True)
```

## Description

Saves a given object to a given path. The path can belong to different file
systems (eg: `S3`). The function returns and saves the object as a
[MLEM Object](/doc/user-guide/basic-concepts#mlem-objects).

We often need to apply some preprocessing before and after the model is applied,
for that we have `preprocess` and `postprocess` arguments. You can think of them
like about running `postprocess(model(preprocess(x)))`. See examples below.

## Parameters

- **`obj`** (required) - Object to dump
- **`path`** (required) - If not located on LocalFileSystem, then should be
  urior `fs` argument should be provided
- `project` (optional) - path to mlem project (optional)
- `sample_data` (optional) - If the object is a model or function, you
  canprovide input data sample, so MLEM will include it's schemain the model's
  metadata
- `fs` (optional) - FileSystem for the `path` argument
- `params` (optional) - arbitrary params for object
- `preprocess` (optional) - applies before the model
- `postprocess` (optional) - applies after the model

## Returns

None

## Exceptions

- `MlemObjectNotFound` - Thrown if we can't find MLEM object

## Example: Save a trained model with MLEM

```py
import os
from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier
from pandas import DataFrame
from mlem.api import save

train, target = load_iris(return_X_y=True)
train = DataFrame(train)
train.columns = train.columns.astype(str)
model = DecisionTreeClassifier().fit(train, target)
path = os.path.join(os.getcwd(), "saved-model")

save(model, path, sample_data=train)
```

## Example: use pre- and post-processors

`preprocess` and `postprocess` can be functions or MLEM models:

```py
def apply_emdedding(word):
    # apply embedding
    ...
    return embedding


def return_classname(prediction):
    if len(prediction.shape) > 1:
        return "A surname" if prediction[0][0] < prediction[0][1] else "Not a surname"
    return "A surname" if prediction[0] else "Not a surname"


mlem.api.save(
    classify_word,  # trained on a dataset created by applying `apply_emdedding`
    "surname_classifier",
    preprocess=apply_emdedding,
    postprocess=return_classname,
    sample_data="Gagarin",
)
```

If you need different pre- and post-processor for different model methods, you
can specify them with dictionaries (let's assume `classify_word` is a sklearn
model and have two methods: `predict` and `predict_proba`):

```py
mlem.api.save(
    classify_word,  # trained on a dataset created by applying `apply_emdedding`
    "surname_classifier",
    preprocess={
        "predict": apply_emdedding,
        "predict_proba": apply_emdedding,
    },
    postprocess={
        "predict": lambda p: "A surname" if p[0] else "Not a surname",
        "predict_proba": lambda p: "A surname" if p[0][0] < p[0][1] else "Not a surname",
    },
    sample_data="Gagarin",
)
```
