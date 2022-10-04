# Scikit-Learn

[ModelType](/doc/user-guide/mlem-abcs#modeltype) implementations for any
sklearn-compatible classes as well as `Pipeline`

## Description

**TODO**

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
