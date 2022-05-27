# Basic concepts

## MLEM Objects

The most important concept in MLEM is **MLEM Object**. Basically, MLEM is a
library to create, manage and use different **MLEM Objects**, such as models,
datasets and other types you can read about below.

<admon type="info">

For example, when you use `mlem.api.save()`, you create a MLEM Object from a
supported Python structure. MLEM Objects can also be created with `mlem create`.

</admon>

MLEM Objects are saved as `.mlem` files in `yaml` format. Sometimes they can
have other files attached to them, in that case we call `.mlem` file as a
"metadata file" or "metafile" and all the other files we call "artifacts".

Typically, if **MLEM Object** have only one artifact, it will have the same name
without `.mlem` extension, for example `model.mlem` + `model`, or `data.csv` +
`data.csv.mlem`.

If **MLEM Object** have multiple artifacts, they will be stored in a directory
with the same name, for example `model.mlem` + `model/data.pkl` +
`model/data2.pkl`.

<details>

### Implementation details

From a developer's perspective, MLEM Objects are instances of one of the
subclasses of `MlemMeta` class. MLEM is using extended
[pydantic](https://pydantic-docs.helpmanual.io/) functionality to save and load
them from files.

You can get `MlemMeta` instance if you use `load_meta` API method instead of
simple `load`.

See also [MLEM Object API](/doc/api-reference/mlem-object)

</details>

## Common fields

Each MLEM Object has an `object_type` field which determines the type of the
object. Specific types may additional properties, but all MLEM Objects have the
following fields:

- `description` - for storing user-provided description
- `params` - arbitrary object with additional parameters
- `tags` - list of string tags
- `location` - if the object is loaded, information about where it came from

You can check out what methods MLEM Objects have in
[API Reference](/doc/api-reference/mlem-object)

## MLEM Object Types

Here are all the builtin MLEM Object types

Model and Datasets are special types that can have artifacts, so they have two
additional fields:

- `artifacts` - a string-to-artifacts mapping, where artifact is an instance of
  [`Artifact`](/doc/user-guide/mlem-abcs#artifact) which represents a file
  stored somewhere (local/cloud/dvc cache etc)
- `requirements` - a list of
  [`Requirement`](/doc/user-guide/mlem-abcs#requirement) which are needed to use
  that object in runtime

### Model

Represents an ML model, but can be generalized to any model or even any
"function" or any "transformation", thanks to `callable`
[ModelType](/doc/user-guide/mlem-abcs#modeltype).

**Base class**: `mlem.core.objects.ModelMeta`

**Fields** (in addition to inherited):

- `model_type` (_lazy_) - [ModelType](/doc/user-guide/mlem-abcs#modeltype),
  which is polymorphic and holds metadata about model's framework, methods and
  io.

### Dataset

Represent a dataset, which can be used as an input to one of Model's methods.

**Base class**: `mlem.core.objects.DatasetMeta`

**Fields** (in addition to inherited):

- `reader` (_lazy_) - [DatasetReader](/doc/user-guide/mlem-abcs#datasetreader) -
  how to read saved files and resulting dataset metadata
- `dataset` (_transient_) -
  [`DatasetType`](/doc/user-guide/mlem-abcs#datasettype) with dataset value and
  metadata (available once data is read)

### Link

Represents a link (pointer) to another MLEM Object. More on that
[here](/doc/user-guide/linking)

**Base class**: `mlem.core.objects.MlemLink`

**Fields** (in addition to inherited):

- `path` - path to MLEM Object
- `repo` - location of MLEM Repo with referenced object
- `rev` - revision of the object
- `link_type` - type of the referenced object

### Other types

Some of the `MLEM ABCs` are also MLEM Objects.

- [Packager](/doc/user-guide/mlem-abcs#packager)
- [Target Environment](/doc/user-guide/mlem-abcs#targetenvmeta)
- [Deployment](/doc/user-guide/mlem-abcs#deploymeta)
