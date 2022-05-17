# Pure Mlem Model Registry

If your Data Science team have a lot of different projects, it doesn't make
sense to develop them in a single repository. But for production it's good to
have a single source of truth to know what is deployed.

[Mlem Links](/doc/user-guide/linking) can be used to create a separate Model
Registry repository, which will consist only of links to objects in developers
repositories.

This way your deployment system doesn't need to know of every developer
repository.

Also, you can use different branches in MR repo to employ gitflow-like process.

And via configuring permissions for this repo you can approve new model versions
for production.

[comment]: <> (TODO: setup 2 "research" repos and MR repo and show the process
of deploying new model (Mike). TBH, we need to give some example repo with links
here and instead move everything below to User Guide for Links. And just give
here a link to that User Guide (Alex))

## Example

Let's build an example using
[repository from Get Started](https://github.com/iterative/example-mlem-get-started).

That repo already have some models in it:

```shell
$ mlem ls https://github.com/iterative/example-mlem-get-started
Datasets:
 - test_x.csv
 - test_y.csv
 - train.csv
Models:
 - rf
Deployments:
 - myservice
Packagers:
 - pip_config
Envs:
 - staging
```

Let's create new repo first:

```shell
$ mkdir links-mr
$ cd links-mr
$ git init
$ mlem init
```

Let's create some links to them:

```
$ mlem link --sr https://github.com/iterative/example-mlem-get-started --rev main rf first-model
⏳️ Loading meta from https://github.com/iterative/example-mlem-get-started/tree/main/.mlem/model/rf.mlem
💾 Saving link to .mlem/link/first-model.mlem

$ mlem link --sr https://github.com/iterative/example-mlem-get-started --rev 7-deploy-meta rf second-model
⏳️ Loading meta from https://github.com/iterative/example-mlem-get-started/tree/7-deploy-meta/.mlem/model/rf.mlem
💾 Saving link to .mlem/link/second-model.mlem
```

We've just linked two models from the other repo. You can see both if you run:

```shell
$ mlem ls
Models:
 - first-model -> .mlem/model/rf
 - second-model -> .mlem/model/rf
```

Let's check out each link:

```shell
$ cat .mlem/link/first-model.mlem
link_type: model
object_type: link
path: .mlem/model/rf.mlem
repo: https://github.com/iterative/example-mlem-get-started/
rev: main

$ cat .mlem/link/second-model.mlem
link_type: model
object_type: link
path: .mlem/model/rf.mlem
repo: https://github.com/iterative/example-mlem-get-started/
rev: 7-deploy-meta
```

Now you can commit those links, push the repo and use it as a model registry:

```shell
$ git add .mlem/link/first-model.mlem .mlem/link/second-model.mlem
$ git commit -m "Add links to models"
```