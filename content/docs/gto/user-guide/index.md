# User Guide

GTO helps you build an Artifact Registry out of your Git repository. It creates
annotated [Git tags](https://git-scm.com/book/en/v2/Git-Basics-Tagging) with a
[special format](#git-tag-message-format) in their message, and manages an
`artifacts.yaml` file. Since committing large files to Git is not a good
practice, you should consider not committing your artifacts to Git. Instead, use
[DVC](/doc/user-guide/dvc), Git-lfs, or any method commit pointers to the binary
files instead.

## Annotations in artifacts.yaml

Using Git tag to register versions and assign stages is handy, but the Git tag
itself doesn't contain path to the artifact, type of it (it could be `model` or
`dataset`), or any other information you may find useful. For simple projects
(e.g. single artifact) we can assume the details
[in a CI/CD system](#acting-in-ci-cd) downstream. But for more advanced cases,
we should codify them in the registry itself.

To keep this metadata, GTO uses `artifacts.yaml` file. Commands like
`gto annotate` and `gto remove` are used to modify it, while `gto describe`
helps get them when they're needed.

<admon type="tip">

An example of `artifacts.yaml` can be found in
[example-gto](https://github.com/iterative/example-gto/blob/main/artifacts.yaml)
repo.

</admon>

## Getting artifacts downstream

We may need to get a specific artifact version (latest or currently in stage) in
production environment to use it. GTO itself doesn't provide a way to download
an artifact, but you can use [DVC](/doc/user-guide/dvc) or
[MLEM](/doc/user-guide/mlem) to do that.

In all cases, you'll need to figure out the Git revision that you need (note
that in CI it's already defined for you - e.g. it's `GITHUB_REF` env var in
Github Actions):

```cli
# getting the Git reference for the latest version
$ gto show churn@greatest --ref
churn@v3.1.1

# for a model version in stage, that will be
$ gto show churn#prod --ref
churn@v3.0.0
```

Beside the right revision, you may need artifact `path`. If
[annotated](#annotations-in-artifactsyaml), it can be discovered by
`gto describe`:

```cli
$ gto describe churn --rev churn@v3.0.0 --path
models/churn.pkl
```

## Acting in CI/CD

Once Git tags are pushed, you can start acting in systems downstream. A popular
options is to use CI/CD (triggered when Git tags are pushed). For general
details, check out something like
[GitHub Actions](https://github.com/features/actions),
[GitLab CI/CD](https://docs.gitlab.com/ee/ci/) or
[Circle CI](https://circleci.com).

The other option is to
[configure webhooks](https://docs.github.com/en/rest/webhooks) that will send
HTTP requests to your server upon pushing Git tags to the remote.

Finally, you can configure your server to query your Git provider via something
like REST API to check if changes happened. As an example, check out
[Github REST API](https://docs.github.com/en/rest).

### Getting started with CI/CD

To act upon registrations and assignments (Git tags), you can create a simple CI
workflow. To see an example, check out
[the workflow in `example-gto` repo](https://github.com/iterative/example-gto/blob/main/.github/workflows/gto-act-on-tags.yml).
The workflow uses [the GTO GH Action](https://github.com/iterative/gto-action)
that fetches all Git tags (to correctly interpret the Registry), finds out the
`version` of the artifact that was registered, the `stage` that was assigned,
and annotations details such as `path`, `type`, `description`, etc, so you could
use them in the next steps of the CI.

### Helpful commands

If you would like to set up CI/CD, but don't want to use GTO GH Action, check
out `gto show`, `gto check-ref` and `gto describe` commands.

## Configuring GTO

To configure GTO, use file `.gto` in the root of your repo:

```yaml
# .gto config file
types: [model, dataset] # list of allowed Types
stages: [dev, stage, prod] # list of allowed Stages
```

When allowed Stages or Types are specified, GTO will check commands you run and
error out if you provided a value that doesn't exist in the config. Note, that
GTO applies the config from the workspace, so if want to apply the config from
`main` branch, you need to check it out first with `git checkout main`.

Alternatively, you can use environment variables (note the `GTO_` prefix)

```cli
$ GTO_EMOJIS=false gto show
```

## Git tag message format

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
