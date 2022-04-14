# apply
Usage:  [options] model data

Apply a model to a dataset. Resulting dataset will be saved as MLEM object
	to `output` if it is provided, otherwise will be printed

Arguments:

	MODEL  Path to model object  [required]
	DATA   Path to dataset object  [required]

Options:

	-r, --repo TEXT           Path to MLEM repo  [default: (none)]
	--rev TEXT                Repo revision to use  [default: (none)]
	-o, --output TEXT         Where to store the outputs.
	-m, --method TEXT         Which model method is to apply  [default: predict]
	--data-repo, --dr TEXT    Repo with dataset
	--data-rev TEXT           Revision of dataset
	-i, --import              Try to import data on-the-fly
	--import-type, --it TEXT  Specify how to read data file for import
	--link / --no-link        Whether to create link for output in .mlem
                            directory
	-e, --external            Save result not in .mlem, but directly in repo
	--json                    Output as json
	--help                    Show this message and exit.

Examples:

    Apply local mlem model to local mlem dataset
    $ mlem apply mymodel mydatset --method predict --output myprediction

    Apply local mlem model to local data file
    $ mlem apply mymodel data.csv --method predict --import --import-type pandas[csv] --output myprediction

    Apply a version of remote model to a version of remote dataset
    $ mlem apply models/logreg --repo https://github.com/iterative/example-mlem --rev main
                 data/test_x --data-repo https://github.com/iterative/example-mlem --data-rev main
                 --method predict --output myprediction