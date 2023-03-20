# Serving models

For online serving, you can create a server from your model. We will try out
FastAPI server. All available server implementations are listed in the nested
pages.

## Running server

To start a FastAPI server, run:

```cli
$ mlem serve fastapi --model https://github.com/iterative/example-mlem-get-started/rf
⏳️ Loading model from https://github.com/iterative/example-mlem-get-started/tree/main/models/rf.mlem
Starting fastapi server...
🖇️  Adding route for /predict
🖇️  Adding route for /predict_proba
🖇️  Adding route for /sklearn_predict
🖇️  Adding route for /sklearn_predict_proba
Checkout openapi docs at <http://0.0.0.0:8080/docs>
INFO:     Started server process [22854]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8080 (Press CTRL+C to quit)
```

The server is now running and listening for requests on the URL shown above.
Endpoints are created automatically from model methods (using the `sample_data`
provided when [saving the model](#saving-your-model)) to infer the payload
schema. You can open the [Swagger UI](http://localhost:8080/docs) in your
browser to explore the OpenAPI spec and query examples.

<admon type="info">

This requires the correct packages to be installed for the server to serve the
model. The needed requirements are inferred from the model metadata extracted
when saving it. You can read more about it in
[model codification](/doc/user-guide/basic-concepts#model-codification).

</admon>

## Making requests

Each server implementation also has its client counterpart (e.g. `HTTPClient`
for FastAPI). Clients can be used to make requests to their corresponding
Servers. Since a server also exposes the model interface description, the client
will know what methods are available and handle serialization and
deserialization for you. You can use them via `mlem apply-remote`:

```cli
$ mlem apply-remote http test_x.csv \
  --json \
  --host="0.0.0.0" \
  --port=8080
[1, 0, 2, 1, 1, 0, 1, 2, 1, 1, 2, 0, 0, 0, 0, 1, 2, 1, 1, 2, 0, 2, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1, 0, 0, 2, 1, 0]
```

Or from Python using the `mlem.api`:

```py
from mlem.api import load
from mlem.runtime.client import HTTPClient

client = HTTPClient(host="localhost", port=8080)
res = client.predict(load("test_x.csv"))
```

<details>

### Or query directly from terminal using `curl`:

```cli
$ curl -X 'POST' \
      'http://localhost:8080/predict_proba' \
      -H 'accept: application/json' \
      -H 'Content-Type: application/json' \
      -d '{
      "data": {
        "values": [
          {
            "": 0,
            "sepal length (cm)": 0,
            "sepal width (cm)": 0,
            "petal length (cm)": 0,
            "petal width (cm)": 0
          }
        ]
      }
    }'
[[0.92,0.04,0.04]]
```

</details>
