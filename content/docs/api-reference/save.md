# save
Saves given object to a given path

    Args:
        obj: Object to dump
        path: If not located on LocalFileSystem, then should be uri
            or `fs` argument should be provided
        repo: path to mlem repo (optional)
        dvc: Store the object's artifacts with dvc
        tmp_sample_data: If the object is a model or function, you can
            provide input data sample, so MLEM will include it's schema
            in the model's metadata
        fs: FileSystem for the `path` argument
        link: Whether to create a link in .mlem folder found for `path`
        external: if obj is saved to repo, whether to put it outside of .mlem dir
        description: description for object
        params: arbitrary params for object
        tags: tags for object
        update: whether to keep old description/tags/params if new values were not provided

    Returns:
        None
    