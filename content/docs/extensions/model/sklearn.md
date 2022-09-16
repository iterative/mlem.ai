# Scikit-Learn Models Support

[ModelType](/doc/user-guide/mlem-abcs#modeltype) implementations for any
sklearn-compatible classes as well as `Pipeline`

## Requirements

```bash
pip install mlem[sklearn]
# or
pip install scikit-learn
```

## Examples

### Saving and loading Scikit-Learn model

```python
from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier

from mlem.api import save, load


data, y = load_iris(return_X_y=True, as_frame=True)
rf = RandomForestClassifier()
rf.fit(data, y)

save(
    rf,
    "rf",
    sample_data=data,
)

rf = load("rf")
rf.predict(data)
```

## Implementation reference

### `class SklearnModel`

**MlemABC parent type**: `model_type`

**MlemABC type**: `sklearn`

    ModelType implementation for `scikit-learn` models

**Fields**:

- `io: ModelIO = SimplePickleIO()` - IO

---

### `class SklearnPipelineType`

**MlemABC parent type**: `model_type`

**MlemABC type**: `sklearn_pipeline`

    ModelType implementation for `scikit-learn` pipelines

**Fields**:

- `io: ModelIO = SimplePickleIO()` - IO
