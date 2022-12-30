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
```

Serving a model with Streamlit automatically expose [FastAPI] endpoint as well.
You can use this if you want to have two interfaces simultaneously.

[FastAPI]: /doc/user-guide/serving/fastapi

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
