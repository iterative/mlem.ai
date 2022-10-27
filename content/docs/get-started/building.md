# Building models

Building is a way to “bake” your model into something usable in production like
a Docker image, a Python package, or export your model into another format.

Building may use Serving functionality under the hood: e.g. if you build a
Docker image with a model, MLEM can add FastAPI or RabbitMQ there so you can
online serving as well.

Let's see how it works by building a Docker image with the model.

## Building Docker image

```cli
$ mlem build docker docker-builder.mlem \
    --model models/rf \
    --image.name mlem-model
⏳️ Loading model from models/rf.mlem
🛠 Building MLEM wheel file...
💼 Adding model files...
🛠 Generating dockerfile...
💼 Adding sources...
💼 Generating requirements file...
🛠 Building docker image mlem-model:latest...
✅  Built docker image mlem-model:latest
```

`docker-builder.mlem` is going to have a
[builder specification](/doc/user-guide/building) (we call it declaration).

<details>

### `$ cat docker-builder.mlem`

```yaml
image:
  name: rf-docker
object_type: builder
server:
  type: fastapi
type: docker
```

</details>

## Using Docker image

Now you can distribute and run the Docker image. Let's run the container:

```cli
$ docker run -p 8080:8080 mlem-model:latest
Starting fastapi server...
🖇️  Adding route for /predict
🖇️  Adding route for /predict_proba
🖇️  Adding route for /sklearn_predict
🖇️  Adding route for /sklearn_predict_proba
Checkout openapi docs at <http://0.0.0.0:8080/docs>
INFO:     Started server process [16696]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8080 (Press CTRL+C to quit)
```

As we can see, this is just a FastAPI server. Just like we saw in
[the previous section](/doc/get-started/serving) of the Get Started, we can now
open the https://localhost:8080/docs in the browser and query the model with
`curl` or `mlem apply-remote`.
