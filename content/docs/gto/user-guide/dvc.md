# GTO with DVC

In many ML projects, data isn't stored in a Git repository and needs to be
downloaded from external sources. [DVC](https://dvc.org) is a common way to
store binaries for the artifacts registered with GTO.

<details>

### Learn about different approaches to this

1. You can commit artifacts to Git repo. If they aren't small enough, this is
   not recommended. To bypass this limitation, you can use
   [Git-lfs](https://git-lfs.github.com).
2. You can version binaries with [DVC](https://dvc.org/) and commit pointers to
   them to the repo. This is the recommended approach for large files.
3. You can version binaries manually somewhere, specifying URL to them as `path`
   in `artifacts.yaml`. This can be done, if your artifacts are already
   versioned by some external system.

</details>

If you are new to DVC, you should start with
[DVC Get Started](https://dvc.org/doc/start) first, and then come back to this
Guide.

<!-- ```

dvc init --no-scm dvc remote add az azure://container-name export
AZURE_STORAGE_CONNECTION_STRING='YOUR_CONNECTION_STRING'

dvc import-url --no-download azure://container-name/data.parquet

``` -->

## Tracking an artifact with DVC

First, we need to start tracking artifact with DVC. If you produce this artifact
in DVC Pipelines, it's done automatically.

If the artifact is located inside your Git repo, you can use `dvc add`:

```cli
$ dvc add model.pkl
$ git add model.pkl.dvc
```

If the artifact is located in some external storage, we can use `dvc import-url`
to still keep metainformation about it in the repo (use `--no-download` to skip
downloading it):

```cli
$ dvc import-url --no-download s3://container/model.pkl
$ git add model.pkl.dvc
```

## Annotating DVC-tracked artifacts

Once the artifact is tracked with DVC within your repo, we can annotate it with
GTO:

```cli
$ gto annotate model --path model.pkl
```

This will modify `artifacts.yaml`, adding:

```yaml
model:
  path: model.pkl
```

Now you should commit changes to Git, and you can register versions and assign
stages referencing the new commit.

```cli
$ git add artifacts.yaml
$ git commit -m "version artifact binaries with DVC and annotate it with GTO"
$ git push
```

Now your changes is live in your Git repo and you can download your artifact to
use it 🙌

## Downloading artifacts

When you want to download GTO artifact which binaries are stored with DVC, you
need to use `dvc get` or `dvc import` command:

```cli
$ dvc get $REPO $ARTIFACT_PATH --rev $REVISION -o $OUTPUT_PATH
```

Check out [User Guide](/doc/gto/user-guide#getting-artifacts-downstream) to
learn how to find out `ARTIFACT_PATH` and `REVISION`.

<details>

### Example: downloading from outside the repo

If you need to download the latest version of `model`, that would be:

```cli
$ REVISION=$(gto show --repo $REPO model@greatest --ref)
$ ARTIFACT_PATH=$(gto describe --repo $REPO $ARTIFACT --rev $REVISION --path)
$ dvc get $REPO $ARTIFACT --rev $REVISION -o $ARTIFACT_PATH
```

</details>

<details>

### Example: downloading in CI

If you need to download an artifact from the same repo, that would be a bit
simpler (taking GH Actions as an example):

```cli
$ ARTIFACT_PATH=$(gto describe model --rev $GITHUB_REF --path)
$ dvc pull $ARTIFACT_PATH
```

</details>

<!--
Refer to DVC install guide and Get Started to learn DVC first. If you're already
familiar with DVC, let's set it up for GTO repo (use your remote storage instead
of `s3://mybucket/myrepo`):

```cli
$ dvc init
$ dvc remote add myremote -d s3://mybucket/myrepo
$ git add .dvc/config
```

##

If you want to version your artifact with DVC, you need to add it to DVC first
(skip this step if you already have DVC-tracked artifacts):

```cli
$ dvc add path/to/artifact
$ dvc push
$ git add
``` -->
