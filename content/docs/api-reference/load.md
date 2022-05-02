# load

Load python object saved by MLEM

    Args:
        path (str): Path to the object. Could be local path or path inside a git repo.
        repo (Optional[str], optional): URL to repo if object is located there.
        rev (Optional[str], optional): revision, could be git commit SHA, branch name or tag.
        follow_links (bool, optional): If object we read is a MLEM link, whether to load the
            actual object link points to. Defaults to True.

    Returns:
        Any: Python object saved by MLEM
