# RabbitMQ

[RabbitMQ](https://www.rabbitmq.com) is a widely used open source message
broker.

MLEM allows you to serve your model via RabbitMQ. This means that your model can
run as a service, consuming messages with input data and producing messages with
predictions.

## Requirements

```cli
$ pip install mlem[rmq]
# or
$ pip install pika
```
