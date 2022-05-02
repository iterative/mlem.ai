# create

Usage: [options] object_type [subtype] path

Creates new mlem object metafile from conf args and config files

Arguments:

    OBJECT_TYPE  Type of metafile to create  [required]
    [SUBTYPE]    Subtype of MLEM object  [default: ]
    PATH         Where to save object  [required]

Options:

    -c, --conf TEXT     Values for object fields in format
                      `field.nested.name=value`
    -r, --repo TEXT     Path to MLEM repo  [default: (none)]
    -e, --external      Save result not in .mlem, but directly in repo
    --link / --no-link  Whether to create link for output in .mlem directory
    --help              Show this message and exit.

Examples:

    Create heroku deployment
    $ mlem create env heroku production -c api_key=<...>
