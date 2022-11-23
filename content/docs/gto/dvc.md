# GTO with DVC

While GTO enables building an Artifact Registry in Git repo, it doesn't version
artifact binaries themselves. There are few ways to resolve this:

1. You can commit artifacts to Git repo. If they aren't small enough, this is
   not recommended. To bypass this limitation, you can try using Git-lfs.
2. You can version binaries with [DVC](https://dvc.org/) and commit pointers to
   them to the repo. This is the recommended approach for large files.
3. You can version binaries manually somewhere, specifying URL to them as `path`
   in `artifacts.yaml`. This can be done, if your artifacts are already
   versioned by some external system.

This guide will show how to use DVC with GTO.

## Tracking artifacts with DVC

If you don't version your artifacts with DVC yet, you should start with DVC Get
Started first, and then come back to this Guide.

Note that you can add remote artifacts with `dvc import-url`. (do we need some
examples in this section?)

<!-- ```

dvc init --no-scm dvc remote add az azure://container-name export
AZURE_STORAGE_CONNECTION_STRING='YOUR_CONNECTION_STRING'

dvc import-url --no-download azure://container-name/data.parquet

``` -->

## Annotating DVC-tracked artifacts

Once you have DVC artifacts in your repo, you can annotate them with GTO:

```cli
# assuming `model.pkl` is tracked with DVC
$ gto annotate model --path model.pkl
```

This will modify `artifacts.yaml`, adding:

```yaml
# artifacts.yaml
model:
  path: model.pkl
```

Now you should commit changes to Git, and you can register versions and assign
stages using that new commit.

## Downloading artifacts

To download DVC-tracked artifact, you need to use `dvc import` command:

```cli
dvc import $REPO $ARTIFACT_PATH --rev $REVISION -o $NEW_ARTIFACT_PATH
```

Usually you would have the right revision (such as in CI - it would be the Git
tag that triggered it), but if you need to download the latest version, you can
use:

```cli
$ gto show --repo https://github.com/iterative/example-gto churn@greatest --ref
```

For a model version in stage, that will be:

```cli
$ gto show --repo https://github.com/iterative/example-gto churn#dev --ref
```

Artifact path can be discovered by `gto describe`:

```cli
$ gto describe model --rev $REVISION
```

### Example: downloading from outside

Uniting this pieces together, if you need to download the latest version of
`model` from outside:

```cli
$ REVISION=$(gto show --repo $REPO model@greatest --ref)
$ ARTIFACT_PATH=$(gto describe --repo $REPO model --rev $REVISION --path)
$ dvc import $REPO model --rev $REVISION -o $ARTIFACT_PATH
```

### Example: downloading in CI

In CI that would be a bit simpler (taking GH Actions as an example):

```cli
$ ARTIFACT_PATH=$(gto describe model --rev $GITHUB_REF --path)
$ dvc import . model --rev $GITHUB_REF -o $ARTIFACT_PATH
```

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
