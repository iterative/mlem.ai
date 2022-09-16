# Docker Builds Support

Building docker images from the model or packing all necessary things to do that
in a folder

## Requirements

```bash
pip install mlem[docker]
# or
pip install docker
```

## Examples

```python

```

## Implementation reference

### `class DockerImageBuilder`

**MlemABC parent type**: `builder`

**MlemABC type**: `docker`

    Build docker image from model

**Fields**:

- `image: DockerImage` _(required)_ - Image parameters

- `server: Server` - Server to use

- `args: DockerBuildArgs = DockerBuildArgs()` - Additional docker arguments

- `env: DockerEnv = DockerEnv()` - Where to build and push image. Defaults to
  local docker daemon

- `force_overwrite: bool = False` - Ignore existing image with same name

- `push: bool = True` - Push image to registry after it is built

---

### `class DockerDirBuilder`

**MlemABC parent type**: `builder`

**MlemABC type**: `docker_dir`

    Create a directory with docker context to build docker image

**Fields**:

- `target: str` _(required)_ - Path to save result

- `server: Server` - Server to use

- `args: DockerBuildArgs = DockerBuildArgs()` - Additional docker arguments

---

### `class DockerContainerState`

**MlemABC parent type**: `deploy_state`

**MlemABC type**: `docker_container`

    State of docker container deployment

**Fields**:

- `model_hash: str` - hash of deployed model meta

- `image: DockerImage` - Built image

- `container_name: str` - Name of container

- `container_id: str` - Started container id

---

### `class DockerContainer`

**MlemABC parent type**: `deployment`

**MlemABC type**: `docker_container`

    MlemDeployment implementation for docker containers

**Fields**:

- `server: Server` - Server to use

- `args: DockerBuildArgs = DockerBuildArgs()` - Additional docker arguments

- `state_manager: StateManager` - State manager used

- `container_name: str` - Name to use for container

- `image_name: str` - Name to use for image

- `rm: bool = True` - Remove container on stop

---

### `class DockerIORegistry`

**MlemABC parent type**: `docker_registry`

**MlemABC type**: `docker_io`

    The class represents docker.io registry.

**No fields**

---

### `class DockerRegistry`

**MlemABC parent type**: `docker_registry`

**MlemABC type**: `local`

    Registry for docker images. This is the default implementation that
    represents registry of the docker daemon

**No fields**

---

### `class RemoteRegistry`

**MlemABC parent type**: `docker_registry`

**MlemABC type**: `remote`

    DockerRegistry implementation for official Docker Registry (as in
    https://docs.docker.com/registry/)

**Fields**:

- `host: str` - Address of the registry

---

### `class DockerEnv`

**MlemABC parent type**: `env`

**MlemABC type**: `docker`

    MlemEnv implementation for docker environment

**Fields**:

- `registry: DockerRegistry = DockerRegistry()` - Default registry to push
  images to

- `daemon: DockerDaemon = host=''` - Docker daemon parameters

---

### `class DockerBuildArgs`

    Container for DockerBuild arguments

**Fields**:

- `python_version: str = "3.9.13"` - Python version to use default: version of
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
