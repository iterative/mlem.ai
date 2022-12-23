# Configuration

## Ways to set

MLEM uses `.mlem.yaml` file to load configuration from, but it can be overridden
(or set) via corresponding env variable with `MLEM_` prefix.

Also, [`mlem config`](/doc/command-reference/config) allows you to manipulate
config.

## Options

- `additional_extensions` - comma-separated list of extension modules to
  force-load on MLEM import. None by default
- `autoload_exts` - turn on [dynamic extension loading]. Default: `True`
- `debug` - whether to run MLEM in debug mode; Sets `log_level` to `DEBUG`.
  Default: `False`
- `default_external` - whether to save objects as [external] by default. Default
  value: `False`
- `default_storage` - where to store saved artifacts by default. Should be a
  serialized `Storage` instance. The default is `LocalStorage`, which means
  "save artifacts locally".
- `emojis` - whether to show 🖇️🦉🤩🇪🇲🅾️🇯ℹ️🇸🤩🦉🖇️ in CLI output. Default: ✅
- `log_level` - logging level to use. Default: `INFO`
- `no_analytics` - whether to stop collecting usage telemetry. Default: `False`
- `state` - allows you to set the `url` for a [remote state manager].

[dynamic extension loading]:
  /doc/object-reference/extending#extension-dynamic-loading
[external]: /docs/user-guide/project-structure#External
[remote state manager]:
  /doc/user-guide/deploying#setting-up-remote-state-manager

## Extension config

Different MLEM extensions can provide additional options that you also can set
via `.mlem.yaml` file. Please refer to corresponding extension documentation.
