---
description:
  'Learn how you can use GTO to create Artifact Registry in Git repository'
---

# Get Started

GTO helps you build an Artifact Registry on top of a Git repository. You can
register relevant versions of your files or directories (e.g. ML model releases)
from any source (other repos) and assign them to different deployment stages (testing,
shadow, production, etc.). Git-native mechanisms are used, so you can automate
the delivery of your software project with CI/CD, and adopt a GitOps approach in
general.

Assuming GTO is already [installed](/doc/gto/install) in your active Python
environment, let's clone an example [ML Model Registry] and review it with
`git show`:

[ml model registry]: /doc/use-cases/model-registry

```cli
$ git clone https://github.com/iterative/example-gto
$ cd example-gto
$ gto show
╒══════════╤══════════╤════════╤═════════╤════════════╕
│ name     │ latest   │ #dev   │ #prod   │ #staging   │
╞══════════╪══════════╪════════╪═════════╪════════════╡
│ churn    │ v3.1.1   │ v3.1.1 │ v3.0.0  │ v3.1.0     │
│ segment  │ v0.4.1   │ v0.4.1 │ -       │ -          │
│ cv-class │ v0.1.13  │ -      │ -       │ -          │
╘══════════╧══════════╧════════╧═════════╧════════════╛
```

3 artifacts (models `churn`, `segment`, and `cv-class`) and their `latest`
versions (per [SemVer](https://semver.org)) are listed. We also have 3 stages:
`dev`, `prod`, and `staging`. The model versions (if any) assigned to each stage
are shown.

## Registering a new version

Registering a version is usually done to mark significant changes to the
artifact. Let's assume this is the case for the `cv-class` model in `HEAD` and
we would like to create a new version of it:

```cli
$ gto register cv-class
Created git tag 'cv-class@v0.1.14' that registers version
To push the changes upstream, run:
    git push origin cv-class@v0.1.14

# this version will be shown in `gto show` now:
$ gto show
╒══════════╤══════════╤════════╤═════════╤════════════╕
│ name     │ latest   │ #dev   │ #prod   │ #staging   │
╞══════════╪══════════╪════════╪═════════╪════════════╡
│ churn    │ v3.1.1   │ v3.1.1 │ v3.0.0  │ v3.1.0     │
│ segment  │ v0.4.1   │ v0.4.1 │ -       │ -          │
│ cv-class │ v0.1.14  │ -      │ -       │ -          │
╘══════════╧══════════╧════════╧═════════╧════════════╛
```

## Assigning stages

Let's assume the version we just registered looks very promising, and we want to
promote it to `dev` to test it:

```cli
$ gto assign cv-class --stage dev
Created git tag 'cv-class#dev#1' that assigns stage to version 'v0.1.14'
To push the changes upstream, run:
    git push origin cv-class#dev#1

# stage assignment can be seen with `gto show`:
$ gto show
╒══════════╤══════════╤═════════╤═════════╤════════════╕
│ name     │ latest   │ #dev    │ #prod   │ #staging   │
╞══════════╪══════════╪═════════╪═════════╪════════════╡
│ churn    │ v3.1.1   │ v3.1.1  │ v3.0.0  │ v3.1.0     │
│ segment  │ v0.4.1   │ v0.4.1  │ -       │ -          │
│ cv-class │ v0.1.14  │ v0.1.14 │ -       │ -          │
╘══════════╧══════════╧═════════╧═════════╧════════════╛
```

We can push to Git repository to start a CI job!

## Act on registrations and assignments in CI/CD

GTO [uses Git tags] to register artifact versions and assign them to stages.
This means we can act upon these operations in any Git-based system such as many
CI/CD platforms.

[uses git tags]: /doc/gto/user-guide#git-tags-format

<details>

### Click to set up a working repository to try this.

Let's fork the [example-gto repo](https://github.com/iterative/example-gto) repo
(you'll need a [GitHub](https://github.com/signup) account first). For CI/CD to
start, you'll need to enable it on the "Actions" page of your fork.

1. [Fork the repo](https://github.com/iterative/example-gto/fork). Make sure you
   uncheck "Copy the `main` branch only" to copy Git tags as well:
   <img width="877" alt="image" src="https://user-images.githubusercontent.com/6797716/199275275-439335f4-6f54-4cd7-910d-fc29ad3c095c.png">

2. Enable workflows in your repo for a new Git tag to trigger CI:
   <img width="869" alt="image" src="https://user-images.githubusercontent.com/6797716/199272682-dfd628bf-9599-4e85-a623-bf4a10c3d7e1.png">

</details>

Now let's push the Git tags we created locally to your repository (don't forget
to replace `aguschin` with your username):

```cli
$ git remote update origin https://github.com/aguschin/example-gto
$ git push origin cv-class@v0.1.14 cv-class#dev#1
 * [new tag]         cv-class@v0.1.14 -> cv-class@v0.1.14
 * [new tag]         cv-class#dev#1 -> cv-class#dev#1
```

<details>

### Or just repeat the assignment for your new repo

We can do the same thing we did locally, but for your remote repo (don't forget
to replace `aguschin` with your username):

```cli
# since we didn't register a version on remote, GTO will do that for us:
$ gto assign cv-class --stage dev \
    --repo https://github.com/aguschin/example-gto
Created git tag 'cv-class@v0.1.14' that registers a version
Running `git push origin cv-class@v0.1.14`
Successfully pushed git tag cv-class@v0.1.14 on remote.
Created git tag 'cv-class#dev#1' that assigns stage to version 'v0.1.14'
Running `git push origin cv-class#dev#1`
Successfully pushed git tag cv-class#dev#1 on remote.
```

</details>

Git tags pushed trigger the
[CI workflow](https://github.com/iterative/example-gto/blob/main/.github/workflows/gto-act-on-tags.yml):

<img width="875" alt="image" src="https://user-images.githubusercontent.com/6797716/199276636-bf996ad3-7d9c-4100-9f3c-6444730e4d19.png">

"GTO: figure out what was registered/promoted" step interprets the Git tag that
triggered the workflow and passes the information to the next steps. The
information is used later to trigger "Publish" or "Deploy" steps (since the CI
on the screenshot was triggered by `cv-class#dev#1` Git tag, the "Publish" step
was skipped).

If you want to see CI examples without reproducing this Get Started, you can
check out them in
[the example-repo](https://github.com/iterative/example-gto/actions).

## What's next?

Thanks for completing this Get Started!

- Learn how to
  [specify important artifact's metainformation](/doc/gto/user-guide#annotations-in-artifactsyaml)
  like `path`, `type` and `description` in the Artifact registry.
- Learn more about [acting in CI/CD](/doc/gto/user-guide#acting-downstream) upon
  version registrations and stage assignments.
- Reach us out in [GH issues](https://github.com/iterative/gto/issues) or in
  [Discord](https://discord.com/invite/dvwXA2N) to get your questions answered!

<!-- - To use DVC with GTO, check out [DVC docs](https://dvc.org/doc).
- To deploy models upon GTO stage assignments, check out [MLEM docs](/doc/). -->
