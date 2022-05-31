---
description: 'Learn how you can use MLEM to easily manage and deploy models'
---

# Get Started

Assuming MLEM is already [installed](/doc/install) in your active python
environment, let's initialize it by running `mlem init` inside a Git project:

<details>

### ⚙️ Expand for setup instructions

If you want to follow along with this tutorial and try MLEM, you can use our
[example repo](https://github.com/iterative/example-mlem-get-started). You'll
need to [fork] it first (so you can push models). Then clone it locally:

[fork]: https://docs.github.com/en/get-started/quickstart/fork-a-repo

```cli
$ git clone <your fork>
$ cd example-mlem-get-started
```

Next let's create an isolated virtual environment to cleanly install all the
requirements (including MLEM) there:

```cli
$ python3 -m venv .venv
$ source .venv/bin/activate
$ pip install -r requirements.txt
```

</details>

```cli
$ mlem init
```

A few [internal files](/doc/user-guide/project-structure) will be created:

```cli
$ tree .mlem
.mlem
└─── config.yaml
```

Now you’re ready to MLEM!

In our
[example repository](https://github.com/iterative/example-mlem-get-started),
you'll find tags for each step we take in the different sections of this
tutorial. You can just see what is going on there or reproduce everything
yourself and compare. In the different `Get Started` sections, those tags will
be marked with ⛳ emoji. Click on it to expand the section and see the `git`
commands to run if you are following along. Just like this Git tag that
concludes this section:

<details>

# ⛳ MLEM init

Tag:
[1-mlem-init](https://github.com/iterative/example-mlem-get-started/tree/1-mlem-init)

```cli
$ git add .mlem
$ git status
Changes to be committed:
        new file:   .mlem/config.yaml
        ...
$ git commit -m "Initialize MLEM"
```

To compare your results with the tag you can also run the following

```cli
$ git diff 1-mlem-init
```

The output will be empty if you have the same files staged/committed

</details>

MLEM’s features can be grouped around those common functional use cases. We’ll
explore them one by one in the next few pages:

- **[Saving models](/doc/get-started/saving)** (try this next) is the base layer
  of MLEM for machine learning models and datasets.
- **[Applying models](/doc/get-started/applying)** explains how to load and
  apply models
- **[Exporting models (building)](/doc/get-started/building)** describes how
  models can be built into python packages, docker images, etc.
- **[Serving models](/doc/get-started/serving)** shows how to create a service
  from your model
- **[Deploying models](/doc/get-started/deploying)** shows how you can deploy
  your model with MLEM.

More examples on how to use MLEM in different scenarios can be found in
[Use Cases](/doc/use-cases) section
