---
description: 'Learn how you can use MLEM to easily manage and deploy models'
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
$ python3 -m venv .venv
$ source .venv/bin/activate
$ pip install -r requirements.txt
```

</details>

```bash
$ mlem init
```

A few [internal files](/doc/user-guide/project-structure) are created:


```bash
$ tree .mlem
.mlem
└─── config.yaml
```


Now you’re ready to MLEM!

In our
[example repository](https://github.com/iterative/example-mlem-get-started), we
have tags for each step we take in different sections of this tutorial. You can
just see what is going on there or reproduce everything yourself and compare. In
our Get Started those tags will be marked with ⛳ emoji. 
Click on it to see git commands if you are following along.
Just like this git tag that concludes this section:

<details>

# ⛳ [MLEM init](https://github.com/iterative/example-mlem-get-started/tree/1-mlem-init)

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

The output will be empty if you have the same files staged/commited

</details>

MLEM’s features can be grouped into functional components. We’ll explore them
one by one in the next few pages:

- **[Saving models and datasets](/doc/get-started/saving-loading)** (try this next) is
  the base layer of MLEM for datasets and machine learning models.
- **[Packaging models](/doc/get-started/packaging)** describes how models can be built
  into python packages, docker images, etc.
- **[Serving models](/doc/get-started/serving)** shows how to create a service from
  your model
- **[Deploying models](/doc/get-started/deploying)** shows how you can deploy your
  model with MLEM.

More examples on how to use MLEM in different scenatios can be found in [Use Cases](/doc/use-cases) section