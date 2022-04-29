# apply
Apply provided model against provided data

    Args:
        model (ModelMeta): MLEM model.
        data (Any): Input to the model.
        method (str, optional): Which model method to use.
            If None, use the only method model has.
            If more than one is available, will fail.
        output (str, optional): If value is provided,
            assume it's path and save output there.
        link (bool): Whether to create a link to saved output in MLEM root folder.
        external (bool): Whether to save result outside mlem dir

    Returns:
        If `output=None`, returns results for given data.
            Otherwise returns None.

    