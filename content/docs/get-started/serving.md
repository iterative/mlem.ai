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

Servers automatically create endpoints from model methods using `sample_data`
argument provided to [mlem.api.save](/doc/api-reference/save).

That's it! You can check out the other available server implementations in
[User Guide](/doc/user-guide/serving/).

## Making requests

While serving the model, you can open Swagger UI (OpenAPI) at
[http://localhost:8080/docs](http://localhost:8080/docs) to check out OpenAPI
spec and query examples.

MLEM can help you with not only serving, but also querying the model. Using MLEM
API or CLI you can send requests to your model without implementing the "client"
part. Learn more about this in [User Guide](/doc/user-guide/serving/).
