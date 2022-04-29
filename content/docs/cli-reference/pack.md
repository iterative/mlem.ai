# pack
Usage:  [options] model [subtype]

Pack model

Arguments:

	MODEL      Path to model  [required]
	[SUBTYPE]  Type of packing. Choices: ['docker', 'docker_dir']

Options:

	-r, --repo TEXT       Path to MLEM repo  [default: (none)]
	--rev TEXT            Repo revision to use  [default: (none)]
	-l, --load TEXT       File to load packing config from
	-c, --conf TEXT       Options for packing in format `field.name=value`
	-f, --file_conf TEXT  File with options for packing in format
                        `field.name=path_to_config`
	--help                Show this message and exit.

Examples:

    Build docker image from model
    $ mlem pack mymodel docker -c server.type=fastapi -c image.name=myimage

    Create pack docker_dir declaration and build it
    $ mlem create packager docker_dir -c server=fastapi -c target=build pack_dock
    $ mlem pack mymodel --load pack_dock