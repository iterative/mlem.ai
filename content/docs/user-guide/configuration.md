# Configuration

## Ways to set

MLEM uses `.mlem/config.yaml` file to load configuration from, but it can be
overrided (or set) via corresponding env variable with `MLEM_` prefix.

Also, [`mlem config`](/doc/cli-reference/config) allows you to manipulate
config.

## Options

- `log_level` - logging level to use. Default `INFO`
- `debug` - wheter to run MLEM in debug mode. Sets `log_level` to `DEBUG`.
  Default `False`
- `no_analytics` - wheter to stop collecting usage telemetry. Default `False`
- `default_storage` - where to store saved artifacts by default. Should be
  serialized `Storage` instance. Default is `LocalStorage`, which means save
  artifacts locally.
- `default_external` - wheter to save objects as
  [external](/docs/user-guide/project-structure#External) by default. Default is
  `False`
- `emojis` - whether to show 💅🦉🤩🇪🇲🅾️🇯ℹ️🇸🤩🦉💅 in CLI output. Default ✅
- `additional_extensions` - comma-separated list of extension modules to
  force-load on MLEM import.
- `autoload_exts` - turn on
  [dynamic extension loading](/doc/user-guide/extending#extension-dynamic-loading).
  Default `True`

## Extension config

Different MLEM extensions can provide addtional options that you also can set
via `.mlem/config.yaml` file. Please refer to corresponding extension
documentation.
