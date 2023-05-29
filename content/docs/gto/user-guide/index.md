# User Guide

GTO and DVC help you build an Artifact Registry out of your Git repository. GTO
creates annotated [Git tags](https://git-scm.com/book/en/v2/Git-Basics-Tagging)
with a [special format](#git-tags-format), while DVC manages an
[`dvc.yaml`](https://dvc.org/doc/user-guide/project-structure/dvcyaml-files#artifacts)
file with metainformation about the artifact and stores artifact binaries.

## Annotations in dvc.yaml

Using Git tags to register artifact versions and assign stages is handy, but the
Git tag itself doesn't contain a path to the artifact files, their type (`model`
or `dataset`), or any other useful information about them. For simple projects
(e.g. a single artifact) we can assume the details whenever we consume the
artifacts (e.g. [in CI/CD](#acting-in-ci-cd)). But for more advanced cases, we
should codify them in the registry itself.

To keep this metadata,
[you can use `artifacts:` section in `dvc.yaml` file](https://dvc.org/doc/user-guide/project-structure/dvcyaml-files#artifacts).
To see an example, check out `dvc.yaml`
[in the `example-gto` repo](https://github.com/iterative/example-gto).

</admon>

## Getting artifacts in systems downstream

You may need to get a specific artifact version to a certain environment, most
likely the latest one or the one currently assigned to the stage. Use `gto show`
to find the [Git reference] (tag) you need.

[git reference]: https://git-scm.com/book/en/v2/Git-Internals-Git-References

Get the git tag for the latest version:

```cli
$ gto show churn@latest --ref
churn@v3.1.1
```

Get the git tag for the version in `prod` stage:

```cli
$ gto show churn#prod --ref
churn@v3.0.0
```

To download artifact files tracked with DVC, you can use the `dvc get` or
`dvc import` commands (or simply use `dvc pull` if you `cd` inside the repo).

```cli
$ dvc get $REPO $ARTIFACT_PATH --rev $REVISION -o $OUTPUT_PATH
```

## Acting on new registrations and assignments

A popular deployment option is to use CI/CD (triggered when Git tags are
pushed). For general details, check out something like
[GitHub Actions](https://github.com/features/actions),
[GitLab CI/CD](https://docs.gitlab.com/ee/ci/) or
[Circle CI](https://circleci.com).

The other option is to
[configure webhooks](https://docs.github.com/en/rest/webhooks) that will send
HTTP requests to your server upon pushing Git tags to the remote.

Finally, you can configure your server to query your Git provider via something
like REST API to check if changes happened. As an example, check out
[Github REST API](https://docs.github.com/en/rest).

## Getting started with CI/CD

To act upon registrations and assignments (Git tags), you can create a simple CI
workflow. To see an example, check out
[the workflow in `example-gto` repo](https://github.com/iterative/example-gto/blob/main/.github/workflows/gto-act-on-tags.yml).
The workflow uses [the GTO GH Action](https://github.com/iterative/gto-action)
that fetches all Git tags (to correctly interpret the Registry), finds out the
`version` of the artifact that was registered, the `stage` that was assigned,
and annotations details such as `path`, `type`, `description`, etc, so you could
use them in the next steps of the CI.

If you're working with GitLab or BitBucket, feel free to create an issue asking
for a similar action, or submit yours for us to add to documentation.

[env var in github actions]:
  https://docs.github.com/en/actions/learn-github-actions/environment-variables

### CI/CD workflow examples

We use MLEM in these examples, but you can use any other tool to build, publish
or deploy your models, or do any other action with your artifacts.

<toggle>
<tab title="GitHub: build a Docker image">

This workflow will build a docker image out of the model and push it to a
DockerHub.

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
        uses: iterative/gto-action@v2
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

[Learn more](/doc/user-guide/building) about building Docker images, Python
packages or preparing `docker build`-ready folders from your models with MLEM.

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
        uses: iterative/gto-action@v2
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

## Configuring GTO

To configure GTO, use file `.gto` in the root of your repo:

```yaml
# .gto config file
stages: [dev, stage, prod] # list of allowed Stages
```

When allowed Stages are specified, GTO will check commands you run and error out
if you provided a value that doesn't exist in the config. Note, that GTO applies
the config from the workspace, so if want to apply the config from `main`
branch, you need to check it out first with `git checkout main`.

Alternatively, you can use environment variables (note the `GTO_` prefix)

```cli
$ GTO_EMOJIS=false gto show
```

## Git tags format

<admon type="tip">

You can work with GTO without knowing these conventions, since
[`gto` commands](/doc/command-reference) take care of everything for you.

</admon>

All events have the standard formats of Git tags:

- `{artifact_name}@{version_number}#{e}` for version registration.
- `{artifact_name}@{version_number}!#{e}` for version deregistration.
- `{artifact_name}#{stage}#{e}` for stage assignment.
- `{artifact_name}#{stage}!#{e}` for stage unassignment.
- `{artifact_name}@deprecated#{e}` for artifact deprecation.

All of them share two parts:

1. `{artifact_name}` prefix part.
2. `#{e}` counter at the end that can be omitted (in "simple" Git tag format).

Generally, `#{e}` counter is used, because Git doesn't allow to create two Git
tags with the same name. If you want to have two Git tags that assign `dev`
stage to `model` artifact without the counter (`model#dev`), that will require
deleting the old Git tag first. Consequently, that doesn't allow you to preserve
history of events that happened.

By default, `#{e}` sometimes is omitted, sometimes not. We are setting defaults
to omit using `#{e}` when it's rarely necessary, e.g. for version registrations
and artifact deprecations.
