# Requirements

When you have a model saved via MLEM and want to use it, the first step is to
make sure you have the right dependencies and packages. Given a model, MLEM can
get the list of requirements of different types (including Python, Unix, as well
as some others).

This complements the [checkenv](/doc/command-reference/checkenv) command.

## Pip based requirements

MLEM can export the installable requirements needed for a model using the
`mlem build` command, where `model` is the path to model saved via `mlem`

```cli
$ mlem build requirements -m model
⏳️ Loading model from sk-model.mlem
scikit-learn==1.0.2 pandas==1.4.2 numpy==1.22.3
```

Now, it can be used to install the requirements like this:

```cli
$ pip install $(mlem -q build requirements -m model)
```

where `-q` stands for the quiet mode which disables the emoji output.

One can also save these `requirements` to generate a `requirements.txt` file
using the `--target` option which allows us to pass a path of the file i.e.

```cli
$ mlem build requirements -m model --target requirements.txt
⏳️ Loading model from model.mlem
💼 Materializing requirements...
✅  Materialized to requirements.txt!
```

and now the contents of `requirements.txt` can be checked using

```cli
$ cat requirements.txt
scikit-learn==1.0.2
pandas==1.4.2
numpy==1.22.3
```

This is different from [creating a python package](/doc/user-guide/building/pip)
for the model.

## Unix based requirements

Some python libraries require unix based packages underneath to function
correctly. An example is the
[libgomp1](https://packages.debian.org/sid/libgomp1) package required by the
`lightgbm` library. `MLEM` can figure out `unix` based packages for some
supported libraries and these can be used as below:

To get a list of `unix` based requirements, use the `--req_type` option such as

`mlem build requirements -m model --req_type unix`.

The output of above can be used in conjunction like:

```cli
$ apt-get install $(mlem -q build requirements -m model --req_type unix)
```

The `--target` option is not supported for unix based requirements.

## Custom requirements

Custom requirements represent local python code such as files, zipped sources,
etc. Custom requirements always need the `--target` option since they are
materialized at the target.

For instance, a function can be saved via `MLEM` at a location `mlem-f`

```py
# func.py
def f(txt):
    print(txt)
```

```py
# save.py
from mlem.api import save
from func import f

saved = save(f, 'mlem-f')
```

and the following command could be used to materialize this custom requirement
at a target:

```cli
$ mlem build requirements -m mlem-f --req_type custom --target ./dir
⏳️ Loading model from mlem-f.mlem
💼 Materializing requirements...
✅  Materialized to ./dir!
```

The contents of `dir` can be checked using

```cli
$ ls dir
func.py
```

and with

```cli
$ cat dir/func.py
def f(txt):
    print(txt)
```

<!-- ## File requirements

File requirements represent additional files. They cannot be determined
automatically as of now. However, file requirements always need the `--target`
option. -->

## Conda requirements

Conda based requirements specify conda packages and cannot be determined
automatically as of now. In any case, the `--target` option is not supported for
it.

One can manually pass conda requirements to create conda based virtual
environments using the conda builder as discussed
[here](/doc/user-guide/building/conda).
