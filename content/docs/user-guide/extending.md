# Extending

MLEM can be extended to support more model types, datasets, servers, packagers and basically everything listed [here](/doc/user-guide/mlem-abcs).
Most of the builtin implementations are also extensions located in `mlem.contrib` package. It allows MLEM to not load their code if it is not used, which is espesially cool because it means their requirements are optional.

## Implementing MlemABC 

You can start extending MLEM by subclassing any of the `MlemAbc` subclass that you need. 

<details>

### You can even try to add new `MlemObject` type or new `MlemAbc` interface

But no one tried it so far ;)

</details>

[comment]: <> (todo: `type` field)

## Entrypoints

For MLEM to know about your implementations, you need to register them via [entrypoints](https://packaging.python.org/en/latest/specifications/entry-points/) in your `setup.py`.

You should list all of them in the form `{abs_name}.{type} = {module_path}:{class_name}` under `mlem.contrib` entrypoint key, where 
- `abs_name` is `MlemABC.abs_name` of the interface you are implementing
- `type` is a value of `type` field name of your class
- `module path` is full path to python module
- `class name` is the name of your class

You can see examples in MLEM's [setup.py](https://github.com/iterative/mlem/blob/main/setup.py)


## Extension dynamic loading

By default, when you import MLEM or run MLEM cli commands, MLEM will not load any extensions to minimize overhead. 
But that would mean that users will have to import them manually, and we don't want that. 
MLEM can load extensions dynamically, depending on what is imported in user's environment.
For example, `sklearn` extension will be loaded in one of the following cases:
1. When user imported mlem, `sklearn` module was already imported
2. After importing mlem, user imported `sklearn`
3. User loaded any object that uses any of `sklearn` extension implementation.

> Note that some of the fields in MlemObjects are lazy, which mean they will be loaded only if users accesses them.


## Subclassing MlemConfig

As part of your extension, you also can have some configuration options. 
For that you can subclass `MlemConfig` class and list your options there just like any `pydantic` [BaseSettings](https://pydantic-docs.helpmanual.io/usage/settings/) class.
In the inner `Config` class you should set `section` option, and after that values for your configuration will be loaded from `.mlem/config.yaml` from corresponding section. 
See [`PandasConfig`](https://github.com/iterative/mlem/blob/main/mlem/contrib/pandas.py) for example 
