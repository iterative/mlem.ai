# Versioning MLEM objects with DVC

To use MLEM with Git and enable GitOps, we need to commit MLEM models to Git
repository. While committing `.mlem` metafiles is easy, model binaries and
datasets are too heavy to store in Git. To fix that, we suggest using
[DVC](https://dvc.org). DVC
[stores objects in remote storages](https://dvc.org/doc/start/data-management/data-versioning),
allowing us to commit just pointers to them.

This page offers a small Tutorial on how to use DVC with already existing MLEM
project. We will reorganize our example repo to showcase that.

## Setting things up

<details>

### ⚙️ Expand for setup instructions

If you want to follow along with this tutorial, you can use our
[example repo](https://github.com/iterative/example-mlem-get-started).

```shell
$ git clone https://github.com/iterative/example-mlem-get-started
$ cd example-mlem-get-started
```

Next let's create a Python virtual environment to cleanly install all the
requirements with `pip` (including DVC and MLEM).

```shell
$ python3 -m venv .venv
$ source .venv/bin/activate
$ pip install -r requirements.txt
```

</details>

First, let’s initialize DVC and add a DVC remote (we will use a local one for
easier testing, but you can use whatever is available to you):

```cli
$ dvc init
$ dvc remote add myremote -d /tmp/dvcstore/
$ git add .dvc/config
```

Now, we also need to setup MLEM so it knows to use DVC.

```cli
$ mlem config set core.storage.type dvc
✅  Set `storage.type` to `dvc` in repo .
```

After the initial configuration is done, we need to select how we're going to
use MLEM with DVC:

- We could only use DVCs ability to track binary files, manually adding model
  binaries to version control. This scenario is covered in the section
  [Versioning binaries manually](#versioning-binaries-manually) below (use this
  option if you hear about DVC for the first time).
- We could use
  [DVC pipelines](https://dvc.org/doc/start/data-management/data-pipelines) to
  manage all stages of model creation (data cleaning, featurization, training,
  etc.). In this case, we may want DVC to automatically store binaries. This
  case is covered below under
  [Using MLEM in DVC Pipeline](#using-mlem-in-dvc-pipeline).

## Versioning binaries manually

Also, let’s add `.mlem` files to `.dvcignore` so that metafiles are ignored by
DVC.

```cli
$ echo "/**/?*.mlem" > .dvcignore
$ git add .dvcignore
```

Finally, we need to stop Git from keeping already indexed binaries.

```cli
$ git rm -r --cached models data
```

Next, let’s remove artifacts from Git and re-save them, so MLEM can use new
storage for them. You don't need to change a single line of code

```cli
$ git rm -r --cached models data
$ python train.py
```

Finally, let’s add and commit new metafiles to Git and artifacts to DVC,
respectively:

```cli
$ dvc add models/rf
$ git add models
$ git commit -m "Switch to dvc storage"
...

$ dvc push -r myremote
$ git push
...
```

Now, you can load MLEM objects from your repo even though there are no actual
binaries stored in Git. MLEM will know to use DVC to load them.

⛳
[Switch to DVC](https://github.com/iterative/example-mlem-get-started/tree/9-dvc-save-models)

# Using MLEM in DVC Pipeline

[DVC pipelines](https://dvc.org/doc/start/data-management/pipelines) are the
useful DVC mechanism to build data pipelines, in which you can process your data
and train your model. You may be already training your ML models in them and
what to start using MLEM to save those models.

MLEM could be easily plug in into existing DVC pipelines. You'll need to mark
`.mlem` files as `cache: false`
[outputs](https://dvc.org/doc/user-guide/project-structure/pipelines-files#output-subfields)
of a pipelines stage.

## Example

Let's continue using the example from above. First, let's stop tracking the
artifact `models/rf` in DVC and stop ignoring MLEM files in `.dvcignore`.

```dvc
$ dvc remove models/rf.dvc
# we can delete the file since there are no other records
# beside one we added above:
$ git rm .dvcignore
```

Now let's create a simple pipeline to train your model:

```yaml
# dvc.yaml
stages:
  train:
    cmd: python train.py
    deps:
      - train.py
    outs:
      - models/rf
      - models/rf.mlem:
          cache: false
```

The binary was already in, so there's no need to add it again. For the metafile,
we've added two rows and specify `cache: false` to track it with DVC while
storing it in Git.

You can verify everything is working by running the pipeline:

```dvc
$ dvc repro
Running stage 'train':
> python train.py
Use `dvc push` to send your updates to remote storage.
```

Now DVC will take care of storing binaries, so you'll need to commit model
metafile (`models/rf.mlem`) and `dvc.lock` only. Learn more about
[DVC](https://dvc.org/doc) and how it can be useful for training your ML models.
