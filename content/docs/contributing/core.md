# Contributing to MLEM

We welcome contributions to [MLEM](https://github.com/iterative/mlem) by the
community. See the [Contributing to the Documentation](/doc/contributing/docs)
guide if you want to fix or update the documentation or this website.

## How to report a problem

Please search [issue tracker](https://github.com/iterative/mlem/issues) before
creating a new issue (problem or an improvement request). Feel free to add
issues related to the project.

For problems with [mlem.ai](https://mlem.ai/) site please use this
[GitHub repository](https://github.com/iterative/mlem.ai/).

If you feel that you can fix or implement it yourself, please read a few
paragraphs below to learn how to submit your changes.

## Submitting changes

- Open a new issue in the
  [issue tracker](https://github.com/iterative/mlem/issues).
- Setup the [development environment](#development-environment) if you need to
  run tests or [run](#running-development-version) the MLEM with your changes.
- Fork [MLEM](https://github.com/iterative/mlem.git) and prepare necessary
  changes.
- [Add tests](#writing-tests) for your changes to `tests/`. You can skip this
  step if the effort to create tests for your change is unreasonable. Changes
  without tests are still going to be considered by us.
- [Run tests](#running-tests) and make sure all of them pass.
- Submit a pull request, referencing any issues it addresses.

We will review your pull request as soon as possible. Thank you for
contributing!

## Development environment

Get the latest development version. Fork and clone the repo:

```cli
$ git clone git@github.com:<your-username>/mlem.git
```

Make sure that you have Python 3.7 or higher installed. On macOS, we recommend
using `brew` to install Python. For Windows, we recommend an official
[python.org release](https://www.python.org/downloads/windows/).

<admon type="info">

`pip` version 20.3+ is required.

</admon>

Install MLEM in editable mode with `pip install -e ".[tests]"`. But before we do
that, we **strongly** recommend creating a
[virtual environment](https://python.readthedocs.io/en/stable/library/venv.html):

```cli
$ cd mlem
$ python3 -m venv .env
$ source .env/bin/activate
$ pip install -e ".[tests]"
```

Install coding style pre-commit hooks with:

```cli
$ pip install pre-commit
$ pre-commit install
```

That's it. You should be ready to make changes, run tests, and make commits! If
you experience any problems, please don't hesitate to ping us in our
[chat](/chat).

## Writing tests

We have unit tests in `tests/unit/` and functional tests in `tests/func/`.
Consider writing the former to ensure complicated functions and classes behave
as expected.

For specific functionality, you will need to use functional tests alongside
[pytest](https://docs.pytest.org/en/latest/) fixtures to create a temporary
directory, Git and/or MLEM repo, and bootstrap some files. See the
[`dir_helpers` module](https://github.com/iterative/dvc/blob/master/tests/conftest.py)
for some usage examples.

## Running tests

The simplest way to run tests:

```cli
$ cd mlem
$ python -m tests
```

This uses `pytest` to run the full test suite and report the result. At the very
end you should see something like this:

```cli
$ python -m tests

...

============= 434 passed, 6 skipped, 8 warnings in 131.43 seconds ==============
```

Otherwise, for each failed test you should see the following output, to help you
identify the problem:

```cli
...
[gw2] [ 84%] FAILED tests/unit/test_progress.py::TestProgressAware::test
tests/unit/test_prompt.py::TestConfirm::test_eof
tests/test_updater.py::TestUpdater::test
...
=================================== FAILURES ===================================
____________________________ TestProgressAware.test ____________________________
...
======== 1 failed, 433 passed, 6 skipped, 8 warnings in 137.49 seconds =========
```

You can pass any additional arguments to the script that will override the
default `pytest`'s scope:

To run a single test case:

```cli
$ python -m tests tests/func/test_metrics.py::TestCachedMetrics
```

To run a single test function:

```cli
$ python -m tests tests/unit/utils/test_fs.py::test_get_inode
```

To pass additional arguments:

```cli
$ python -m tests --pdb
```

## Code style guidelines (Python)

We are using [PEP8](https://www.python.org/dev/peps/pep-0008/?) and checking
that our code is formatted with [black](https://github.com/ambv/black).

For [docstrings](https://www.python.org/dev/peps/pep-0257/#what-is-a-docstring),
we try to adhere by the
[Google Python Style Guide](https://github.com/google/styleguide/blob/gh-pages/pyguide.md#38-comments-and-docstrings).

## Commit message format guidelines

Format:

```
(component): (short description)

(long description)

Fixes #(GitHub issue id).
```

Message types:

- _component_: If applicable, comma-separated list of affected component(s)
- _short description_: Short description of the patch
- _long description_: If needed, longer message describing the patch in more
  details
- _github issue id_: ID of the GitHub issue that this patch is addressing

Example:

```
remote: add support for Amazon S3

Fixes #123
```
