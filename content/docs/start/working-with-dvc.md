# Versioning MLEM objects with DVC

<details>

### 🧳 Requirements

`pip install mlem dvc[azure]`

</details>

Often it’s a bad idea to store binary files in git, especially big ones. To
solve this MLEM can utilize DVC capabilities to connect external cloud storage
for model and dataset versioning.


> You can learn more about DVC [here](https://dvc.org/doc).


We will reorganize our example repo to use DVC. 

## Setting up repo

First, let’s initialize DVC and
add a remote (we will use azure, but you can use whatever is available to you):

```dvc
$ dvc init
$ dvc remote add myremote -d azure://example-mlem
$ git add .dvc/config
```

Now, we also need to setup MLEM so it knows to use DVC.

```mlem
$ mlem config set default_storage.type dvc
✅  Set `default_storage.type` to `dvc` in repo .
```

Also, let’s add `.mlem` files to `.dvcignore` so that metafiles are ignored by
DVC

```bash
$ echo "/**/?*.mlem" > .dvcignore
$ git add .dvcignore
```

## Saving objects
Next, let’s remove artifacts from git and re-save them, so MLEM can use new
storage for them. You don't need to change a single line of code

```bash
$ git rm -r --cached .mlem/
$ python prepare.py
$ python train.py
```

Finally, let’s add new metafiles to git and artifacts to DVC respectively,
commit and push them

```bash
$ dvc add .mlem/model/rf .mlem/dataset/*.csv
$ git add .mlem
$ git commit -m "Switch to dvc storage"
$ dvc push -r myremote
$ git push
```

Now, you can load MLEM objects from your repo even though there are no actual
binaries stored in git. MLEM will know to use DVC to load them.

⛳
[Switch to DVC](https://github.com/iterative/example-mlem-get-started/tree/5-switch-to-dvc)
