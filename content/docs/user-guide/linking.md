# Links

If your Data Science team have a lot of different projects, it doesn't make
sense to develop them in a single repository. But for production it's good to
have a single source of truth to know what is deployed.

Mlem Links can be used to create a separate Model Registry repository, which
will consist only of links to objects in developers repositories. Links are
lightweight objects that represent MLEM Objects in other locations. You can
[reference](/doc/user-guide/project-structure#referencing-mlem-objects) links
anywhere you need to specify MLEM Object bot in API and CLI.

This way your deployment system doesn't need to know of every developer
repository. You can use different branches in MR repo to employ Git flow
processes. And via configuring permissions for this repo you can approve new
model versions for production.

<!-- TODO:
Setup 2 "research" repos and MR repo and show the process of deploying new model.
We need to give some example repo with links here and instead move everything below to User Guide for Links. And just give here a link to that User Guide
-->

<admon type="tip">

Since links are also a type of MLEM Object, they share the same internal logic.
To load an instance of `MlemLink` (and not the object it references) provide
`follow_links=False` to `load_meta` method.

</admon>

## Link structure

The content of the link is very lightweight and consists of the following
fields:

- `link_type` - type of referenced object
- location fields (except `fs`) as in
  [here](/doc/user-guide/project-structure#referencing-mlem-objects)
- [Common MLEM Object fields](/doc/user-guide/basic-concepts#common-fields),
  including `object_type="link""`

## Using links

Links can be created via `mlem link` command or `mlem.api.link()` API, as well
as the `MlemObject.make_link()` method.

<admon type="tip">

You can create relative links inside the same repository, which will basically
create an alias for that object.

</admon>

Also, since links can target specific commits, tags or branches in a versioned
repository, they can be used in a variety of different scenarios, for example to
create a [centralized Model Registry](/doc/use-cases/model-registry/mlem-mr).

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
