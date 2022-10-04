# Data extensions

Data extensions add support for new types of data object that MLEM can covert
into MLEM data objects in [`save` API method](/doc/api-reference/save)

Typicaly they will implement [DataType](/doc/user-guide/mlem-abcs#datatype),
[DataReader](/doc/user-guide/mlem-abcs#datareader) and
[DataWriter](/doc/user-guide/mlem-abcs#datawriter) interfaces.

Some also implement [ImportHook](/doc/user-guide/mlem-abcs#importhook) to
support [importing](/doc/user-guide/importing) files of some format.
