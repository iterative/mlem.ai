# Get Started DVC

To leverage concepts of Model and Data Registries in a more explicit way, you
can denote the `type` of each output. This will let you browse models and data
separately, address them by `name` in `dvc get`, and eventually, see them in DVC
Studio.

Let's start with marking an artifact as data or model. To do so, you need to add
it to a top section called `artifacts` in your `dvc.yaml`

```yaml
# dvc.yaml
artifacts:
  def-detector: # just like with plots, this could be a path or any string ID
    # also, all options here are optional
    type: model
    description: glass defect image classifier
    labels:
      - algo=cnn
      - owner=aguschin
      - project=prod-qual-002
    path: models/mymodel.pkl # specify path if using alias to reference the artifact
```

If you want this to be in a separate file (say, `artifacts.yaml`), you can tell
DVC to use it with:

```yaml
# dvc.yaml
artifacts: artifacts.yaml
```

You can also specify that while using DVCLive, which will also add your model to
the `artifacts` section in `dvc.yaml`:

```py
# you can pass `name`, `description`, `labels` as well
live.log_artifact(artifact, "mymodel", type="model")
```

Which, given no `artifacts` section existing, will produce:

```yaml
# dvc.yaml
artifacts:
  mymodel:
    type: model
```

When you commit and push this change, your models will appear in Studio Model
Registry:

![](https://user-images.githubusercontent.com/6797716/223443152-84f57b79-3395-4965-97f9-edc81896a1dc.png)

[extra for now] As a next step, they will be available in `dvc ls`:

```dvc
$ dvc ls --artifacts  # add `--type model` to see models only
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
$ dvc get $REPO def-detector -o model.pkl
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

<details>

### Getting `latest` or what's in `prod` directly with DVC [extra for now]

(This can be implemented, but for now we decided not to - let's wait and see)

You can also use shortcuts in `dvc get`:

```dvc
$ dvc get $REPO def-detector@latest  # download the latest version
$ dvc get $REPO def-detector#prod    # download what's in prod
```

</details>

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

Which means, if the Git tag that triggered this workflow registers a version or
promotes it to a stage (like `mymodel@v1.2.3` or `mymodel#prod`), this will run
`dvc get . mymodel`.

## Restricting which types are allowed [extra for now]

To specify which `type`s are allowed to be used, you can add the following to
your `.dvc/config`:

```
# .dvc/config
types: [model, data]
```

## Seeing new model versions pushed with DVC experiments

After you run `dvc exp push` to push your experiment that updates your model,
you'll see a commit candidate to be registered:

![](https://user-images.githubusercontent.com/6797716/223444959-d8ddd1a0-5582-405f-9ab0-807e1a0c9489.png)

Please note it's usually a good idea to merge your experiment before registering
a semantic version to avoid creating dangling commits (not reachable from any
branch).

In future you'll also be able to compare that new model version pushed (even non
semver-registered) with the latest one on this Model Details Page. Or have a
button to go to the main repo view with "compare" enabled:

![](https://user-images.githubusercontent.com/6797716/223445799-7ae65e58-6a9e-42a8-890a-f04839349873.png)
