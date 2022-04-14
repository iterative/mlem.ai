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

In expandable sections that start with the ⚙️ emoji, we'll be providing more
information for those trying to run the commands. It's up to you to pick the
best way to read the material — read the text (skip sections like this, and it
should be enough to understand the idea of DVC), or try to run them and get the
first hand experience.

We'll be building an NLP project from scratch together. The end result is
published on [GitHub](https://github.com/iterative/example-mlem).

Let's start with `mlem init`:

```dvc
$ mkdir example-mlem
$ cd example-mlem
$ git init
```

</details>

```dvc
$ mlem init
```

A few [internal files](/doc/user-guide/project-structure) are
created that should be added to Git:

```dvc
$ git status
Changes to be committed:
        new file:   .mlem/config.yaml
        ...
$ git commit -m "Initialize MLEM"
```

Now you're ready to MLEM!

! TODO: create referenced pages from https://www.notion.so/iterative/Tutorial-9089de99f9da4d1f8926f900c797208e

MLEM's features can be grouped into functional components. We'll explore them one
by one in the next few pages:

- [**Saving models and datasets**](/doc/start/saving-loading) (try
	this next) is the base layer of MLEM for datasets and machine
	learning models.

- [**Working with remote repos**](/doc/start/remote-repos) shows how to use
	MLEM from outside of the project and how to import objects
	from remote MLEM project. This can help to download a specific version of an
	ML model to a deployment server or import a model to another project.

- [**Packaging models**](/doc/start/packaging) describe how models can be built into python packages, docker images, etc

- [**Deploying models**](/doc/start/deployment) can
	be attached to pipelines. These let you capture, navigate, and evaluate ML
	projects without leaving Git. Think "Git for machine learning".
