---
description:
  'Learn how you can use GTO to create Artifact Registry in Git repository'
---

# Get Started

GTO helps you build an Artifact Registry on top of a Git repository. You can
register relevant versions of your files or directories from any source (e.g. ML
model releases) and assign them to different deployment environments (testing,
shadow, production, etc.). Git-native mechanisms are used, so you can automate
the delivery of your software project with CI/CD, and adopt a GitOps approach in
general.

This Get Started will walk you through basic GTO concepts and actions you would
like to do in the Artifact Registry.

## Showing the current state

Assuming GTO is already [installed](/doc/gto/install) in your active Python
environment, let's clone the example repo:

```cli
$ git clone https://github.com/iterative/example-gto
$ cd example-gto
```

This repo represents a simple example of Machine Learning Model Registry (that
is just a special case of an Artifact Registry for us). Let's review it:

```cli
$ gto show
╒══════════╤══════════╤════════╤═════════╤════════════╕
│ name     │ latest   │ #dev   │ #prod   │ #staging   │
╞══════════╪══════════╪════════╪═════════╪════════════╡
│ churn    │ v3.1.1   │ v3.1.1 │ v3.0.0  │ v3.1.0     │
│ segment  │ v0.4.1   │ v0.4.1 │ -       │ -          │
│ cv-class │ v0.1.13  │ -      │ -       │ -          │
╘══════════╧══════════╧════════╧═════════╧════════════╛
```

Here we have 3 models: `churn`, `segment` and `cv-class`. The latest versions of
them are shown in the column named `latest`. The latest is selected as the one
having the greatest [SemVer](https://semver.org).

Model versions could be promoted to different stages. Here we have 3 of them:
`dev`, `prod` and `staging`. When a model was never promoted to a stage, we see
`-` in the field.

## Registering versions and assigning stages

GTO can [register version](/doc/gto/command-reference/register) of artifacts and
[assign stages to them](/doc/gto/command-reference/assign). Both functionalities
work in a similar way, so let's walkthough only one of them here.

Let's assume the version `v0.1.13` of `cv-class` looks very promising, and now
we want to promote it to `dev` to test it:

```cli
$ gto assign cv-class --version v0.1.13 --stage dev
Created git tag 'cv-class#dev#1' that assigns stage to version 'v0.1.13'
To push the changes upstream, run:
    git push origin cv-class#dev#1
```

GTO created a Git tag with a special format that contains instruction to assign
a stage to a version. We can push to Git repository to start the CI, but let's
ensure that changed our Registry first.

```cli
$ gto show
╒══════════╤══════════╤═════════╤═════════╤════════════╕
│ name     │ latest   │ #dev    │ #prod   │ #staging   │
╞══════════╪══════════╪═════════╪═════════╪════════════╡
│ churn    │ v3.1.1   │ v3.1.1  │ v3.0.0  │ v3.1.1     │
│ segment  │ v0.4.1   │ v0.4.1  │ -       │ -          │
│ cv-class │ v0.1.13  │ v0.1.13 │ -       │ -          │
│ awesome  │ v0.0.1   │ -       │ -       │ -          │
╘══════════╧══════════╧═════════╧═════════╧════════════╛
```

The `gto show` output confirms our expectation.

## Acting downstream

The power of using Git tags to register versions and assign stages is simple: we
can act upon them in well-known way - in CI/CD.

<details>

### Click to set up a working repository to try this.

Let's fork the [example-gto repo](https://github.com/iterative/example-gto) repo
(you'll need a [GitHub](https://github.com/signup) account first). For CI/CD to
start, you'll need to enable it on the "Actions" page of your fork.

1. [Fork the repo](https://github.com/iterative/example-gto/fork). Make sure you
   uncheck "Copy the `main` branch only" to copy Git tags as well:
   <img width="877" alt="image" src="https://user-images.githubusercontent.com/6797716/199275275-439335f4-6f54-4cd7-910d-fc29ad3c095c.png">

2. Enable workflows in your repo, for a Git tag to trigger CI:
   <img width="869" alt="image" src="https://user-images.githubusercontent.com/6797716/199272682-dfd628bf-9599-4e85-a623-bf4a10c3d7e1.png">

</details>

Let's do the same thing we did locally, but for your remote repo. Don't forget
to replace the URL:

```cli
$ gto assign cv-class --version v0.1.13 --stage dev \
    --repo https://github.com/aguschin/example-gto
Created git tag 'cv-class#dev#1' that assigns stage to version 'v0.1.13'
Running `git push origin cv-class#dev#1`
Successfully pushed git tag cv-class#dev#1 on remote.
```

Now the CI/CD should start, and you should see that we found out: it was
`cv-class` artifact, version `v0.1.13` that was assigned to `dev` stage. Using
this information, the step `Deploy (act on assigning a new stage)` was executed
(while `Publish (act on registering a new version)` was skipped):

<details>

### CI/CD execution example

<img width="875" alt="image" src="https://user-images.githubusercontent.com/6797716/199276636-bf996ad3-7d9c-4100-9f3c-6444730e4d19.png">

If you want to see more CI examples, check out
[the example-repo](https://github.com/iterative/example-gto/actions).

</details>

## Next steps

Thanks for completing this Get Started!

- If you want how to specify artifact's metainformation like `path`, `type` and
  `description`, check out [User Guide](/doc/gto/user-guide/artifacts).
- If you want to learn about using DVC to keep your artifact binaries in remote
  storages, check out [DVC docs](https://dvc.org/doc).
- If you want to learn more about Studio, check out
  [Studio docs](https://dvc.org/doc/studio).
- If you want to learn about using MLEM to deploying your model upon GTO stage
  assignments, check out [MLEM docs](/doc/).

<!-- Adding a new artifact

We just saw how to commit a new ML model to the repo. It's saved under
`models/awesome.pkl`. Let's register the very first version of it.

```cli
$ gto register awesome
Created git tag 'awesome@v0.0.1' that registers version
To push the changes upstream, run:
    git push origin awesome@v0.0.1
```

Nice! Let's see the registry state now:

```cli
$ gto show
╒══════════╤══════════╤════════╤═════════╤════════════╕
│ name     │ latest   │ #dev   │ #prod   │ #staging   │
╞══════════╪══════════╪════════╪═════════╪════════════╡
│ churn    │ v3.1.1   │ v3.1.1 │ v3.0.0  │ v3.1.0     │
│ segment  │ v0.4.1   │ v0.4.1 │ -       │ -          │
│ cv-class │ v0.1.13  │ -      │ -       │ -          │
│ awesome  │ v0.0.1   │ -      │ -       │ -          │
╘══════════╧══════════╧════════╧═════════╧════════════╛
``` -->
