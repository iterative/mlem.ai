# Conda Environments

Like [virtual environments](/doc/user-guide/building/venv),
[conda environments](https://docs.conda.io/projects/conda/en/latest/user-guide/concepts/environments.html)
follow the same paradigm of isolating dependencies for a package or a model.
But, they exist globally and are saved in a single location. Further, they need
not be limited to installation of python packages.

## Description

Currently, Conda based requirements cannot be determined automatically. But, one
can pass them manually.

In addition to installing conda packages, `pip` based packages (gathered from
the model) will also be installed in the `conda` environment.

## Preparation

Make sure that `conda` command line utility is installed and is accessible.

### Generating a new conda environment

```cli
$ mlem build conda --model model --target newenv --conda_reqs.0.package_name xtensor --conda_reqs.1.package_name openssl
⏳️ Loading model from model.mlem
Collecting package metadata (current_repodata.json): done
Solving environment: done

## Package Plan ##

  environment location: /path/to/envs/newenv

  added / updated specs:
    - python=3.9


The following NEW packages will be INSTALLED:

  ca-certificates    pkgs/main/osx-arm64::ca-certificates-2022.07.19-hca03da5_0 None
  certifi            pkgs/main/osx-arm64::certifi-2022.9.24-py39hca03da5_0 None
  libcxx             pkgs/main/osx-arm64::libcxx-14.0.6-h848a8c0_0 None
  libffi             pkgs/main/osx-arm64::libffi-3.4.2-hc377ac9_4 None
  ncurses            pkgs/main/osx-arm64::ncurses-6.3-h1a28f6b_3 None
  openssl            pkgs/main/osx-arm64::openssl-1.1.1q-h1a28f6b_0 None
  pip                pkgs/main/osx-arm64::pip-22.2.2-py39hca03da5_0 None
  python             pkgs/main/osx-arm64::python-3.9.13-hbdb9e5c_1 None
  readline           pkgs/main/osx-arm64::readline-8.1.2-h1a28f6b_1 None
  setuptools         pkgs/main/osx-arm64::setuptools-63.4.1-py39hca03da5_0 None
  sqlite             pkgs/main/osx-arm64::sqlite-3.39.3-h1058600_0 None
  tk                 pkgs/main/osx-arm64::tk-8.6.12-hb8d0fd4_0 None
  tzdata             pkgs/main/noarch::tzdata-2022c-h04d1e81_0 None
  wheel              pkgs/main/noarch::wheel-0.37.1-pyhd3eb1b0_0 None
  xz                 pkgs/main/osx-arm64::xz-5.2.6-h1a28f6b_0 None
  zlib               pkgs/main/osx-arm64::zlib-1.2.12-h5a0b063_3 None


Preparing transaction: done
Verifying transaction: done
Executing transaction: done
#
# To activate this environment, use
#
#     $ conda activate /path/to/envs/newenv
#
# To deactivate an active environment, use
#
#     $ conda deactivate

Retrieving notices: ...working... done
Collecting package metadata (current_repodata.json): done
Solving environment: done

## Package Plan ##

  environment location: /path/to/envs/newenv

  added / updated specs:
    - conda-forge::openssl
    - conda-forge::xtensor


The following NEW packages will be INSTALLED:

  xtensor            conda-forge/osx-arm64::xtensor-0.24.3-hf86a087_0 None
  xtl                conda-forge/osx-arm64::xtl-0.7.4-hc021e02_0 None

The following packages will be UPDATED:

  openssl              pkgs/main::openssl-1.1.1q-h1a28f6b_0 --> conda-forge::openssl-1.1.1q-h03a7124_1 None


Preparing transaction: done
Verifying transaction: done
Executing transaction: done
Retrieving notices: ...working... done
Collecting scikit-learn==1.0.2
  Using cached scikit_learn-1.0.2-cp39-cp39-macosx_12_0_arm64.whl (6.9 MB)
Collecting pandas==1.4.2
  Using cached pandas-1.4.2-cp39-cp39-macosx_11_0_arm64.whl (10.1 MB)
Collecting numpy==1.22.3
  Using cached numpy-1.22.3-cp39-cp39-macosx_11_0_arm64.whl (12.8 MB)
Collecting threadpoolctl>=2.0.0
  Using cached threadpoolctl-3.1.0-py3-none-any.whl (14 kB)
Collecting scipy>=1.1.0
  Using cached scipy-1.9.2-cp39-cp39-macosx_12_0_arm64.whl (28.6 MB)
Collecting joblib>=0.11
  Using cached joblib-1.2.0-py3-none-any.whl (297 kB)
Collecting pytz>=2020.1
  Using cached pytz-2022.4-py2.py3-none-any.whl (500 kB)
Collecting python-dateutil>=2.8.1
  Using cached python_dateutil-2.8.2-py2.py3-none-any.whl (247 kB)
Collecting six>=1.5
  Using cached six-1.16.0-py2.py3-none-any.whl (11 kB)
Installing collected packages: pytz, threadpoolctl, six, numpy, joblib, scipy, python-dateutil, scikit-learn, pandas
Successfully installed joblib-1.2.0 numpy-1.22.3 pandas-1.4.2 python-dateutil-2.8.2 pytz-2022.4 scikit-learn-1.0.2 scipy-1.9.2 six-1.16.0 threadpoolctl-3.1.0
```

If the `target` is not passed, the default name for the new environment is
`venv`.

Other options include using:

- `--python_version 3.7` -- to use a custom python version, by default it is
  inferred automatically.
- `--current_env True` -- whether to install the requirements in a currently
  activated conda environment.

While options for passing a list of conda requirements include:

- `--conda_reqs.0.package_name` -- name of the conda package
- `--conda_reqs.0.spec` -- denotes selectors for a package such as '>=1.8,<2'
  (optional)
- `--conda_reqs.0.channel_name` -- denotes the channel from which a package is
  to be installed (default is `conda-forge`)
