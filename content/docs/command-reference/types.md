# types

List different implementations available for a particular MLEM type. If a
subtype is not provided, list all available MLEM types.

## Synopsis

```usage
usage: mlem types [options] [abc] [sub_type]

arguments:
[ABC]       Subtype to list implementations. List subtypes if not provided
[SUB_TYPE]  Type of `meta` subtype
```

## Description

This command can be used to see all available MLEM classes, or to list the
different implementations available for a specific `SUB_TYPE` (argument).

This can be useful, for example, to see which types of servers are supported for
hosting and serving a model (see [Examples](#examples)).

Check out [MLEM ABCs](/doc/object-reference/mlem-abcs) for a list of abstract
base classes that subclass `mlem.core.base.MlemABC`. These constitute the
building blocks of MLEM, and can be subclassed to add new functionalities and
capabilities.

## Options

- `-h, --help`: Show this message and exit.

## Examples

List MLEM abstract base classes

```cli
# List ABCs
$ mlem types
...
```

List available server implementations

```cli
$ mlem types server
['rmq', 'heroku', 'fastapi']
```

List configuration for a particular implementation

```cli
$ mlem types server fastapi
[not required] host: str = "0.0.0.0"
[not required] port: int = 8080
```
