# Continuous Integration and Deployment for Machine Learning

Applying DevOps methodologies to machine learning (MLOps) and data management
(DataOps) is increasingly common. This means resource orchestration
(provisioning servers for model training), model testing (validating model
inference), and model deployment, as well as monitoring and feedback. MLEM
provides a simple way to publish or deploy your machine learning models with
CI/CD pipelines.

- **Packaging and publishing models**: A common need is when you need to wrap
  your ML model in a specific format and publish it in some registry. Examples
  include turning your ML model into a Python package and publishing it on PyPi,
  building a Docker image and pushing it to Docker Hub, or just exporting your
  model to ONNX and publishing it as an artifact to Artifactory.

- **Deploying models**: Another common scenario is when you want to deploy a
  model within a CI/CD pipeline. For this, MLEM includes a number of
  ready-to-use integrations with popular deployment platforms.

## Package and publish an ML model

To trigger the publishing or deploying of a new version, you usually create a
Git tag that kicks off the CI process. To make this build process consistent
with future deployment, you can create and commit an MLEM declaration:

```cli
$ mlem declare builder pip build-to-pip \
    --package_name=mypackagename \
    --target=package
💾 Saving builder to build-to-pip.mlem
```

And then use that declaration in the CI job (e.g. with GitHub Actions):

```yaml
# .github/workflows/publish.yml
name: publish-my-model

on:
  push: tags

jobs:
  run:
    runs-on: [ubuntu-latest]

    steps:
      - uses: actions/checkout@v2

      - uses: actions/setup-python@v2

      - name: build
        run: |
          pip3 install -r requirements.txt
          mlem build --load build-to-pip.mlem --model my-model

      - name: publish
        run: |
          sh upload_to_pypi.sh package
```

Learn more about building (packaging) ML models
[here](/doc/get-started/building).

## Deploy an ML model

The deployment scenario is similar. First you need to create environment and
deployment declarations, and commit them to Git:

```cli
$ mlem declare deployment heroku myservice \
    --app_name=mlem-deployed-in-ci \
    --model=my-model \
    --env=staging
💾 Saving deployment to myservice.mlem
```

Then create and commit the CI pipeline (e.g. with GH Actions):

```yaml
# .github/workflows/publish.yml
name: publish-my-model

on:
  push: tags

jobs:
  run:
    runs-on: [ubuntu-latest]

    steps:
      - uses: actions/checkout@v2

      - uses: actions/setup-python@v2

      - name: pack
        run: |
          pip3 install -r requirements.txt
          mlem deployment run --load myservice.mlem --model my-model
```

Learn more about deploying ML models [here](/doc/get-started/deploying).
