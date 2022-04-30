# Configuration

## Ways to set
MLEM uses `.mlem/config.yaml` file to load configuration from, but it can be overrided (or set) via corresponding env variable with `MLEM_` prefix.

Also, [`mlem config`](/doc/cli-reference/config) allows you to manipulate config.

## Options


- `log_level`: str = "INFO"
- `debug`: bool = False
- `no_analytics`: bool = False
- `default_storage`: Dict = {}
- `default_external`: bool = False
- `emojis`: bool = True
- `additional_extensions`: str
- `autoload_exts`: bool = True

## Extension config

Different MLEM extensions can provide addtional options that you also can set via `.mlem/config.yaml` file. Please refer to corresponding extension documentation.