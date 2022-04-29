# serve
Usage:  [options] model [subtype]

Serve selected model

Arguments:

	MODEL      Model to create service from  [required]
	[SUBTYPE]  Server type. Choices: ['fastapi', 'heroku']  [default: ]

Options:

	-r, --repo TEXT       Path to MLEM repo  [default: (none)]
	--rev TEXT            Repo revision to use  [default: (none)]
	-l, --load TEXT       File to load server config from
	-c, --conf TEXT       Options for server in format `field.name=value`
	-f, --file_conf TEXT  File with options for server in format
                        `field.name=path_to_config`
	--help                Show this message and exit.

Examples:

    $ mlem serve https://github.com/iterative/example-mlem/models/logreg fastapi