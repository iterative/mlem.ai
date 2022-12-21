# rabbitmq

## `class RabbitMQClient`

**MlemABC parent type**: `client`

**MlemABC type**: `rmq`

    Access models served with rmq server

**Fields**:

- `host: str` _(required)_ - Host of RMQ instance

- `port: int` _(required)_ - Port of RMQ instance

- `exchange: str = ""` - RMQ exchange to use

- `queue_prefix: str = ""` - Queue prefix

- `raw: bool = False` - Pass values as-is without serializers

- `timeout: float = 0` - Time to wait for response. 0 means indefinite

---

## `class RabbitMQServer`

**MlemABC parent type**: `server`

**MlemABC type**: `rmq`

    RMQ server that consumes requests and produces model predictions
    from/to RMQ instance

**Fields**:

- `host: str` _(required)_ - Host of RMQ instance

- `port: int` _(required)_ - Port of RMQ instance

- `exchange: str = ""` - RMQ exchange to use

- `queue_prefix: str = ""` - Queue prefix

- `request_serializer: Serializer` - Serializer to use for all requests

- `response_serializer: Serializer` - Serializer to use for all responses

- `standardize: bool = True` - Use standard model interface
