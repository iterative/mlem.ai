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
  or just exporting your model to onnx and publishing it as a artifact to
  Artifactory.

- **Deploying models**: Another common scenario is when you want to deploy your
  model in your CI/CD pipeline. MLEM can help you with that by providing a
  number of ready-to-use integrations with popular deployment platforms.

## Examples

### Package and publish

To trigger the publishing or deploying of a new version, you usually create a
git tag that kicks off CI process. To make packaging and deployment process
consistent you can create and commit MLEM declaration:

```mlem
$ mlem create packager pip -c package_name=mypackagename -c target=package pack-to-pip
💾 Saving packager to pack-to-pip.mlem
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

      - name: pack
        run: |
          pip3 install -r requirements.txt
          mlem pack my-model --load pack-to-pip.mlem

      - name: publish
        run: |
          sh upload_to_pypi.sh package
```

Learn more about packaging in [Get Started](/doc/get-started/packaging).

### Deploy

Example with deployment is quite similar. First you need to create environment
and deployment declaration and commit them to git:

```mlem
$ mlem create env heroku staging
💾 Saving env to staging.mlem

$ mlem create deployment heroku myservice -c app_name=mlem-deployed-in-ci -c model=my-model -c env=staging
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
          mlem deploy my-model --load myservice.mlem
```

Learn more about deploying in Get Started [Get Started](/doc/deploying).
