# Pure Mlem Model Registry

If your Data Science team have a lot of different projects, it doesn't make
sense to develop them in a single repository. But for production it's good to
have a single source of truth to know what is deployed.

[Mlem Links](/doc/user-guide/linking) can be used to create a separate Model
Registry repository, which will consist only of links to objects in developers
repositories.

This way your deployment system doesn't need to know of every developer
repository.

Also, you can use different branches in MR repo to employ Git flow processes.

And via configuring permissions for this repo you can approve new model versions
for production.

<!-- TODO:
Setup 2 "research" repos and MR repo and show the process of deploying new model.
We need to give some example repo with links here and instead move everything below to User Guide for Links. And just give here a link to that User Guide
-->

## Example

Let's build an example using
[repository from Get Started](https://github.com/iterative/example-mlem-get-started).

That repo already have a `models/rf` model in it.

Let's create new repo first:

```cli
$ mkdir links-mr
$ cd links-mr
$ git init
$ mlem init
```

Let's create some links to them:

```cli
$ mlem link --sp https://github.com/iterative/example-mlem-get-started models/rf first-model
⏳️ Loading meta from https://github.com/iterative/example-mlem-get-started/tree/main/models/rf.mlem
💾 Saving link to first-model.mlem

$ mlem link --sp https://github.com/iterative/example-mlem-get-started --rev 5-deploy-meta models/rf second-model
⏳️ Loading meta from https://github.com/iterative/example-mlem-get-started/tree/5-deploy-meta/models/rf.mlem
💾 Saving link to second-model.mlem
```

We've just linked two models from the other repo. Let's check out each link:

```cli
$ cat first-model.mlem
link_type: model
object_type: link
path: models/rf.mlem
repo: https://github.com/iterative/example-mlem-get-started/
rev: main

$ cat second-model.mlem
link_type: model
object_type: link
path: models/rf.mlem
repo: https://github.com/iterative/example-mlem-get-started/
rev: 7-deploy-meta
```

Now you can commit those links, push the repo and use it as a model registry:

```cli
$ git add first-model.mlem second-model.mlem
$ git commit -m "Add links to models"
```
