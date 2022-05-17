---
description: 'Learn how you can use MLEM to easily manage and deploy models'
---

# Get Started

Assuming MLEM is already [installed](/doc/install) in your active python environment, let's initialize it by
running `mlem init` inside a Git project:

<details>

### ⚙️ Expand for setup instructions

If you want to follow along with this tutorial and try MLEM first-hand, you can fork our 
[example repo](https://github.com/iterative/example-mlem-get-started) as a playground for running MLEM commands. 

Its `main` branch contains everything we'll be using (assuming MLEM is already installed). 
 
To prepare your project, you'll need to fork and clone it locally.
You can do it [manually](https://docs.github.com/en/get-started/quickstart/fork-a-repo) or using [github cli](https://cli.github.com/)

```bash
$ git clone <your fork>
$ cd example-mlem-get-started
# or
$ gh repo fork https://github.com/iterative/example-mlem-get-started
$ cd example-mlem-get-started
```

We strongly recommend that you to create an isolated virtual environment for this tutorial
and cleanly install all the requirements there.

Install a fresh virtual environment:
```console
$ python3 -m venv .venv
```

Activate your virtual environment:
```console
$ source .venv/bin/activate
```

Finally, Install `mlem` and the project requirements:
```console
$ pip install -r requirements.txt
```

That was pretty straightforward, right?!

</details>

```bash
$ mlem init
```

A few [internal files](/doc/user-guide/project-structure) will be created:


```bash
$ tree .mlem
.mlem
└─── config.yaml
```


Now you’re ready to MLEM!

In our
[example repository](https://github.com/iterative/example-mlem-get-started), you'll
find tags for each step we take in the different sections of this tutorial. You can
just see what is going on there or reproduce everything yourself and compare. In
the different `Get Started` sections, those tags will be marked with ⛳ emoji. 
Click on it to expand the section and see the `git` commands to run if you are following along.
Just like this git tag that concludes this section:

<details>

# ⛳ MLEM init

Tag: [1-mlem-init](https://github.com/iterative/example-mlem-get-started/tree/1-mlem-init)
```bash
$ git add .mlem
$ git status
Changes to be committed:
        new file:   .mlem/config.yaml
        ...
$ git commit -m "Initialize MLEM"
```

To compare your results with the tag you can also run the following 
```bash
$ git diff 1-mlem-init
``` 

The output will be empty if you have the same files staged/committed

</details>

MLEM’s features can be grouped around those common functional use cases. We’ll explore them
one by one in the next few pages:

- **[Saving models](/doc/get-started/saving)** (try this next) is
  the base layer of MLEM for machine learning models and datasets.
- **[Applying models](/doc/get-started/applying)** explains how to load and apply models
- **[Packaging models](/doc/get-started/packaging)** describes how models can be built
  into python packages, docker images, etc.
- **[Serving models](/doc/get-started/serving)** shows how to create a service from
  your model
- **[Deploying models](/doc/get-started/deploying)** shows how you can deploy your
  model with MLEM.

More examples on how to use MLEM in different scenarios can be found in [Use Cases](/doc/use-cases) section