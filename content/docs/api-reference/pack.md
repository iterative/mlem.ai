# pack

Pack model in docker-build-ready folder or directly build a docker image.

    Args:
        packager (Union[str, Packager]): Packager to use.
            Out-of-the-box supported string values are "docker_dir" and "docker".
        model (Union[str, ModelMeta]): The model to pack.
