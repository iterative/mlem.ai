---
description:
  'Learn how you can use GTO to create Artifact Registry in Git repository'
---

# Get Started

GTO helps you build a Artifact Registry out of your Git repository. It does so
by creating Git tags of [special format](/doc/gto/user-guide) and managing
[`artifacts.yaml` metafile](/doc/gto/user-guide). Since committing large files
to Git is not a good practice, you shouldn't commit binary files to Git.
Instead, use DVC, Git-lfs, or any method commit pointers to the binary files
instead.

This Get Started will walk you through basic GTO Artifact Registy concepts and
actions you would like to do in the Artifact Registry.

## Showing the current state

Assuming GTO is already [installed](/doc/gto/install) in your active python
environment, let's clone the example repo

```cli
$ git clone https://github.com/iterative/example-gto
$ cd example-gto
```

This repo represents a simple example of Machine Learning Model Registry. Let's
review it:

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
[assign them to stages](/doc/gto/command-reference/assign). Both functionalities
work in a similar way, so let's walkthough only one of them here.

Let's suppose the version `v0.1.13` of `cv-class` was looking very promising,
and now we want to promote it to `dev` to test it:

```cli
$ gto assign cv-class --version v0.1.13 --stage dev
Created git tag 'cv-class#dev#1' that assigns stage to version 'v0.1.13'
To push the changes upstream, run:
    git push origin cv-class#dev#1
```

GTO created a Git tag with a special format that contains
instruction to assign a stage to a version. We can push to Git repository to
start the CI, but let's ensure that changed our Registry first.

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

As we can see, the version `v0.1.13` of `cv-class` was promoted to `dev` stage.

## Acting downstream

The power of using Git tags to register versions and assign stages is simple: we
can act upon them in well-known way - in CI/CD.

To see how it works, let's fork the
[example-gto repo](https://github.com/iterative/example-gto) and push the tag we
just created to GitHub. For CI/CD to start, you'll need to enable them on the
"Actions" page of your fork.

<details>

### Step-by-step instruction

will be here

</details>

Let's do the same thing we did locally, but for your remote repo:

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

screenshot goes here

</details>

## Next steps

Thanks for completing this Get Started!

- If you want how to specify artifact's metainformation like `path`, `type` and
  `description`, check out [User Guide](/doc/gto/user-guide).
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
