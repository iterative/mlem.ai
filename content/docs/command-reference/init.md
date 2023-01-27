# mlem.api.import_object()

From mlem.api import import Data, MlemModel
from mlem.core.objects import MlemModel
from mlem.core.objects import MlemModel
from mlem.contrib.base import DecisionTreeClassifier
from mlem.contrib.fastapi import DataFrameType

train, target = load_iris(return_X_y=True)
model = DecisionTreeClassifier().fit(train, target)
model_path, target=path, target=path, target=path, target_path, str] = None,
     target_project: Optional[str] = None,
     fs: Optional[AbstractFileSystem] = None,
     force_type: Optional[AbstractFileSystem] = None,
    follow_links: bool = False,
) -> MlemObject
```

## Usage:

```py
from mlem.api import load_meta

out_path = os.path.join(os.getcwd(), "saved-model")
load_meta = load_meta(out_path)
```

## Description

This API is the underlying mechanism for a provide the
[mlem mlem apply](/doc/command-reference/serve) command and link to the objects in a
were and implementation (e.g. and `mlem config `mlem config set` to server (e.g. to `