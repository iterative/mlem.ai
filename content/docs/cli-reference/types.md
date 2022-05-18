# types

List different implementations available for a particular MLEM type. If a subtype is not provided, simply list all available MLEM types.

> For example, one might need to see which kind of servers are supported for hosting a model. We can get this information by using `mlem types server` which gives us the two server implementations i.e. `[fastapi, heroku]`

## Synopsis

```usage
usage: mlem types [options] [abc] [sub_type]
```

## Description

[MLEM ABCs](/doc/user-guide/mlem-abcs) are a list of abstract base classes that subclass the `mlem.core.base.MlemABC` class. These classes add new functionalities and capabilities to MLEM. The command `mlem types` can be used to see what all classes are available and a `subtype` can be provided as an additional argument to see the different implementations available for that `subtype`.

## Arguments

```
[SUBTYPE]    Subtype to list implementations. List subtypes if not provided
[META_TYPE]  Type of `meta` subtype
```

## Options

- `-h, --help`: Show this message and exit.

## Examples

```mlem
List ABCs
$ mlem types

List available server implementations
$ mlem types server
```
