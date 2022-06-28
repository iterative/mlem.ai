# Working with Remote Objects and Projects

[MLEM objects] can live in different locations, such as Git repositories, cloud
object storage, local directories, etc. In this page we will discuss how to work
with remote objects (Git, cloud), but the same logic extends to other locations.

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

<admon>

## Loading objects

One can use URL addresses to load objects (models, data, etc.) from remote
repositories directly:

```py
from mlem.api import load

model = load(
    "rf",
    project="https://github.com/iterative/example-mlem-get-started",
    rev="simple"
)
```

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

## Summary

Working with remote projects and objects have several different use-cases, some
of which we covered above:

1. List different MLEM objects (models, data) in remote MLEM projects.
2. Load objects (models, data) from remote Git repositories directly into Python
   runtime.
3. Clone objects (models, data) from remote Git repositories.
4. Initialize MLEM project in a remote bucket and use it.
