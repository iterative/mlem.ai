---
description: 'Learn how you can use MLEM to manage data science and machine
learning projects: version data, access it anywhere, capture data pipelines, and
manage experiments.'
---

# Get Started

Assuming MLEM is already [installed](/doc/install), let's initialize it by
running `mlem init` inside a Git project:

<details>

### ⚙️ Expand to prepare the project.
    
    
In expandable sections that start with the ⚙️ emoji, we’ll be providing more information for those trying to run the commands. It’s up to you to pick the best way to read the material — read the text (skip sections like this, and it should be enough to understand the idea of MLEM), or try to run them and get the first-hand experience.

We’ll be building an example project from scratch together. The end result is published on [GitHub](https://github.com/iterative/example-mlem-get-started).

Let’s start with `git init`:

```bash
$ mkdir example-mlem-get-started
$ cd example-mlem-get-started
$ git init
```

If you don’t want to install MLEM in your default Python env, we also recommend you to create a virtual environment to be your playground for this Get Started:

```bash
$ virtualenv -p python3 .env
$ source .env/bin/activate
$ pip install mlem
```
</details>

```bash
$ mlem init
```

A few [internal files](/doc/user-guide/project-structure) are created that should be added to Git:

```bash
$ git add .mlem
$ git status
Changes to be committed:
        new file:   .mlem/config.yaml
        ...
$ git commit -m "Initialize MLEM"
```

Now you’re ready to MLEM!

In our [example repository](https://github.com/iterative/example-mlem-get-started), we have tags for each step we take in different sections of this tutorial. You can just see what is going on there or reproduce everything yourself and compare. In our Get Started those tags will be marked with ⛳ emoji. Just like this git tag that concludes this section:

⛳ [MLEM init](https://github.com/iterative/example-mlem-get-started/tree/1-mlem-init)

MLEM’s features can be grouped into functional components. We’ll explore them one by one in the next few pages:

- **[Saving models and datasets](/doc/start/saving-loading)** (try this next) is the base layer of MLEM for datasets and machine learning models.
- **[Working with remote repositories](/doc/start/remote-repos)** shows how to use MLEM from outside of the project and how to import objects from remote MLEM projects. This can help to download a specific version of an ML model to a deployment server or import a model to another project.
- **[Versioning MLEM objects with DVC](/doc/start/working-with-dvc)** is needed if your files are too big for git or you are already using DVC.
- **[Packaging models](/doc/start/packaging)** describes how models can be built into python packages, docker images, etc.
- **[Serving models](/doc/start/serving)** shows how to create a service from your model
- **[Deploying models](/doc/start/deploying)** shows how you can deploy your model with MLEM.