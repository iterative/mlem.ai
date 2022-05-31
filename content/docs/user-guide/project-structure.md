# Project structure

## MLEM Project

Any directory with a valid `.mlem/` directory is considered a **MLEM Project**.
To create one, use `mlem init` or `mlem.api.init()`. This will also create an
empty `config.yaml` (see [Configuration](/doc/user-guide/configuration)).

<admon type="info">

Some API and CLI commands like `mlem ls` and `mlem config` require this
execution context. But in general, MLEM can work with `.mlem` files anywhere.

</admon>

A common place to initialize MLEM is a data science Git repository. _MLEM
projects_ help you better structure and easily address existing data artifacts
(especially ML models). And Git allows you to version MLEM objects and
configuration options along with code.

## Internal vs. External objects

By default, any MLEM objects that you save into project will be **internal**,
which means they will be saved under `.mlem/{object type}/<path you specified>`.

To save objects anywhere, use the `external` flag when saving them or set
`default_external=True` via configuration. **External** objects will be indexed
via links under `.mlem/link/<path you specified>`.

<admon type="tip">

You can also turn this off (via the `link=False` flag), but in that case your
object will not be known to the MLEM project, for example it will not be shown
by `mlem ls`.

</admon>

## Referencing MLEM Objects

Everywhere you need to reference any saved MLEM Object, you can do so by
providing those arguments:

- `path` is path to object
- `project` is the project dir to look in. This is optional
- `rev` is revision of the project, also optional
- `fs` (API-only) fsspec FileSystem implementation to use

All of those are saved in `location` field of a MLEM Object.

If you didn't provide `project` and/or `rev`, MLEM will try to deduce them from
`path`. `fs` is also can be deduced from `project` or `path`. Also, if you are
referencing object in **MLEM Project**, you can omit `.mlem/{object_type}` from
`path`.

Here is the example of how the same object can be referenced

- `path = rf, project = https://github.com/iterative/example-mlem-get-started, rev=main` -
  classic
- `path = .mlem/model/rf, project = https://github.com/iterative/example-mlem-get-started, rev=main` -
  can also provide full path
- `path = https://github.com/iterative/example-mlem-get-started/tree/main/rf` -
  everything could be provided via path (depends on implementation)
- `path = https://github.com/iterative/example-mlem-get-started/.mlem/model/rf` -
  also can omit `tree/main` since `main` is default.
- `path = rf, fs = GithubFileSystem(org="iterative", repo="example-mlem-get-started", sha="main")` -
  API only, can provide pre-configured fs
