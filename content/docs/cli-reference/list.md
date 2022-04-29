# list
Usage:  [options] [repo]

List MLEM objects of in repo

Arguments:

  [REPO]  Repo to list from  [default: (current directory)]

Options:

	-t, --type [all|link|model|dataset|env|deployment|packager]
                                  Type of objects to list  [default: all]
	--rev TEXT                      Repo revision to use  [default: (none)]
    +l, --links / -l, --no-links    Include links  [default: l]
	--json                          Output as json
	--help                          Show this message and exit.

Examples:

    $ mlem list https://github.com/iterative/example-mlem
    $ mlem list -t models