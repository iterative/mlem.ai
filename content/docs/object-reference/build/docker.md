# docker

## `class DockerDirBuilder`

**MlemABC parent type**: `builder`

**MlemABC type**: `docker_dir`

    Create a directory with docker context to build docker image

**Fields**:

- `target: str` _(required)_ - Path to save result

- `server: Server` - Server to use

- `args: DockerBuildArgs = DockerBuildArgs()` - Additional docker arguments

---

## `class DockerImageBuilder`

**MlemABC parent type**: `builder`

**MlemABC type**: `docker`

    Build docker image from model

**Fields**:

- `image: DockerImageOptions` _(required)_ - Image parameters

- `server: Server` - Server to use

- `args: DockerBuildArgs = DockerBuildArgs()` - Additional docker arguments

- `daemon: DockerDaemon = DockerDaemon()` - Docker daemon to use

- `force_overwrite: bool = True` - Ignore existing image with same name

- `push: bool = True` - Push image to registry after it is built

---

## `class DockerBuildArgs`

    Container for DockerBuild arguments

**Fields**:

- `python_version: str = "3.9.5"` - Python version to use default: version of
  running interpreter

- `run_cmd: str = "sh run.sh"` - command to run in container

- `package_install_cmd: str = "apt-get update && apt-get -y upgrade && apt-get install --no-install-recommends -y"` -
  command to install packages. Default is apt-get, change it for other package
  manager

- `package_clean_cmd: str = "&& apt-get clean && rm -rf /var/lib/apt/lists/*"` -
  command to clean after package installation

- `mlem_whl: str` - a path to mlem .whl file. If it is empty, mlem will be
  installed from pip

- `platform: str` - platform to build docker for, see
  docs.docker.com/desktop/multi-arch/
