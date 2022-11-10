# Serving extensions

`mlem serve` functionality is used to spin up something that can serve models,
like a FastAPI server or RabbitMQ producer/consumer. See
[User Guide](/doc/user-guide/serving) for more details on how this works.

Serving extensions add new types of servers to use with `serve`
[API](/doc/api-reference/serve) and [CLI](/doc/command-reference/serve)
commands.

Typicaly they will implement [Server](/doc/object-reference/mlem-abcs#builder)
and [Client](/doc/object-reference/mlem-abcs#client) interfaces.
