# Model extensions

Converting a model into MLEM model enables all kind of productionization
scenarios as we have seen in [Get Started](/doc/get-started).

Model extensions add support for new ML frameworks that MLEM can recognize when
you call [`save` API method](/doc/api-reference/save) or pass a ML model to
`mlem.api` methods. Although MLEM can save a model from unknown ML framework
using `pickle`, a special extension for that framework will allow to save the
model in framework-specific format and support special features of that
framework.

Typicaly model extension will implement
[ModelType](/doc/object-reference/mlem-abcs#modeltype) and
[ModelIO](/doc/object-reference/mlem-abcs#modelio) interfaces.

Some also implement [DataType](/doc/object-reference/mlem-abcs#datatype)
interface if specific data objects are needed for model to work.
