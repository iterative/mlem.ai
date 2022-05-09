---
description: 'Learn how you can use MLEM to manage data science and machine
learning projects: version data, access it anywhere, capture data pipelines, and
manage experiments.'
---

# Get Started

Assuming MLEM is already [installed](/doc/install), let's initialize it by
running `mlem init` inside a Git project:

<details>

### ⚙️ Click if you want to follow along

If you want to try MLEM first-hand along with this tutorial, you can fork our 
[example repo](https://github.com/iterative/example-mlem-get-started). 
It's `main` branch only contains the source code we'll be using, so you can run all the commands yourself. 
 
To prepare your project, install [github cli](https://cli.github.com/) and run 

```bash
$ gh repo fork https://github.com/iterative/example-mlem-get-started
$ cd example-mlem-get-started
```

We also recommend
you to create a virtual environment to be your playground for this Get Started and install all the requiremnets there:

```console
$ python3 -m venv .env
$ source .env/bin/activate
$ pip install -r requirements
```

</details>

```bash
$ mlem init
```

A few [internal files](/doc/user-guide/project-structure) are created that
should be added to Git:

```bash
$ git add .mlem
$ git status
Changes to be committed:
        new file:   .mlem/config.yaml
        ...
$ git commit -m "Initialize MLEM"
```

Now you’re ready to MLEM!

In our
[example repository](https://github.com/iterative/example-mlem-get-started), we
have tags for each step we take in different sections of this tutorial. You can
just see what is going on there or reproduce everything yourself and compare. In
our Get Started those tags will be marked with ⛳ emoji. Just like this git tag
that concludes this section:

⛳
[MLEM init](https://github.com/iterative/example-mlem-get-started/tree/1-mlem-init)

MLEM’s features can be grouped into functional components. We’ll explore them
one by one in the next few pages:

- **[Saving models and datasets](/doc/start/saving-loading)** (try this next) is
  the base layer of MLEM for datasets and machine learning models.
- **[Packaging models](/doc/start/packaging)** describes how models can be built
  into python packages, docker images, etc.
- **[Serving models](/doc/start/serving)** shows how to create a service from
  your model
- **[Deploying models](/doc/start/deploying)** shows how you can deploy your
  model with MLEM.

More examples on how to use MLEM in different scenatios can be found in [Use Cases](/doc/use-cases) section