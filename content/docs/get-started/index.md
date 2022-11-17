---
description: 'Learn how you can use MLEM to easily manage and deploy models'
---

# Get Started

To get started, we'll start with installing the `mlem` python library containing
the sdk and cli. For the rest of the guide, we assume MLEM is already
[installed](/doc/install) in your active Python environment, as well as some
other useful packages - `pandas`, `sklearn`, `fastapi`, `uvicorn` and `docker`.

<details>

### ⚙️ Expand for set-up instructions

Let's create a separate folder and an isolated virtual environment to cleanly
install all the requirements (including MLEM):

```cli
$ mkdir mlem-get-started
$ cd mlem-get-started
$ python3 -m venv .venv
$ source .venv/bin/activate
$ pip install pandas scikit-learn mlem[fastapi,heroku]
```

That's it! you're ready to MLEM. It's that simple.

</details>

## Scenarios

To explore the basic functionalities and features MLEM provides, we suggest to
start with these simple scenarios

- **[Basic Model Management](/doc/get-started/management)** - Save & load models
  in Python and get predictions in the command line.

- **[Serving models](/doc/get-started/deploying-and-serving)** - Package your
  model, create a model server for online serving, and deploy it on the cloud.

## What's next?

That's it! Thanks for checking out the tool.

Please proceed to [Use Cases](/doc/use-cases) if you want to see high-level
scenarios MLEM can cover, or go to [User Guide](/doc/user-guide) to see more
details or short tutorials on how to use specific features of MLEM.

If you have any questions or suggestions for us, please reach us out in
[Discord](https://discord.com/channels/485586884165107732/903647230655881226) or
create a new [GitHub issue](https://github.com/iterative/mlem/issues) in our
repo 🙌.
