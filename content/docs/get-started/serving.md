# Serving models

For online serving, you can create a server from your model. We will try out
FastAPI server. All available server implementations are listed
[here](/doc/object-reference/mlem-abcs#server).

## Running server

To start up FastAPI server run:

```cli
$ mlem serve rf fastapi
⏳️ Loading model from .mlem/model/rf.mlem
Starting fastapi server...
🖇️ Adding route for /predict
🖇️ Adding route for /predict_proba
🖇️ Adding route for /sklearn_predict
🖇️ Adding route for /sklearn_predict_proba
Checkout openapi docs at <http://0.0.0.0:8080/docs>
INFO:     Started server process [2917]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8080 (Press CTRL+C to quit)
```

Servers automatically create endpoints from model methods with payload schemas
corresponding to serialized dataset types.

## Making requests

You can open Swagger UI (OpenAPI) at
[http://localhost:8080/docs](http://localhost:8080/docs) to check out OpenAPI
spec and query examples.

Each server implementation also has its client implementation counterpart, in
the case of FastAPI server it’s HTTPClient. Clients can be used to make requests
to servers. Since a server also exposes the model interface description, the
client will know what methods are available and handle serialization and
deserialization for you. You can use them via CLI:

```cli
$ mlem apply-remote http test_x.csv -c host="0.0.0.0" -c port=8080 --json
[1, 0, 2, 1, 1, 0, 1, 2, 1, 1, 2, 0, 0, 0, 0, 1, 2, 1, 1, 2, 0, 2, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1, 0, 0, 2, 1, 0]
```

or via Python API:

```py
from mlem.api import load
from mlem.runtime.client.base import HTTPClient

client = HTTPClient(host="localhost", port=8080)
res = client.predict(load("test_x.csv"))
```

<details>

### 💡 Or query the model directly with curl

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
