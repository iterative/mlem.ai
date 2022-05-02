# load_meta

Load MlemMeta object

    Args:
        path (str): Path to the object. Could be local path or path inside a git repo.
        repo (Optional[str], optional): URL to repo if object is located there.
        rev (Optional[str], optional): revision, could be git commit SHA, branch name or tag.
        follow_links (bool, optional): If object we read is a MLEM link, whether to load the
            actual object link points to. Defaults to True.
        load_value (bool, optional): Load actual python object incorporated in MlemMeta object. Defaults to False.
        fs: filesystem to load from. If not provided, will be inferred from path
        force_type: type of meta to be loaded. Defaults to MlemMeta (any mlem meta)
    Returns:
        MlemMeta: Saved MlemMeta object
