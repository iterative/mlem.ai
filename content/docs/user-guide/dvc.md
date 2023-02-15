# Versioning MLEM objects with DVC

To use MLEM with Git and enable GitOps, we need to commit MLEM models to Git
repository. While committing `.mlem` metafiles is easy, model binaries and
datasets are too heavy to store in Git. To fix that, we suggest using
[DVC](https://dvc.org). DVC
[stores objects in remote storages](https://dvc.org/doc/start/data-management/data-versioning),
allowing us to commit just pointers to them.

This page explains how to use DVC with an existing MLEM project. We will
reorganize our example repo to showcase that.

## Setting things up

<details>

### ⚙️ Expand for setup instructions

If you want to follow along with this tutorial, you can use our
[example repo](https://github.com/iterative/example-mlem-get-started).

```cli
$ git clone https://github.com/iterative/example-mlem-get-started
$ cd example-mlem-get-started
```

Next let's create a Python virtual environment to cleanly install all the
requirements with `pip` (including DVC and MLEM).

```cli
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

After the initial configuration is done, we need to decide how we're going to
use MLEM with DVC:

1. We could manually add model binaries to version control. This scenario is
   covered in the [Versioning binaries manually](#versioning-binaries-manually)
   section below (use this option if you hear about DVC for the first time).
2. We could use
   [DVC Pipelines](https://dvc.org/doc/start/data-management/data-pipelines) to
   version model binaries automatically. DVC Pipelines are generally used to
   manage all stages of model creation (data cleaning, featurization, training,
   etc.). This case is covered below in
   [Using MLEM in DVC Pipeline](#using-mlem-in-dvc-pipeline).

## Versioning binaries manually

Let’s add `.mlem` files to `.dvcignore` so that metafiles are ignored by DVC.

```cli
$ echo "/**/?*.mlem" > .dvcignore
$ git add .dvcignore
```

We may need to stop Git from keeping already indexed binaries. For our example
repo, that would be:

```cli
$ git rm -r --cached models data
```

Now we need re-generate them:

```cli
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

## Using MLEM in DVC Pipeline

[DVC pipelines](https://dvc.org/doc/start/data-management/data-pipelines) is a
mechanism to build data pipelines, in which you can process your data and train
your model. You may be already training your ML models in them and what to start
using MLEM to save those models.

MLEM could be easily plug in into existing DVC pipelines. You'll need to mark
`.mlem` files as `cache: false`
[outputs](https://dvc.org/doc/user-guide/project-structure/pipelines-files#output-subfields)
of a pipelines stage.

Let's create a simple pipeline to train your model:

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

We mark the metafile with `cache: false` so DVC pipeline is aware of it, while
still committing it to Git.

You can verify everything is working by running the pipeline:

```cli
$ dvc repro
Running stage 'train':
> python train.py
Use `dvc push` to send your updates to remote storage.
```

Now DVC will take care of storing binaries, so you'll need to commit model
metafile (`models/rf.mlem`) and `dvc.lock` only.

Learn more about [DVC](https://dvc.org/doc) and how it can be useful for
training your ML models.

## Working with private repositories

If you commit your models to a private repository and use DVC to store binaries,
you'll need to authorize both via SSH (for DVC) and via HTTPS (for MLEM).

SSH authorization is usually achieved by running `git push` against a SSH
remote, or it can be done with
[`gh auth login`](https://cli.github.com/manual/gh_auth_login) (if you use
Github).

HTTPS authorization is done by setting `GITHUB_USERNAME` and `GITHUB_TOKEN` env
vars. You can generate a token [here](https://github.com/settings/tokens).

It's is important to first authenticate with SSH and then with HTTPS. Otherwise,
running `gh auth login` will complain that `GITHUB_USERNAME` and `GITHUB_TOKEN`
were already set (it assumes there should be a single authentication method in
place, while we need both).
