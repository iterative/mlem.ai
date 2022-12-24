# streamlit

## `class StreamlitServer`

**MlemABC parent type**: `server`

**MlemABC type**: `streamlit`

    Streamlit UI server

**Fields**:

- `request_serializer: Serializer` - Serializer to use for all requests

- `response_serializer: Serializer` - Serializer to use for all responses

- `standardize: bool = True` - Use standard model interface

- `server_host: str = "0.0.0.0"` - Hostname for running FastAPI backend

- `server_port: int = 8080` - Port for running FastAPI backend

- `run_server: bool = True` - Whether to run backend server or use existing one

- `ui_host: str = "0.0.0.0"` - Hostname for running Streamlit UI

- `ui_port: int = 80` - Port for running Streamlit UI

- `use_watchdog: bool = True` - Install watchdog for better performance
