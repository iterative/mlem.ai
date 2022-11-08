# Serving models

If you want to serve your model online, MLEM can do that for you using FastAPI
or, for example, RabbitMQ. We'll check out how it works with FastAPI since
serving models via REST API is quite common.

## Running server

To start up a FastAPI server run:

```cli
$ mlem serve fastapi --model models/rf
⏳️ Loading model from models/rf.mlem
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

The server now runs, and listens on `http://0.0.0.0:8080` as stated in the
output.

Servers automatically create endpoints from model methods using `sample_data`
argument provided to [mlem.api.save](/doc/api-reference/save).

That's it! You can check out the other available server implementations in
[User Guide](/doc/user-guide/serving/).

## Making requests

While the model server is running, you can use your browser to open the Swagger
UI (OpenAPI) at [http://localhost:8080/docs](http://localhost:8080/docs) to
check out OpenAPI spec and query examples.

<details>

### ⚙️ Expand for a CLI inference example

You can launch requests at the running server from a terminal, Using CLI
commands like `curl` or `httpie`.

For example:

```cli
$ curl -X 'POST' \
  'http://0.0.0.0:8080/predict_proba' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "data": {
    "values": [
      {
        "sepal length (cm)": 0,
        "sepal width (cm)": 1,
        "petal length (cm)": 2,
        "petal width (cm)": 3
      }
    ]
  }
}'
[[0.47,0.24,0.29]]
```

The Swagger UI even helps to generate `curl` commands similar to the above
interactively.

</details>

When it comes to serving and inferring your model, MLEM can do even more to help
you. Not only does MLEM take care of serving, but it can also help you with
client code to query/infer the model or model server. Learn more about this in
[User Guide](/doc/user-guide/serving/).
