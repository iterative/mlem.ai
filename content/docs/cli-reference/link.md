# link

Usage: [options] source target

Create link for MLEM object

Arguments:

    SOURCE  URI to object you are crating link to  [required]
    TARGET  Path to save link object  [required]

Options:

    --source-repo, --sr TEXT        Repo for source object
    --rev TEXT                      Repo revision to use  [default: (none)]
    --target-repo, --tr TEXT        Repo to save target to  [default: (none)]
    -e, --external                  Save result not in .mlem, but directly in
                                  repo
    --follow-links, --f / --no-follow-links, --nf
                                  If True, first follow links while reading
                                  {source} before creating this link.
                                  [default: follow-links]
    --absolute, --abs / --relative, --rel
                                  Which path to linked object to specify:
                                  absolute or relative.  [default: relative]
    --help                          Show this message and exit.

Examples:

    Add alias to local object
    $ mlem link my_model latest

    Add remote object to your repo without copy
    $ mlem link models/logreg --source-repo https://github.com/iteartive/example-mlem remote_model
