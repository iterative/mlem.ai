# Docker

Building a docker image from the model or preparing a folder ready for running
`docker build` in it.

## Requirements

```bash
pip install mlem[docker]
# or
pip install docker
```

If you want to build images locally, you may want to install
[Docker Desktop](https://www.docker.com/products/docker-desktop/).

## Preparing a model for running `docker build`

In the [parent page](/doc/user-guide/building) we've seen how to build a Docker
Image for a model using a pre-configured builder. Now let's see how this docker
image is built.

To run `docker build` you need to prepare a folder with a `Dockerfile` and all
necessary content (like a model itself). This is what MLEM does under the hood
as a first step inside of `mlem build docker`. For your convenience, this
functionality is exposed as a separate builder:

```cli
$ mlem build docker_dir --model models/rf \
    --server fastapi --target build
⏳️ Loading model from models/rf.mlem
🛠 Building MLEM wheel file...
💼 Adding model files...
🛠 Generating dockerfile...
💼 Adding sources...
💼 Generating requirements file...
```

Now everything is ready and written to `build/`.

## Exploring folder structure

```cli
$ tree build/
build/
├── Dockerfile                   # instructions for `docker build`
├── mlem-0.2.9-py3-none-any.whl  # requirements to use the model
├── mlem_requirements.txt        # requirements to install MLEM
├── model                        # model binary
├── model.mlem                   # MLEM model metafile
├── requirements.txt             # requirements to run the model
├── run.sh                       # script that runs `mlem serve`
└── server.yaml                  # MLEM server configuration
```

As you can see, the builder generated everything needed to build a Docker image:
Dockerfile, model, requirements, and so on. Now we can execute MLEM build to
build an actual Docker image:

```cli
$ docker build . -t mlem-model:latest
[+] Building 70.7s (14/14) FINISHED
 => [internal] load build definition from Dockerfile                   0.1s
 => => transferring dockerfile: 533B                                   0.0s
 => [internal] load .dockerignore                                      0.1s
 => => transferring context: 2B                                        0.0s
 => [internal] load metadata for docker.io/library/python:3.9.5-slim   0.0s
 => [1/9] FROM docker.io/library/python:3.9.5-slim                     0.1s
 => [internal] load build context                                      0.1s
 => => transferring context: 487.14kB                                  0.1s
 => [2/9] WORKDIR /app                                                 0.1s
 => [3/9] COPY requirements.txt .                                      0.0s
 => [4/9] RUN pip install -r requirements.txt                         44.1s
 => [5/9] COPY mlem_requirements.txt .                                 0.0s
 => [6/9] RUN pip install -r mlem_requirements.txt                    21.4s
 => [7/9] COPY mlem-0.2.9.dev14+gf47bf34-py3-none-any.whl .            0.0s
 => [8/9] RUN pip install mlem-0.2.9.dev14+gf47bf34-py3-none-any.whl   1.8s
 => [9/9] COPY . ./                                                    0.0s
 => exporting to image                                                 2.8s
 => => exporting layers                                                2.8s
 => => writing image sha256:f449c1a69bc4566f61624d75481bf06c52164f05   0.0s
 => => naming to docker.io/library/mlem-model:latest                   0.0s
```

## Running container with a Docker image

```cli
$ docker run -p 8080:8080 mlem-model:latest
...
```

Since we're serving the model with FastAPI, now you can open
http://localhost:8080/docs in your browser and see the OpenAPI spec.
