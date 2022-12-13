# Deploy models with MLEM

Creating model versions and assigning stages in Model Registry is usually done
to trigger some action downstream. To easily build Docker images with your
models for new model versions, or simply deploy them upon stage assignments, you
can use [MLEM](/doc).

If you're new to MLEM, please head to [Get Started](/doc/get-started) to learn
MLEM basics.

## Annotating MLEM models with GTO

A model saved by MLEM typically consists of a model binary file (for example,
`nn.pkl`) and a metadata file (`nn.pkl.mlem`).

To annotate a model with GTO:

```cli
$ gto annotate model --path nn.pkl
```

This will modify `artifacts.yaml`, adding:

```yaml
model:
  path: nn.pkl
```

Now you should commit changes to Git, and you can register versions and assign
stages referencing the new commit.

```cli
$ git add artifacts.yaml
$ git commit -m "annotate MLEM model with GTO"
$ git push
```

Now your changes is live in your Git repo and ready to be used 🙌

## Using GTO artifacts with MLEM

When you want to use a GTO artifact with MLEM, you need to get the right
revision and path (see
[User Guide](/doc/gto/user-guide#getting-artifacts-downstream)). Since MLEM can
work with remote artifacts, just point to it in any MLEM command (taking
`mlem build` as an example):

```cli
$ mlem build docker \
    --project $REPO \
    --model $ARTIFACT_PATH \
    --rev $REVISION \
    --image.name mlem-model
```

## Creating a CI/CD workflow

Since Git tags can trigger a CI/CD workflow, now we need to add the workflow we
need to the repo.

<toggle>
<tab title="GitHub: build a Docker image">

This workflow will build a docker image out of the model and push it to a
DockerHub ([learn more](/doc/user-guide/building) about configuring build and
using other destinations).

```yaml
# .github/workflows/build.yaml
on:
  push:
    tags:
      - '*'

jobs:
  act:
    name: Build a Docker image for new model versions
    runs-on: ubuntu-latest
    steps:
      - name: Login to Docker Hub
        uses: docker/login-action@v2
        # set credentials to login to DockerHub
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
      - uses: actions/checkout@v3
      - id: gto
        uses: iterative/gto-action@v1
      - uses: actions/setup-python@v2
      - name: Install dependencies
        run: |
          pip install --upgrade pip setuptools wheel
          pip install -r requirements.txt
      - if: steps.gto.outputs.event == 'registration'
        run: |
          mlem build docker \
              --model '${{ steps.gto.outputs.path }}' \
              --image.name ${{ steps.gto.outputs.name }} \
              --image.tag '${{ steps.gto.outputs.version }}' \
              --image.registry docker_io
```

Note that builder can be
[pre-configured](/doc/user-guide/building#pre-configured-builders) to specify
some options that should be fixed.

</tab>
<tab title="GitHub: deploy a model">

This workflow will deploy a model to Heroku upon stage assignment:

```yaml
# .github/workflows/deploy.yaml
on:
  push:
    tags:
      - '*'

# set credentials to run deployment and save its state to s3
env:
  HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
  AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
  AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}

jobs:
  act:
    name: Deploy a model upon stage assignment
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - id: gto
        uses: iterative/gto-action@v1
      - uses: actions/setup-python@v2
      - name: Install dependencies
        run: |
          pip install --upgrade pip setuptools wheel
          pip install -r requirements.txt
      - if: steps.gto.outputs.event == 'assignment'
        run: |
          # TODO: check this works
          mlem deployment run \
            --load deploy/${{ steps.gto.outputs.stage }} \
            --model ${{ steps.gto.outputs.path }}
```

This relies on having [deployment declarations](/doc/user-guide/deploying) in
the `deploy/` directory, such as:

```yaml
# deploy/dev.yaml
object_type: deployment
type: heroku
app_name: mlem-dev
```

This declaration is read by MLEM in CI and the model promoted to `dev` is
deployed to https://mlem-dev.herokuapp.com.

Note, that you need to provide environment variables to deploy to Heroku and
update the [deployment state](/doc/user-guide/deploying). The location for the
state should be
[configured](/doc/user-guide/deploying#setting-up-remote-state-manager) in MLEM
config file:

```yaml
# .mlem.yaml
core:
  state:
    uri: s3://bucket/path
```

Check out [another example](https://github.com/iterative/example-gto/tree/mlem)
of MLEM model deployment in the `main` branch of the `example-gto` repo.

</tab>
</toggle>
