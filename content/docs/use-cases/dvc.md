# Versioning MLEM objects with DVC

<details>

### ⚙️ Expand for setup instructions

If you want to follow along with this tutorial and try MLEM, you can use our
[example repo](https://github.com/iterative/example-mlem-get-started).

```shell
$ git clone https://github.com/iterative/example-mlem-get-started
$ cd example-mlem-get-started
$ git checkout 1-dvc-mlem-init
```

Next let's create an isolated virtual environment to cleanly install all the
requirements (including MLEM) there:

```shell
$ python3 -m venv .venv
$ source .venv/bin/activate
$ pip install -r requirements.txt
```

</details>

Often it’s a bad idea to store binary files in Git, especially big ones. To
solve this MLEM can utilize [DVC](https://dvc.org/doc) capabilities to connect
external cloud storage for model and dataset versioning.

We will reorganize our example repo to use DVC.

## Setting up repo

First, let’s initialize DVC and add a remote (we will use a local one for easier
testing, but you can use whatever is available to you):

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

Also, let’s add `.mlem` files to `.dvcignore` so that metafiles are ignored by
DVC.

```cli
$ echo "/**/?*.mlem" > .dvcignore
$ git add .dvcignore
```

## Saving objects

Next, let’s remove artifacts from Git and re-save them, so MLEM can use new
storage for them. You don't need to change a single line of code

```cli
$ git rm -r --cached .mlem/
$ python train.py
```

Finally, let’s add and commit new metafiles to Git and artifacts to DVC,
respectively:

```cli
$ dvc add .mlem/model/rf
$ git add .mlem
$ git commit -m "Switch to dvc storage"
...

$ dvc push -r myremote
$ git push
...
```

Now, you can load MLEM objects from your repo even though there are no actual
binaries stored in Git. MLEM will know to use DVC to load them.

⛳
[Switch to DVC](https://github.com/iterative/example-mlem-get-started/tree/4-dvc-save-models)

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
artifact `.mlem/model/rf` in DVC and stop ignoring MLEM files in `.dvcignore`.

```dvc
$ dvc remove .mlem/model/rf.dvc
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
      - .mlem/model/rf
      - .mlem/model/rf.mlem:
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
metafile (`.mlem/model/rf.mlem`) and `dvc.lock` only. Learn more about
[DVC](https://dvc.org/doc) and how it can be useful for training your ML models.
