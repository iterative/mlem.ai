# Rabbitmq Serving

RabbitMQServer implementation

## Requirements

```bash
pip install mlem[rmq]
# or
pip install pika
```

## Examples

```python

```

## Implementation reference

### `class RabbitMQClient`

**MlemABC parent type**: `client`

**MlemABC type**: `rmq`

    Access models served with rmq server

**Fields**:

- `host: str` _(required)_ - Host of RMQ instance

- `port: int` _(required)_ - Port of RMQ instance

- `exchange: str = ""` - RMQ exchange to use

- `queue_prefix: str = ""` - Queue prefix

- `timeout: float = 0` - Time to wait for response. 0 means indefinite

---

### `class RabbitMQServer`

**MlemABC parent type**: `server`

**MlemABC type**: `rmq`

    RMQ server that consumes requests and produces model predictions
    from/to RMQ instance

**Fields**:

- `host: str` _(required)_ - Host of RMQ instance

- `port: int` _(required)_ - Port of RMQ instance

- `exchange: str = ""` - RMQ exchange to use

- `queue_prefix: str = ""` - Queue prefix
