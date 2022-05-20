# Project structure

## MLEM Repo

MLEM can work with any `.mlem` files anywhere, but if you are using git it is
worth to turn your repo into a **MLEM Repo**.

Having a **MLEM Repo** will allow you to save config options and index your
objects. Also it will bring some structure to your project and help you address
objects more easily.

> Of course, you can create MLEM Repo even without git, because actually any
> path with a `.mlem` directory is considered **MLEM Repo** whether it is local,
> on github or on some cloud file storage.

Once you have **MLEM Repo**, you will be able to use API and CLI commands that
require it like `mlem ls` and `mlem config`.

## mlem init

To create **MLEM Repo**, simply run [`mlem init`](/doc/command-reference/init) or
[`mlem.api.init`](/doc/api-reference/init). It accepts path as an argument,
which defaults to current directory.

It will create `.mlem` directory and an empty `config.yaml` file inside. You can
learn more about configuration [here](/doc/user-guide/configuration).

## External objects

By default, any objects that you save into repo will be **internal**, which
means they will be saved under `.mlem/{object type}/<path you specified>`.

If you don't want this behaviour, you can specify `external` flag when saving or
set `default_external` to `True` via configuration. After that saved objects
will be **external** and they will be saved under the path you specify.

Also, they will be indexed via links under `.mlem/link/<path you specified>`.
That is needed for MLEM to keep track of all MLEM Objects in the repo.

> You can also turn this off via `link=False` flag, but in that case your object
> will not appear in `mlem ls` output for example.

## Referencing MLEM Objects

Everywhere you need to reference any saved MLEM Object, you can do so by
providing those arguments:

- `path` is path to object
- `repo` is repository to look in. This is optional
- `rev` is revision of the repository, also optional
- `fs` (API-only) fsspec FileSystem implementation to use

All of those are saved in `location` field of a MLEM Object.

If you didn't provide `repo` and/or `rev`, MLEM will try to deduce them from
`path`. `fs` is also can be deduced from `repo` or `path`. Also, if you are
referencing object in **MLEM Repo**, you can omit `.mlem/{object_type}` from
`path`.

Here is the example of how the same object can be referenced

- `path = rf, repo = https://github.com/iterative/example-mlem-get-started, rev=main` -
  classic
- `path = .mlem/model/rf, repo = https://github.com/iterative/example-mlem-get-started, rev=main` -
  can also provide full path
- `path = https://github.com/iterative/example-mlem-get-started/tree/main/rf` -
  everything could be provided via path (depends on imlpementation)
- `path = https://github.com/iterative/example-mlem-get-started/.mlem/model/rf` -
  also can omit `tree/main` since `main` is default.
- `path = rf, fs = GithubFileSystem(org="iterative", repo="example-mlem-get-started", sha="main")` -
  API only, can provide pre-configured fs
