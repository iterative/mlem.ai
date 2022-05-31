# Continuous Integration and Deployment for Machine Learning

Applying DevOps methodologies to machine learning (MLOps) and data management
(DataOps) is increasingly common. This means resource orchestration
(provisioning servers for model training), model testing (validating model
inference), and model deployment to production, as well as monitoring &
feedback. MLEM provides you a simple way to publish or deploy your machine
learning models in CI/CD pipelines.

- **Packaging and publishing models**: It is a common case when you need to wrap
  your machine learning model into some specific format and publish it in some
  registry. Examples include turning your ML model into a Python package and
  publishing it on PyPi, or building a docker image and pushing it to DockerHub,
  or just exporting your model to ONNX and publishing it as an artifact to
  Artifactory.

- **Deploying models**: Another common scenario is when you want to deploy your
  model in your CI/CD pipeline. MLEM can help you with that by providing a
  number of ready-to-use integrations with popular deployment platforms.

## Examples

### Build and publish

To trigger the publishing or deploying of a new version, you usually create a
Git tag that kicks off CI process. To make building and deployment process
consistent you can create and commit MLEM declaration:

```cli
$ mlem declare builder pip -c package_name=mypackagename -c target=package build-to-pip
💾 Saving builder to build-to-pip.mlem
```

And then use that declaration in CI:

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
          mlem build my-model --load build-to-pip.mlem

      - name: publish
        run: |
          sh upload_to_pypi.sh package
```

Learn more about building in [Get Started](/doc/get-started/building).

### Deploy

Example with deployment is quite similar. First you need to create environment
and deployment declaration and commit them to Git:

```cli
$ mlem declare env heroku staging
💾 Saving env to staging.mlem

$ mlem declare deployment heroku myservice -c app_name=mlem-deployed-in-ci -c model=my-model -c env=staging
💾 Saving deployment to myservice.mlem
```

Then create and commit CI pipeline, e.g. in GH Actions:

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
          mlem deployment my-model --load myservice.mlem
```

Learn more about deploying in Get Started
[Get Started](/doc/get-started/deploying).
