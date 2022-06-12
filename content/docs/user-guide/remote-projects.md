# Working with projects and remote objects

<details>

### 🧳 Requirements

We need to install DVC since model binaries in the remote example repo are
stored in the cloud remote with DVC’s help. In another section we’ll show how
MLEM works with DVC in more details.

`pip install dvc[s3]`

</details>

## Listing objects

Models and Data stored inside MLEM projects can be listed with
[mlem list](/doc/command-reference/list).

```cli
$ mlem list
```

```yaml
Data:
  - test_x.csv
  - test_y.csv
  - train.csv
Models:
  - rf
```

Here, the project being considered is the one we're currently in.

But it's also easy to list objects inside a remote Git repository, without
the need of cloning it.

```cli
$ mlem list https://github.com/iterative/example-mlem-get-started --type model --rev simple
```

```yaml
Models:
  - rf
```

## Loading objects

One can use URL addresses to load objects (models, data, etc.) from remote repositories directly:

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
$ mlem clone https://github.com/iterative/example-mlem-get-started/rf ml_model
```

Here's another alternative for the `clone` command, explicitly stating the git
branch (`rev`) and separating the repository url of the remote project,
from the model name inside it:

```cli
$ mlem clone rf --project https://github.com/iterative/example-mlem-get-started --rev main ml_model
```

<details>

### 💡 Expand to use your own repo

We use [example repo](https://github.com/iterative/example-mlem-get-started) in
the commands, but you can create your own repo and use it if you want.

To push your models and datasets to the repo, add them to Git and commit

```cli
$ git add .mlem *.py
$ git commit -am "committing mlem objects and code"
$ git push
```

</details>

## Cloud remotes

MLEM can also be used with any cloud/remote supported by
[fsspec](https://filesystem-spec.readthedocs.io/en/latest/api.html#built-in-implementations),
e.g. s3. This is useful in scenarios where objects are stored in a remote location
without the need to version them (otherwise we strongly recommend to use [DVC](https://dvc.org/doc/use-cases/versioning-data-and-model-files))

To do so, one can use paths with the corresponding file system protocol & path such as
`s3://<bucket>/`

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
$ mlem apply rf --project s3://example-mlem-get-started test_x.csv --json
[1, 0, 2, 1, 1, 0, 1, 2, 1, 1, 2, 0, 0, 0, 0, 1, 2, 1, 1, 2, 0, 2, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1, 0, 0, 2, 1, 0]
```

## Summary

Working with projects and remote objects have several different use-cases, some of which we covered above are:

1. List different MLEM objects (models, data) in the local projects as well as Git repositories.
2. Load objects (models, data) from local projects and Git repositories directly.
3. Clone objects (models, data) from/to Git repositories.
4. Initialize MLEM in a remote bucket and work with it as if it was being used locally.
