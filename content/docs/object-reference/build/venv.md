# venv

Create a python virtual environment using requirements gathered from a model.

## Description

`mlem` can also create virtual environments based on requirements gathered from
a model. This naturally extends the functionality of the
[`requirements builder`](/doc/object-reference/build/requirements).

### Generating a new virtual environment

```cli
$ mlem build model venv -c target="newenv"

⏳️ Loading model from model.mlem
💼 Creating virtual env newenv...
💼 Installing the required packages...
Collecting scikit-learn==1.0.2
  Using cached scikit_learn-1.0.2-cp39-cp39-macosx_12_0_arm64.whl (6.9 MB)
Collecting pandas==1.4.2
  Using cached pandas-1.4.2-cp39-cp39-macosx_11_0_arm64.whl (10.1 MB)
Collecting numpy==1.22.3
  Using cached numpy-1.22.3-cp39-cp39-macosx_11_0_arm64.whl (12.8 MB)
Collecting joblib>=0.11
  Using cached joblib-1.2.0-py3-none-any.whl (297 kB)
Collecting scipy>=1.1.0
  Using cached scipy-1.9.2-cp39-cp39-macosx_12_0_arm64.whl (28.6 MB)
Collecting threadpoolctl>=2.0.0
  Using cached threadpoolctl-3.1.0-py3-none-any.whl (14 kB)
Collecting pytz>=2020.1
  Using cached pytz-2022.4-py2.py3-none-any.whl (500 kB)
Collecting python-dateutil>=2.8.1
  Using cached python_dateutil-2.8.2-py2.py3-none-any.whl (247 kB)
Collecting six>=1.5
  Using cached six-1.16.0-py2.py3-none-any.whl (11 kB)
Installing collected packages: pytz, threadpoolctl, six, numpy, joblib, scipy, python-dateutil, scikit-learn, pandas
Successfully installed joblib-1.2.0 numpy-1.22.3 pandas-1.4.2 python-dateutil-2.8.2 pytz-2022.4 scikit-learn-1.0.2 scipy-1.9.2 six-1.16.0 threadpoolctl-3.1.0
✅  virtual environment `newenv` is ready, activate with `source newenv/bin/activate`
```

If the `target` is not passed, the default name for the new environment is
`venv`.

Other options include using:

- `-c no_cache=True` -- to disable caching while fetching packages in creation
  of the environment.
- `-c current_env=True` -- whether to install the requirements in a currently
  activated virtual environment.

## Implementation Reference
