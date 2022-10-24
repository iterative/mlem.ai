# Installation

To create an Artifact Registry with GTO, you only need a Git repo and GTO
package installed. There's no need to set up any services or databases, compared
to many other Model Registry offerings.

To check whether GTO is installed in your environment, run `which gto`. To check
which version is installed, run `gto --version`.

## Install as a Python library

GTO is a Python library. It works on any OS. You can install it with a package
manager like [pip](https://pypi.org/project/pip/) or
[Conda](https://docs.conda.io/en/latest/), or as a Python
[requirement](https://pip.pypa.io/en/latest/user_guide/#requirements-files).

<admon type="info">

We **strongly** recommend creating a [virtual environment] or using [pipx] to
encapsulate your local environment.

[virtual environment]: https://python.readthedocs.io/en/stable/library/venv.html
[pipx]:
  https://packaging.python.org/guides/installing-stand-alone-command-line-tools/

</admon>

```cli
$ pip install gto
```

This will install the `gto` command-line interface (CLI) and make the Python API
available for use in code.
