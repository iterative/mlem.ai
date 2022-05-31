# Extending

MLEM can be extended to support more model types, data types, servers, builders
and basically everything listed [here](/doc/user-guide/mlem-abcs). Most of the
builtin implementations are also extensions located in `mlem.contrib` package.
It allows MLEM to not load their code if it is not used, which is especially
cool because it means their requirements are optional.

## Implementing MlemABC

You can start extending MLEM by subclassing any of the `MlemAbc` subclass that
you need.

<details>

### You can even try to add new `MlemObject` type or new `MlemAbc` interface

But no one tried it so far ;)

</details>

Your subclass should implement all the abstract methods of the base class.

Also, it needs to define `type: ClassVar[str]` class field, which will be used
as an alias for your implementation.

<details>

### Default `type` value

By default, `type` will have `<module>.<class name>` value, but that's not very
handy to type in cli, e.g. you'll need to run
`mlem serve model my_awesome_package.submodule_of_my_awesome_package.abstract.bean.factory.MyAwesomeServerImplementation`
instead of `mlem serve model ъуъ` if you don't set `type: ClassVar = "ъуъ"` for
your class

</details>

## Entry points

For MLEM to know about your implementations, you need to register them via
[entry points](https://packaging.python.org/en/latest/specifications/entry-points/)
in your `setup.py`.

You should list all of them in the form
`{abs_name}.{type} = {module_path}:{class_name}` under `mlem.contrib` entry
point key, where

- `abs_name` is `MlemABC.abs_name` of the interface you are implementing
- `type` is a value of `type` field name of your class
- `module path` is full path to python module
- `class name` is the name of your class

You can see examples in MLEM's
[setup.py](https://github.com/iterative/mlem/blob/main/setup.py)

## Extension dynamic loading

By default, when you import MLEM or run MLEM cli commands, MLEM will not load
any extensions to minimize overhead. But that would mean that users will have to
import them manually, and we don't want that. MLEM can load extensions
dynamically, depending on what is imported in user's environment. For example,
`sklearn` extension will be loaded in one of the following cases:

1. When user imported mlem, `sklearn` module was already imported
2. After importing mlem, user imported `sklearn`
3. User loaded any object that uses any of `sklearn` extension implementation.

<admon type="info">

Some of the fields in MLEM Objects are lazy, which means that they will be
loaded only if users accesses them.

</admon>

## Subclassing MlemConfig

As part of your extension, you also can have some configuration options. For
that you can subclass `MlemConfig` class and list your options there just like
any `pydantic`
[BaseSettings](https://pydantic-docs.helpmanual.io/usage/settings/) class. In
the inner `Config` class you should set `section` option, and after that values
for your configuration will be loaded from `.mlem/config.yaml` from
corresponding section. See
[`PandasConfig`](https://github.com/iterative/mlem/blob/main/mlem/contrib/pandas.py)
for example
