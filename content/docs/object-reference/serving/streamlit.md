# streamlit

## `class StreamlitServer`

**MlemABC parent type**: `server`

**MlemABC type**: `streamlit`

    Streamlit UI server

**Fields**:

- `server_host: str = "0.0.0.0"` - Hostname for running FastAPI backend

- `server_port: int = 8081` - Port for running FastAPI backend

- `page_title: str = "MLEM Streamlit UI"` - Title of the page in browser

- `title: str = "MLEM Streamlit UI"` - Title of the page

- `description: str = ""` - Additional text after title

- `request_serializer: Serializer` - Serializer to use for all requests

- `response_serializer: Serializer` - Serializer to use for all responses

- `standardize: bool = False` - Use standard model interface

- `run_server: bool = True` - Whether to run backend server or use existing one

- `ui_host: str = "0.0.0.0"` - Hostname for running Streamlit UI

- `ui_port: int = 80` - Port for running Streamlit UI

- `use_watchdog: bool = True` - Install watchdog for better performance

- `template: str` - Path to alternative template for streamlit app

- `debug: bool = False` - Update app on template change
