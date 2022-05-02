# link

Creates MlemLink for an `source` object and dumps it if `target` is provided

    Args:
        source (Union[str, MlemMeta]): The object to create link from.
        source_repo (str, optional): Path to mlem repo where to load obj from
        rev (str, optional): Revision if object is stored in git repo.
        target (str, optional): Where to store the link object.
        target_repo (str, optional): If provided,
            treat `target` as link name and dump link in MLEM DIR
        follow_links (bool): Whether to make link to the underlying object
            if `source` is itself a link. Defaults to True.
        external (bool): Whether to save link outside mlem dir
        absolute (bool): Whether to make link absolute or relative to mlem repo

    Returns:
        MlemLink: Link object to the `source`.
