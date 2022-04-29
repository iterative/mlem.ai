# Working with repositories and remote objects

<details>

### 🧳 Requirements

We need to install DVC since model binaries in the remote example repo are
stored in the cloud remote with DVC’s help. In another section we’ll show how
MLEM works with DVC in more details.

`pip install dvc[s3]`

</details>

Now it becomes more interesting. Since we've saved the data and the model in the
repository, let's list them:

```bash
$ mlem ls
Datasets:
 - test_x.csv
 - test_y.csv
 - train.csv
Models:
 - rf
```

Note that we are actually listing models and data which is saved in the
repository we're in.

What if they are stored in a remote git repository and we don't want to clone
it? We can do the same:

```bash
$ mlem ls https://github.com/iterative/example-mlem-get-started --type model
Models:
 - rf
```

We also can load model from the repository directly:

```python
from mlem.api import load
# one way
model1 = load("https://github.com/iterative/example-mlem-get-started/rf")
# or another
model2 = load(
    "rf",
    repo="https://github.com/iterative/example-mlem-get-started",
    rev="main"
)
print(model1, model2)
```

If we just want to download the model to a local disk to use it later, we can
run

```bash
$ mlem clone https://github.com/iterative/example-mlem-get-started/rf ml_model
```

The other way to do it is to run

```bash
$ mlem clone rf --repo https://github.com/iterative/example-mlem-get-started --rev main ml_model
```

- 💡 We used our example repo
  [https://github.com/iterative/example-mlem-get-started](https://github.com/iterative/example-mlem-get-started)
  in the commands below. You can commit and push your models to your own repo
  and use it if you want
  To push your models and datasets to the repo, add them to dit and commit
  ```bash
  $ git add .mlem *.py
  $ git commit -am "committing mlem objects and code"
  $ git push
  ```

If you don’t have the need to version your models, but you want to store your
objects in some remote location, you can use MLEM with any cloud/remote
supported by fsspec, e.g. s3.

To do that, use paths with corresponding fs protocol and path like
`s3://<bucket>/`

```bash
$ mlem init s3://example-mlem-get-started
$ mlem clone rf s3://example-mlem-get-started/rf
⏳️ Loading meta from .mlem/model/rf.mlem
🐏 Cloning .mlem/model/rf.mlem
💾 Saving model to s3://example-mlem-get-started/.mlem/model/rf.mlem
```

Now you can load this model via API or use it in CLI commands just like if it
was local:

```python
model = load("rf", repo="s3://example-mlem-get-started")
```

```bash
$ mlem apply rf --repo s3://example-mlem-get-started test_x.csv --json
[1, 0, 2, 1, 1, 0, 1, 2, 1, 1, 2, 0, 0, 0, 0, 1, 2, 1, 1, 2, 0, 2, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1, 0, 0, 2, 1, 0]
```

TLDR: we've just

1. Listed all MLEM models in the Git repo,
2. Loaded model from Git repo directly,
3. Initialized MLEM in remote bucket and worked with just like with a regular
   folder.
