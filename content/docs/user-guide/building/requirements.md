# Requirements

When you have a model saved via MLEM and want to use it, the first step is to
make sure you have the right dependencies and packages. MLEM can get the list of
requirements for you automatically for some type of requirements.

## Pip based requirements

`MLEM` can export the installable requirements needed for a model using the
`mlem build requirements -m model` command, where `model` is the path to model
saved via `mlem`

```cli
$ mlem build requirements -m model
⏳️ Loading model from sk-model.mlem
scikit-learn==1.0.2 pandas==1.4.2 numpy==1.22.3
```

Thus, the output of the above can be used in conjunction with:
`pip install $(mlem -q build requirements -m model)` to install the
requirements.

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

## Unix based requirements

Some python libraries require unix based packages underneath to function
correctly. An example is the
[libgomp1](https://packages.debian.org/sid/libgomp1) package required by the
`lightgbm` library. `MLEM` can figure out `unix` based packages for some
supported libraries and these can be used as below:

To get a list of `unix` based requirements, use the `--req_type` option such as
`mlem build requirements -m model --req_type unix`.

The output of above can be used in conjunction like:
`apt-get install $(mlem -q build requirements -m model --req_type unix)`

The `--target` option is not supported for unix based requirements.

## Custom requirements

Custom requirements represent local python code such as files, zipped sources,
etc. They cannot be determined automatically as of now. However, file
requirements always need the `--target` option.

## File requirements

File requirements represent additional files. They cannot be determined
automatically as of now. However, file requirements always need the `--target`
option.

## Conda requirements

Conda based requirments specify conda packages and cannot be determined
automatically as of now. In any case, the `--target` option is not supported for
it.
