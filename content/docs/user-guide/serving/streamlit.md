# Streamlit

[Streamlit](https://streamlit.io) is an open-source Python library that makes it
easy to create and share beautiful, custom web apps for machine learning and
data science.

MLEM can use Streamlit to expose your model to external users with a nice
auto-generated UI.

## Requirements

```cli
$ pip install mlem[streamlit]
# or
$ pip install fastapi uvicorn streamlit streamlit_pydantic
```

## Examples

### Running Streamlit model server from CLI

```cli
$ mlem serve streamlit \
  --model https://github.com/iterative/example-mlem-get-started/models/rf
⏳️ Loading model from https://github.com/iterative/example-mlem-get-started/tree/main/models/rf.mlem
Starting streamlit server...
🖇️  Adding route for /predict
🖇️  Adding route for /predict_proba
Checkout openapi docs at <http://0.0.0.0:8080/docs>
INFO:     Started server process [42223]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8080 (Press CTRL+C to quit)

  You can now view your Streamlit app in your browser.

  URL: http://0.0.0.0:80
```

Serving a model with Streamlit automatically expose
[FastAPI](/doc/user-guide/serving/fastapi) endpoint as well. You can use this if
you want to have two interfaces simultaneously.

### Running Streamlit model server from code

```python
from mlem.api import serve

serve(
    model="https://github.com/iterative/example-mlem-get-started/models/rf",
    server="streamlit",
    server_port=8080,
    ui_port=80,
)
```

Note that if your model consume a sequence of items or sequence-like object
(such as `pandas.DataFrame`), Streamlit UI will expect to receive a single item
from that list (e.g. `pandas.Series`).

<admon type="tip">

The `streamlit` UI is served on port 80 by default which requires special
privileges in Linux/Unix. You can specify a custom `ui_port` in CLI or `serve`
call to avoid this problem.

</admon>
