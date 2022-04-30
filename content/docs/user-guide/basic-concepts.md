# Basic concepts

## MLEM Objects

The most important concept in MLEM is **MLEM Object**. Basically, MLEM is a library to create, manage and use different **MLEM Objects**, such as models, datasets and other types you can read about below. 
> So, when you use `save` API method, you create MLEM Object from an arbitrary supported Python object.
> 
> Also, MLEM Objects can be created with [`mlem create`](/doc/cli-reference/create) CLI command

MLEM Objects are saved as `.mlem` files in `yaml` format. Sometimes they can have other files attached to them, in that case we call `.mlem` file as a "metadata file" or "metafile" and all the other files we call "artifacts".

<details>

### Implementation details

From a developer's perspective, MLEM Objects are instances of one of the subclasses of `MlemMeta` class. MLEM is using extended [pydantic](https://pydantic-docs.helpmanual.io/) functionality to save and load them from files.

You can get `MlemMeta` instance if you use `load_meta` API method instead of simple `load`.

See also [MLEM Object API](/doc/api-reference/mlem-object)

</details>

Each MLEM Object has `object_type` field which determines the type of the object. Different types have different additional fields and methods, but all MLEM Objects have the following fields:

- `description` - for storing user-provided description
- `params` - arbitrary object with additional parameters
- `tags` - list of string tags

> Also, when you load MLEM Object via API, it will have `location` field that holds information from where you loaded this object

## MLEM Object Types

Here are all the builting MLEM Object types

[comment]: <> (TODO: fill all of this)

### Model

### Dataset

***

Other types are metadata-only, which means they cannot have artifacts

### Link

### Packager

### Target Environment

### Deployment
