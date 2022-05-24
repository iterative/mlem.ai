# Working with repositories and remote objects

<details>

### 🧳 Requirements

We need to install DVC since model binaries in the remote example repo are
stored in the cloud remote with DVC’s help. In another section we’ll show how
MLEM works with DVC in more details.

`pip install dvc[s3]`

</details>

## Listing objects

Since we've saved the data and the model in the repository, let's list them:

```cli
$ mlem ls
```

```yaml
Datasets:
  - test_x.csv
  - test_y.csv
  - train.csv
Models:
  - rf
```

Note that we are actually listing models and data which is saved in the
repository we're in.

But what if they are stored in a remote Git repository, and we don't want to
clone it? MLEM can also work with remote repositories:

```cli
$ mlem ls https://github.com/iterative/example-mlem-get-started --type model
```

```yaml
Models:
  - rf
```

We also can use URL addresses to load models from remote repositories directly:

```py
from mlem.api import load

model = load("https://github.com/iterative/example-mlem-get-started/rf")
# or
model = load(
    "rf",
    repo="https://github.com/iterative/example-mlem-get-started",
    rev="main"
)
```

If we just want to download the model to a local disk to use it later, we can
run `clone` command

```cli
$ mlem clone https://github.com/iterative/example-mlem-get-started/rf ml_model
```

The other way to do it is to run

```cli
$ mlem clone rf --repo https://github.com/iterative/example-mlem-get-started --rev main ml_model
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

If you don’t have the need to version your models, but you want to store your
objects in some remote location, you can use MLEM with any cloud/remote
supported by
[fsspec](https://filesystem-spec.readthedocs.io/en/latest/api.html#built-in-implementations),
e.g. s3.

To do so, use paths with corresponding file system protocol and path like
`s3://<bucket>/`

```cli
$ mlem init s3://example-mlem-get-started
$ mlem clone rf s3://example-mlem-get-started/rf
⏳️ Loading meta from .mlem/model/rf.mlem
🐏 Cloning .mlem/model/rf.mlem
💾 Saving model to s3://example-mlem-get-started/.mlem/model/rf.mlem
```

Now you can load this model via API or use it in CLI commands just like if it
was local:

```py
from mlem.api import load
model = load("rf", repo="s3://example-mlem-get-started")
```

```cli
$ mlem apply rf --repo s3://example-mlem-get-started test_x.csv --json
[1, 0, 2, 1, 1, 0, 1, 2, 1, 1, 2, 0, 0, 0, 0, 1, 2, 1, 1, 2, 0, 2, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1, 0, 0, 2, 1, 0]
```

TL;DR: we've just

1. Listed all MLEM models in the Git repo,
2. Loaded model from Git repo directly,
3. Initialized MLEM in remote bucket and worked with just like with a regular
   folder.
