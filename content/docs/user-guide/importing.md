# Importing existing files

If you already have your models/data saved, but want to use them as MLEM
Objects, you can use [`mlem import`](/doc/command-reference/import) command or
[`mlem.api.import_object`](/doc/api-reference/import_object) API.

They will try to load the path you provided and analyze the object saved there.

<admon type="warn">

Importing is more limited than `mlem.api.save()`. This is because MLEM does not
have a live Python object to analyze and tries to recreate it, which may fail.

</admon>

You can see list of available import implementations
[here](/doc/user-guide/mlem-abcs#importhook).
