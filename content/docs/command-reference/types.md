# types

List different implementations available for a particular MLEM type. If a
subtype is not provided, simply list all available MLEM types.

> This can be useful, for example, if you want to see which types of servers
> are supported for hosting and serving a model. We can get those by using
> `mlem types server` command, which shows us the currently available
> server implementations: `[fastapi, heroku]`

## Synopsis

```usage
usage: mlem types [options] [abc] [sub_type]

arguments:
[ABC]       Subtype to list implementations. List subtypes if not provided
[SUB_TYPE]  Type of `meta` subtype
```

## Description

The command `mlem types` can be used to see all available MLEM classes, and a
`subtype` additional argument can be provided to list the different
implementations available for that specific `subtype`.
Check out [MLEM ABCs](/doc/user-guide/mlem-abcs) for a list of abstract base classes that
subclass the `mlem.core.base.MlemABC` abstract class. These classes define the building
blocks of MLEM, and can be subclassed to add new functionalities and capabilities.

## Options

- `-h, --help`: Show this message and exit.

## Examples

List MLEM abstract base classes
```mlem
# List ABCs
$ mlem types
...
```

List available server implementations
```mlem
$ mlem types server
['rmq', 'heroku', 'fastapi']
```

List configuration for a particular implementation
```mlem
$ mlem types server fastapi
[not required] host: str = "0.0.0.0"
[not required] port: int = 8080
```
