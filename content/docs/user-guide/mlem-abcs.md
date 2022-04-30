# MLEM ABCs

MLEM has a number of abstract base classes that anyone can implement to [extend](/doc/user-guide/extending) to add new capabilities to MLEM.

<details>

### Internal details

Each abstract base class in this list is a subclass of `mlem.core.base.MlemABC` class, which is a subclass of pydantic `BaseModel` with additional polymorphic magic. 

That means that all subclasses are also `BaseModel`s and should be serializable. This way MLEM can save/load them as part of the other objects or configure them via `-c` notation in CLI.

</details>

Here is the list of all MLEM ABCs.

# General


## MlemMeta
Represents a **[MLEM Object](/doc/user-guide/basic-concepts)**

Base class: `mlem.core.objects.MlemMeta`

For more info and list of subtypes look [here](doc/user-guide/basic-concepts#mlem-object-types)


## Requirement
Represents different types of requirements for MLEM Object.

Base class: `mlem.core.requirements.Requirement`

Implementations:

- `installable` - a python requirement typcally installed through `pip`. Can have specific version and alternative package name. Default type
- `custom` - a python requirement in a form of a local `.py` file or a python package. Contains name and source code for the module/package
- `unix` - unix package typically installed through `apt` or `yum`

## ImportHook
Represents some file format that MLEM can try to [import](/doc/user-guide/importing).

Base class: `mlem.core.import_objects.ImportHook`

Implementations:

- `pickle` - simply unpickle the contens of file and use default MLEM object analyzer. Works with pickle files
- `pandas` - try to read a file into `pandas.DataFrame`. Works with files saved with pandas in formats like `csv, json, excel, parquet, feather, stata, html, parquet`. Some formats require additional dependencies.

# Models

## ModelType

This class is basically a wrapper for all Model classes of different libraries. Yes, yet another standard.
If you want to add support for your ML Model in MLEM, this is what you implement!

Base class: `mlem.core.model.ModelType`

There are implementations of this class for all supported libraries: `xgboost`, `catboost`, `lightgbm`, `torch`, `sklearn`.

The one notable implementation is `callable`: it treats any python callable object as a model with a single method `__call__`. That means you can turn funciton and classmethods into MLEM Models as well!

## ModelIO
Represents a way that model can be saved and loaded. A required field of `ModelType` class. If a ML library has it's own way to save and load models, it goes here.

Base class: `mlem.core.model.ModelIO`

There are implementations for all supported libraries: `torch_io`, `xgboost_io`, `lightgbm_io`, `catboost_io`

Also, universal `simple_pickle` is available, which simply pickles the model (used by sklearn, for example).

There is also separate `pickle` implementation, which can detect other model types inside your object and use their IO's for them.
This is very handy when you for example wrap your torch NN with a python function: the function part will be pickled, and NN will be saved using `torch_io` 

# Datasets

[comment]: <> (TODO)

## DatasetType
Base class: `mlem.core.dataset_type.DatasetType`


- tuple
- mlem.core.dataset_type.UnspecifiedDatasetType
- series
- ndarray
- xgboost_dmatrix
- primitive
- list
- lightgbm
- dict
- torch
- mlem.core.dataset_type._TupleLikeDatasetType
- dataframe
- tuple_like_list
- number
## DatasetReader
Base class: `mlem.core.dataset_type.DatasetReader`


- pandas
- numpy
## DatasetWriter
Base class: `mlem.core.dataset_type.DatasetWriter`


- pandas
- numpy

# Storage

## Artifact
Base class: `mlem.core.artifacts.Artifact`

        

- dvc
- fsspec
- mlem.core.artifacts.PlaceholderArtifact
- local
## Storage
Base class: `mlem.core.artifacts.Storage`

        

- dvc
- fsspec
- local
# Runtime

## Interface
Base class: `mlem.runtime.interface.base.Interface`

- model
- simple

## Server
Base class: `mlem.runtime.server.base.Server`

- fastapi
- heroku


# Packing
## Packager
Base class: `mlem.pack.base.Packager`

- docker
- whl
- docker_dir
- pip
# Deployment

## TargetEnvMeta
Base class: `mlem.core.objects.TargetEnvMeta`

- heroku
## DeployMeta
Base class: `mlem.core.objects.DeployMeta`

- mlem.core.objects.DeployMeta
- heroku

## DeployState
Base class: `mlem.core.objects.DeployState`

- heroku
- mlem.core.objects.DeployState







