# pprint

Usage: [options] path

Print specified MLEM object

Arguments:

    PATH  Path to object  [required]

Options:

    -r, --repo TEXT     Path to MLEM repo  [default: (none)]
    --rev TEXT          Repo revision to use  [default: (none)]
    -f, --follow-links  If specified, follow the link to the actual object.
    --json              Output as json
    --help              Show this message and exit.

Examples:

    Print local object
    $ mlem pprint mymodel

    Print remote object
    $ mlem pprint https://github.com/iterative/example-mlem/models/logreg
