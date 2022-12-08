# fastapi

## `class FastAPIServer`

**MlemABC parent type**: `server`

**MlemABC type**: `fastapi`

    Serves model with http

**Fields**:

- `request_serializer: Serializer` - Serializer to use for all requests

- `response_serializer: Serializer` - Serializer to use for all responses

- `standardize: bool = True` - Use standard model interface

- `host: str = "0.0.0.0"` - Network interface to use

- `port: int = 8080` - Port to use
