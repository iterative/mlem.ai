# mlem.core.metadata.load()

Load python object saved by MLEM

```py
def load(
    path: str,
    repo: Optional[str] = None,
    rev: Optional[str] = None,
    batch_size: Optional[int] = None,
    follow_links: bool = True,
) -> Any
```

#### Usage:

```py
import os
from mlem.api import load

out_path = os.path.join(os.getcwd(), "saved-model")
loaded = load(out_path)
```

## Description

Loads a python object from a given path. The path can belong to different file systems (eg: `S3`). The function returns the underlying python object saved by MLEM.

## Parameters

- **`path`** (required) - Path to the object. Could be local path or path inside a git repo.
- `repo` (optional) - URL to repo if object is located there.
- `rev` (optional) - revision, could be git commit SHA, branch name or tag.
- `follow_links` (optional) - If object we read is a MLEM link, whether to load the actual object link points to. Defaults to True.

## Exceptions

None

## Example: Load a trained model saved with MLEM

```py
import os
from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier
from mlem.api import load

path = os.path.join(os.getcwd(), "saved-model")

model = load(path)
assert isinstance(model, DecisionTreeClassifier)
train, _ = load_iris(return_X_y=True)
model.predict(train)
```
