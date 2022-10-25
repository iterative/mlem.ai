# Working with models

To be able to use all MLEM features, you need to turn your model into a MLEM
model first.

The easiest way to do this is to use [save](/doc/api-reference/save) API method.

```py
from mlem.api import save

save(model, "models/mymodel", sample_data=df)
```

After that you could work with your model [from CLI](/doc/command-reference) or
call [API methods](/doc/api-reference), passing down a path to the saved model.

`model` object can be any supported python object. MLEM works with all major
popular machine learning frameworks as well as arbitrary python callables.

You can find full list [here](/doc/object-reference/model) as well as additional
documentation.

For most usecases it's mandatory to provide `sample_data` argument. Typically,
it is the same data object you provide for your model `.predict` method.

MLEM uses it to infer your model's signature which will be needed to build and
deploy it later.

Additionally, MLEM will automatically infer your model requirements (including
any local code).

## Alternative ways to create MLEM model

Existing model files can be [imported](/doc/user-guide/importing).

You can also create MLEM model from your object without saving it. Use `.dump`
to save it later.

```py
from mlem.core.objects import MlemModel

mlem_model = MlemModel.from_obj(model, sample_data=df)
mlem_model.dump("models/mymodel")
```

This may be useful if you're going to work with MLEM model from API inside the
same Python process, or you want to persist it somewhere but would like to avoid
re-reading it after `mlem.api.save`.

Besides, note that you can pass both `model` and `mlem_model` to MLEM
[Python API methods](/doc/api-reference). Passing `mlem_model` make sense when
you're going to use MLEM with it model multiple times, and want to save some
time on creating a MLEM model object from scratch each time.
