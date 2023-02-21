# Docker

[Docker](https://docs.docker.com/get-started/overview/) is a platform for
shipping applications in an isolated environment known as a container.

Deploying to Docker essentially means running a model inside a Docker Container
locally.

## Requirements

```cli
$ pip install mlem[docker]
# or
$ pip install docker
```

## Description

Deploying to a docker container involves 2 main steps:

1. [Build docker](/doc/user-guide/building/docker) image by running
   `docker build` under the hood.
2. Start the server inside the image by running `docker run` under the hood.

One can do this via a single line:

```cli
$ mlem deploy run docker_container deployment.mlem -m model
💾 Saving deployment to deployment.mlem
⏳️ Loading model from model.mlem
🛠 Creating docker image mlem-deploy-1666728279
  🛠 Building MLEM wheel file...
  💼 Adding model files...
  🛠 Generating dockerfile...
  💼 Adding sources...
  💼 Generating requirements file...
  🛠 Building docker image mlem-deploy-1666728279:latest...
  ✅  Built docker image mlem-deploy-1666728279:latest
✅  Container mlem-deploy-1666728455 is up
```

### Checking the docker image and container

One can check the docker image built via `docker image ls` which should give the
following output:

```
REPOSITORY               TAG      IMAGE ID       CREATED          SIZE
mlem-deploy-1666728279   latest   fad02f76dbed   19 seconds ago   734MB
...
```

and the running container with `docker container ls`:

```
CONTAINER ID   IMAGE                           COMMAND                  CREATED          STATUS          PORTS     NAMES
0aa976159580   mlem-deploy-1666728279:latest   "/bin/sh -c 'sh run.…"   26 seconds ago   Up 25 seconds             mlem-deploy-1666728455
...
```

### Configurable parameters

A lot of parameters can be configured, the full list of which can be accessed
using `mlem deploy run docker_container -h`.

## Example: running REST API service from CLI

```cli
$ mlem deploy run docker_container app.mlem -m model --server fastapi --ports.0 8080:8080
```

You can specify other [servers](/doc/user-guide/serving/) to use. Note that
`--ports.0` exposes port 8080 outside of the container. Each server typically
uses some specific port. You can check the default port by running
`mlem serve $SERVER --help`.
For some server implementations (like fastapi) you can also set explicit listening port.
The below command shows how to modify the listening port to `5000` and than map it on the host network directly on the same port:

```cli
$ mlem deploy run docker_container app.mlem -m model --server fastapi --ports.0 5000:5000 --server.port 5000
```

Note that the param name in `--server.$PARAM` that controls the port can be
different for different server implementations. Use `mlem serve $SERVER --help`
to find out the right one.
