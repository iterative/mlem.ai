# clone
Usage:  [options] uri target

Download MLEM object from `uri` and save it to `target`

Arguments:

	URI     URI to object you want to clone  [required]
	TARGET  Path to store the downloaded object.  [required]

Options:

	-r, --repo TEXT           Path to MLEM repo  [default: (none)]
	--rev TEXT                Repo revision to use  [default: (none)]
	--target-repo, --tr TEXT  Repo to save target to  [default: (none)]
	-e, --external            Save result not in .mlem, but directly in repo
	--link / --no-link        Whether to create link for output in .mlem
                            directory
	--help                    Show this message and exit.

Examples:

    Copy remote model to local directory
    $ mlem clone models/logreg --repo https://github.com/iterative/example-mlem --rev main mymodel

    Copy remote model to remote MLEM repo
    $ mlem clone models/logreg --repo https://github.com/iterative/example-mlem --rev main mymodel --tr s3://mybucket/mymodel