# Working with Remote Objects and Projects

[MLEM objects] (models, data, etc.) can live in different locations such as Git
repositories, cloud object storage, local directories, etc.

<admon type="note">

In this page we will work with objects in Git repos, but the same operations
apply to any location.

</admon>

[mlem objects]: /doc/user-guide/basic-concepts#mlem-objects

## Listing objects

You can list MLEM objects inside a remote MLEM projects (Git repo) with
`mlem list`. There's no need to clone it.

```cli
$ mlem list \
       https://github.com/iterative/example-mlem-get-started \
       --rev simple
Deployments:
 - myservice
Models:
 - rf
Envs:
 - staging
```

<admon type="note">

A MLEM project is required as target for `mlem list`. The other operations
(below) work with loose MLEM objects as well.

</admon>

## Loading objects (API)

You can load objects from remote locations inside Python code with
`mlem.api.load()` by using an object name and its URL.

```py
from mlem.api import load

model = load(
    "rf",
    project="https://github.com/iterative/example-mlem-get-started",
    rev="simple"
)
```

This loads the `rf` model to memory. Note that no knowledge of the data type is
needed because this is already [codified in the MLEM object]'s metadata!

[codified in the MLEM object]: /doc/user-guide/data#saving-data-with-mlem

## Cloning objects

You can easily download the object to your local machine so as to use it later
using the `clone` command.

```cli
$ mlem clone rf \
  --project https://github.com/iterative/example-mlem-get-started \
  --rev simple \
  ml_model
⏳️ Loading meta from https://github.com/iterative/example-mlem-get-started/tree/simple/.mlem/model/rf.mlem
🐏 Cloning https://github.com/iterative/example-mlem-get-started/tree/simple/.mlem/model/rf.mlem
💾 Saving model to .mlem/model/ml_model.mlem
```

## Cloud remotes

MLEM can also be used with any cloud/remote supported by
[fsspec](https://filesystem-spec.readthedocs.io/en/latest/api.html#built-in-implementations),
e.g. s3. This is useful in scenarios where objects are stored in a remote
location without the need to version them (otherwise we strongly recommend to
use [DVC](https://dvc.org/doc/use-cases/versioning-data-and-model-files))

To do so, one can use paths with the corresponding file system protocol & path
such as `s3://<bucket>/`

```cli
$ mlem init s3://example-mlem-get-started
$ mlem clone rf s3://example-mlem-get-started/rf
⏳️ Loading meta from .mlem/model/rf.mlem
🐏 Cloning .mlem/model/rf.mlem
💾 Saving model to s3://example-mlem-get-started/.mlem/model/rf.mlem
```

This model can now be loaded via API or can be used in CLI commands as though it
existed locally:

```py
from mlem.api import load
model = load("rf", project="s3://example-mlem-get-started")
```

```cli
$ mlem apply rf \
  --project s3://example-mlem-get-started \
  test_x.csv --json
[1, 0, 2, 1, 1, 0, 1, 2, 1, 1, 2, 0, 0, 0, 0, 1, 2, 1, 1, 2, 0, 2, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1, 0, 0, 2, 1, 0]
```
