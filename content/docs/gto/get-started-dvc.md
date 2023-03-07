# Get Started DVC

To leverage concepts of Model and Data Registries in a more explicit way, you
can denote the `type` of each output. This will let you browse models and data
separately, address them by `name` in `dvc get`, and eventually, see them in DVC
Studio.

Let's start with marking an artifact as data or model.

If you're using `dvc add` to track your artifact, you'll need to run:

```dvc
$ dvc add mymodel.pkl --type model
```

If you're producing your models in DVC pipeline, you'll need to add
`type: model` to `dvc.yaml` instead:

```yaml
stages:
  train:
    cmd: python train.py
    deps:
      - data.xml
    outs:
      - mymodel.pkl:
          type: model # like this
```

You can also specify that while using DVCLive:

```py
live.log_artifact(artifact, "path", type="model")
```

This will make them appear in DVC Model Registry and in be shown as models in
`dvc ls`:

<img width="1536" alt="image" src="https://user-images.githubusercontent.com/6797716/223443152-84f57b79-3395-4965-97f9-edc81896a1dc.png">

```dvc
$ dvc ls --registry  # add `--type model` to see models only
 Path           Name                   Type     Labels                       Description
 mymodel.pkl                           model
 data.xml       stackoverflow-dataset  data     data-registry,get-started    imported code
 data/data.xml  another-dataset        data     data-registry,get-started    imported
```

The same way you specify `type`, you can specify `description`, `labels` and
`name`. Defining human-readable `name` (should be unique) is useful when you
have complex folder structures or if you artifact can have different paths
during the project lifecycle.

You can use `name` to address the object in `dvc get`:

```dvc
$ dvc get $REPO stackoverflow-dataset -o data.xml
```

Now, you usually need a specific model version rather than one from the `main`
branch. You can keep track of the model's lineage by
[registering Semantic versions and promoting your models](/doc/gto/get-started)
(or other artifacts) to stages such as `dev` or `production` with GTO. GTO
operates by creating Git tags such as `mymodel@v1.2.3` or `mymodel#prod`.
Knowing the right Git tag, you can get the model locally:

```dvc
$ dvc get $REPO mymodel.pkl --rev mymodel@v1.2.3
```

Check out
[GTO User Guide](/doc/gto/user-guide/#getting-artifacts-in-systems-downstream)
to learn how to get the Git tag of the `latest` version or version currently
promoted to stages like `prod`.

## Getting models in CI/CD

Git tags are great to [kick off CI/CD](/doc/gto/user-guide/#acting-in-cicd)
pipeline in which we can consume our model. You can use
[GTO GitHub action](https://github.com/iterative/gto-action) to interpret the
Git tag that triggered the workflow and act based on that. If you simply need to
download the model to CI, you can also use this Action with `download` option:

```yaml
steps:
  - uses: actions/checkout@v3
  - id: gto
    uses: iterative/gto-action@v1
    with:
      download: True # you can provide a specific destination path here instead of `True`
```

## Restricting which types are allowed

To specify which `type`s are allowed to be used, you can add the following to
your `.dvc/config`:

```
# .dvc/config
types: [model, data]
```
