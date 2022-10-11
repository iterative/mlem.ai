# Data extensions

Converting a dataset into MLEM data object enables methods like `mlem apply` as
we seen in the [User Guide](/doc/user-guide/data).

Data extensions add support for new types of data object that MLEM can convert
into MLEM data objects in [`save` API method](/doc/api-reference/save).

Typicaly they will implement
[DataType](/doc/object-reference/mlem-abcs#datatype),
[DataReader](/doc/object-reference/mlem-abcs#datareader) and
[DataWriter](/doc/object-reference/mlem-abcs#datawriter) interfaces.

Some also implement [ImportHook](/doc/object-reference/mlem-abcs#importhook) to
support [importing](/doc/user-guide/importing) files of some format.
