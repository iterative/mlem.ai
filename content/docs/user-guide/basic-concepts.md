# Basic concepts

## MLEM Objects

The most important concept in MLEM is **MLEM Object**. Basically, MLEM is a
library to create, manage and use different **MLEM Objects**, such as models,
data and other [types](/doc/object-reference/mlem-objects).

<admon type="info">

For example, when you use `mlem.api.save()`, you create a MLEM Object from a
supported Python structure. MLEM Objects can also be created with
`mlem declare`.

</admon>

MLEM Objects are saved as special _metafiles_ in YAML format with the `.mlem`
extension. These may or may not have _artifacts_ (other files or directories)
associated.

Typically, if **MLEM Object** has only one artifact, it will have the same file
name without `.mlem` extension, for example `model.mlem` and `model`, or
`data.csv` and `data.csv.mlem`.

If **MLEM Object** have multiple artifacts, they will be stored in a directory
with the same name, for example `model.mlem` + `model/data.pkl` +
`model/data2.pkl`.
