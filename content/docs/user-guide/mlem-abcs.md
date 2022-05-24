# MLEM ABCs

MLEM has a number of abstract base classes that anyone can implement to
[extend](/doc/user-guide/extending) to add new capabilities to MLEM.

<details>

### Internal details

Each abstract base class in this list is a subclass of `mlem.core.base.MlemABC`
class, which is a subclass of pydantic `BaseModel` with additional polymorphic
magic.

That means that all subclasses are also `BaseModel`s and should be serializable.
This way MLEM can save/load them as part of the other objects or configure them
via `-c` notation in CLI.

</details>

> Fields marked as **transient** are used to hold some operational object and
> are not saved when you dump the objects. After loading objects with such
> fields they will be empty until you somehow "load" the object.

> Fields marked as **lazy** are used to hold implementation-related objects and
> are not deserialized right away when you load parent object. This helps avoid
> `ImportError` if you do not have dependencies required for undelying
> implementation, or just to avoid unneccessary imports. The field value will be
> loaded when you try to access it. If you don't want to load it, you can access
> unserialized data in `<field_name>_raw` field.

Here is the list of all MLEM ABCs.

# General

## MlemMeta

Represents a **[MLEM Object](/doc/user-guide/basic-concepts)**

**Base class**: `mlem.core.objects.MlemMeta`

For more info and list of subtypes look
[here](/doc/user-guide/basic-concepts#mlem-object-types)

## Requirement

Represents different types of requirements for MLEM Object.

**Base class**: `mlem.core.requirements.Requirement`

Implementations:

- `installable` - a python requirement typcally installed through `pip`. Can
  have specific version and alternative package name. Default type
- `custom` - a python requirement in a form of a local `.py` file or a python
  package. Contains name and source code for the module/package
- `unix` - unix package typically installed through `apt` or `yum`

## ImportHook

Represents some file format that MLEM can try to
[import](/doc/user-guide/importing).

**Base class**: `mlem.core.import_objects.ImportHook`

Implementations:

- `pickle` - simply unpickle the contens of file and use default MLEM object
  analyzer. Works with pickle files
- `pandas` - try to read a file into `pandas.DataFrame`. Works with files saved
  with pandas in formats like
  `csv, json, excel, parquet, feather, stata, html, parquet`. Some formats
  require additional dependencies.

# Models

## ModelType

This class is basically a wrapper for all Model classes of different libraries.
Yes, yet another standard. If you want to add support for your ML Model in MLEM,
this is what you implement!

**Base class**: `mlem.core.model.ModelType`

> This class is polymorphic, which means it can have more fields depending on
> implementation.

**Fields**:

- `io` - an instance of [`ModelIO`](#modelio), a way to save and load the model
- `method` - a string-to-signature mapping which holds information about
  available model methods
- `model` (_transient_) - will hold the actual model object, if it was loaded

There are implementations of this class for all supported libraries: `xgboost`,
`catboost`, `lightgbm`, `torch`, `sklearn`.

The one notable implementation is `callable`: it treats any python callable
object as a model with a single method `__call__`. That means you can turn
functions and class methods into MLEM Models as well!

## ModelIO

Represents a way that model can be saved and loaded. A required field of
`ModelType` class. If a ML library has it's own way to save and load models, it
goes here.

**Base class**: `mlem.core.model.ModelIO`

There are implementations for all supported libraries: `torch_io`, `xgboost_io`,
`lightgbm_io`, `catboost_io`

Also, universal `simple_pickle` is available, which simply pickles the model
(used by sklearn, for example).

There is also separate `pickle` implementation, which can detect other model
types inside your object and use their IO's for them. This is very handy when
you for example wrap your torch NN with a python function: the function part
will be pickled, and NN will be saved using `torch_io`

# Datasets

## DatasetType

Hold metadata about dataset, like type, dimensions, column names etc.

**Base class**: `mlem.core.dataset_type.DatasetType`

**Fields**:

- `data` (transient) - underlying dataset object, if it was read

**Implementations**:

Python:

- `primitive` - any of the python primitives
- `tuple` - a tuple of objects, each can have different type
- `list` - a list of objects, but they should be the same type
- `tuple_like_list` - a list of objects, each can have different type
- `dict` - a dictionary, each key can have different type

Pandas:

- `dataframe` - `pd.DataFrame`. Holds info about columns, their types and
  indexes
- `series` - `pd.Series`. Holds info about columns, their types and indexes

Numpy:

- `ndarray` - `np.ndarray`. Holds info about type and dimensions
- `number` - `np.number`. Holds info about type

ML Libraries:

- `xgboost_dmatrix` - `xgboost.DMatrix`. Holds info about feature names and
  their types
- `lightgbm` - `lightgbm.Dataset`. Holds information about inner data object
  (dataframe or ndarray)
- `torch` - `torch.Tensor`. Holds information about type and dimensions

Special:

- `unspecified` - Special dataset type when no dataset info was provided

## DatasetReader

Holds all the information needed to read dataset.

**Base class**: `mlem.core.dataset_type.DatasetReader`

**Fields**:

- `dataset_type` - resulting dataset_type

**Implementations**:

- `pandas`
- `numpy`

## DatasetWriter

Writes datasets to files, producing a list of `Artifact` and corresponding
[`DatasetReader`](#datasetreader)

**Base class**: `mlem.core.dataset_type.DatasetWriter`

**Implementations**:

- `pandas`
- `numpy`

# Storage

## Artifact

Represents a file save in some storage.

**Base class**: `mlem.core.artifacts.Artifact`

**Implementations**:

- `local` - local file
- `fsspec` - file in remote file system
- `dvc` - file in dvc cache

## Storage

Defines where the artifacts will be written. Produces corresponding `Artifact`
instances.

**Base class**: `mlem.core.artifacts.Storage`

**Implementations**:

- `local` - store files on the local file system
- `fsspec` - store files in some remote file system
- `dvc` - store files locally, but try to read them from DVC cache if they are
  absent

# Runtime

## Interface

Represents an interface for service runtime. Provides a mapping method name to
its signature. Also provides executor functions for those methods.

**Base class**: `mlem.runtime.interface.base.Interface`

**Implementations**:

- `simple` - base class for interfaces created manually. Will expose subclass
  methods marked with `@expose` decorator.
- `model` - dynamically create interface from [`ModelType`](#modeltype)

## Server

Runs configured interface, exposing its methods as endpoints.

**Base class**: `mlem.runtime.server.base.Server`

**Implementations**:

- `fastapi` - starts `FastAPI` server
- `rmq` - creates a queue in `RabbitMQ` instance and a consumer for each
  interface method

## Client

Clients for corresponding servers

**Base class**: `mlem.runtime.client.base.BaseClient`

**Implementations**:

- `http` - makes request for http servers like `fastapi`
- `rmq` - client for `rmq` server

# Packing

## Packager

Declaration for creating a `Package` from model. You can learn more about
packaging [here](/doc/get-started/packaging)

**Base class**: `mlem.pack.base.Packager`

Related commands: [API](/doc/api-reference/pack),
[CLI](/doc/command-reference/pack)

**Implementations**:

Python packages:

- `pip` - create a directory with python package from model
- `whl` - create a `.whl` file with python package

Docker:

- `docker_dir` - create a directory with context for docker image building
- `docker` - build a docker image from model

# Deployment

## TargetEnvMeta

Declaration of target environment for deploying models.

**Base class**: `mlem.core.objects.TargetEnvMeta`

**Implementations**:

- `heroku` - an account on heroku platform

## DeployMeta

Declaration and state of deployed model.

**Base class**: `mlem.core.objects.DeployMeta`

Related commands: [API](/doc/api-reference/deploy),
[CLI](/doc/command-reference/deploy)

**Fields**:

- `env_link` - link to targeted environment
- `env` (_transient_) - loaded targeted environment
- `model_link` - link to deployed model object
- `model` (_transient_) - loaded model object
- `state` - deployment state

**Implementations**:

- `heroku` - app deployed to Heroku platform

## DeployState

Represents state of the deployment

**Base class**: `mlem.core.objects.DeployState`

**Implementations**:

- `heroku` - state of the deployed Heroku app
