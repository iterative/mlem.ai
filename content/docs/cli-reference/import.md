# import

Usage: [options] uri target

Create MLEM model or dataset metadata from file/dir

Arguments:

    URI     File to import  [required]
    TARGET  Path whare to save MLEM object  [required]

Options:

    -r, --repo TEXT           Path to MLEM repo  [default: (none)]
    --rev TEXT                Repo revision to use  [default: (none)]
    --target-repo, --tr TEXT  Repo to save target to  [default: (none)]
    --copy / --no-copy        Whether to create a copy of file in target
                            location or just link existing file  [default:
                            copy]
    --type TEXT               Specify how to read file  [default: (auto infer)]
    --link / --no-link        Whether to create link for output in .mlem
                            directory
    -e, --external            Save result not in .mlem, but directly in repo
    --help                    Show this message and exit.

Examples:

    Create MLEM dataset from local csv
    $ mlem import data/data.csv data/imported_data --type pandas[csv]

    Create MLEM model from local pickle file
    $ mlem import data/model.pkl data/imported_model

    Create MLEM model from remote pickle file
    $ mlem import models/logreg --repo https://github.com/iterative/example-mlem --rev no-dvc data/imported_model --type pickle
