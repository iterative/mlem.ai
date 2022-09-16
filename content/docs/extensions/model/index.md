# Model extensions

Model extensions add support for new types models that MLEM can covert into MLEM
model objects in [`save` API method](/doc/api-reference/save)

Typicaly they will implement [ModelType](/doc/user-guide/mlem-abcs#modeltype)
and [ModelIO](/doc/user-guide/mlem-abcs#modelio) interfaces.

Some also implement [DataType](/doc/user-guide/mlem-abcs#datatype) interface if
specific data objects are needed for model to work.