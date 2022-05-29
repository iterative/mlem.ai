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

First, let’s initialize DVC and add a remote (we will use azure, but you can use
whatever is available to you):

```cli
$ dvc init
$ dvc remote add myremote -d azure://example-mlem
$ git add .dvc/config
```

Now, we also need to setup MLEM so it knows to use DVC.

```cli
$ mlem config set default_storage.type dvc
✅  Set `default_storage.type` to `dvc` in repo .
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
$ dvc add .mlem/model/rf .mlem/dataset/*.csv
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

DVC pipelines are the useful DVC mechanism to build data pipelines, in which you
can process your data and train your model. You may be already training your ML
models in them and want to start using MLEM to save those models.

MLEM can be easily plugged into existing DVC pipelines. If you already added
`.mlem` files to `.dvcignore`, you are good to go. Otherwise you'll need to
mark `.mlem` files as `cache: false` [outputs] of a pipelines stage.
[outputs]: https://dvc.org/doc/user-guide/project-structure/pipelines-files#output-subfields

## Example

You may have a simple pipeline in which you train your model, like this:

```yaml
# dvc.yaml
stages:
  train:
    cmd: python train.py models/rf
    deps:
      - train.py
    outs:
      - models/rf
```

Next step would be to start saving your models with MLEM. Since MLEM saves both
the binary and corresponding `.mlem` metafile, you need to have both of them in
the DVC pipeline:

```yaml
# dvc.yaml
stages:
  train:
    cmd: python train.py models/rf
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

Now MLEM is ready to be used in your DVC pipeline!
