# Python Packages

There are two builder implementations to create python packages: `pip` to create
a directory with python package from model and `whl` to create a wheel file with
python package.

## Creating Python package

To create a `build/` directory with pip package run this command:

```cli
$ mlem build pip --package_name example_mlem_get_started \
                 --target build/ --model rf
⏳️ Loading model from rf.mlem
💼 Written `example_mlem_get_started` package data to `build`
```

In this command, we specified that we want to build `rf` model with `pip`
builder and provided two arguments, `target` is the directory where the builder
will write all the files and `package_name` is the name of our package.

There are more arguments you can use, see
[object reference](/doc/object-reference/build/pip)

## Exploring Python package

Let’s see what we’ve got

```cli
$ tree build/
build/
├── MANIFEST.in
├── example_mlem_get_started
│   ├── __init__.py
│   ├── model
│   └── model.mlem
├── requirements.txt
└── setup.py
```

As you can see, the builder generated all the files necessary for a python
package. This includes sources, requirements,
[setup.py](https://docs.python.org/3/distutils/setupscript.html), and the model
itself.

## Using Python package

Now you can distribute and install the package. Its code declares all the same
methods our model had, so you can try to use it like this:

```py
import example_mlem_get_started

example_mlem_get_started.predict(df)
```

## Examples

### Creating Python package from model using API

```python
from mlem.api import build

build(builder="pip",
      model="https://github.com/iterative/example-mlem-get-started/rf",
      package_name="my_model_package",
      target="./build"
)

# ! pip install ./build
import my_model_package

data = ...
my_model_package.predict(data)
```

### Creating Python wheel package from model using CLI

```cli
$ mlem build whl \
    --package_name my_model_package
    --target ./build \
    --version 1.0.0 \
    --model https://github.com/iterative/example-mlem-get-started/rf
$ pip install ./build/my_model_package-1.0.0-py3-none-any.whl
```

### Creating wheel builder declaration and using it with CLI

```cli
$ mlem declare builder whl whl_conf \
    --package_name my_model_package \
    --target ./build \
    --author mike0sv \
    --email mike0sv@gmail.com \
    --version 1.0.0
$ mlem build --load whl_conf \
    --model https://github.com/iterative/example-mlem-get-started/rf
$ pip install ./build/my_model_package-1.0.0-py3-none-any.whl
```
