# Exporting models (building)

Building is a way to “bake” your model into something usable in production like
a Docker image, a Python package, or export your model into another format.
Let's see how it works by building a Docker image with the model.

## Building Docker image

```cli
$ mlem build docker docker-builder.mlem \
    --model models/rf --server fastapi \
    --image.name mlem-model --env.daemon.host ""
⏳️ Loading model from models/rf.mlem
🛠 Building MLEM wheel file...
💼 Adding model files...
🛠 Generating dockerfile...
💼 Adding sources...
💼 Generating requirements file...
🛠 Building docker image mlem-model:latest...
✅  Built docker image mlem-model:latest
```

`--server fastapi` option tells MLEM to use FastAPI as a
[server](/doc/user-guide/serving) for the model.

`docker-builder.mlem` is going to have a
[builder specification](/doc/user-guide/building) (we call it declaration).

## Using Docker image

Now you can distribute and run the Docker image. Let's run the container:

```cli
$ docker run mlem-model:latest
...
```

As we can see, this is just a FastAPI server. Just like we saw in
[the previous section](/doc/get-started/serving) of the Get Started, we can now
open the https://localhost:8080/docs in the browser and query the model with
`curl` or `mlem apply-remote`.
