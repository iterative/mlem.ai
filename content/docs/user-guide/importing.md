# Importing existing files

If you already have your models/datasets saved, but want to use them as MLEM Objects, you can use [`mlem import`](/doc/cli-reference/import) or [`mlem.api.import_object`](/doc/api-reference/import_object) commands.

They will try to load the path you provided and analyze the object saved there. 

> Obviously, importing is more limited than `save` API, since MLEM do not have live python object to analyze and tries to recreate it, which may fail.

You can see list of available import implementations [here](/doc/user-guide/mlem-abcs#ImportHook).
