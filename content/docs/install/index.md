# Installation

To check whether MLEM is installed in your environment, run `which mlem`.
To check which version is installed, run `mlem --version`.

## Install as a Python library

MLEM is a Python library. You can simply install it with a package manager
like `pip` or `conda`, and as a Python
[project requirement](https://pip.pypa.io/en/latest/user_guide/#requirements-files)
if needed.

We recommend always using a virtual environment for installing python packages.

Let's create one:
```console
$ python3 -m venv .venv
```

Next, activate your virtual environment:
```console
$ source .venv/bin/activate
```

And finally, install the `mlem` package using `pip`
```bash
$ pip install mlem
```

[comment]: <> (## Advanced options)

[comment]: <> (- Shell completion can be configured # TODO)
