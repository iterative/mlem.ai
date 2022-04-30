# Interfaces

List MlemABC root subclasses and thier builtin implementations. Also, third-party implementations when there will be at least one

# General

## MlemMeta
        Base class: mlem.core.objects.MlemMeta

        - packager
        - env
        - dataset
        - model
        - deployment
        - link
## Requirement
        Base class: mlem.core.requirements.Requirement
        Base class for python requirement

        - custom
        - mlem.core.requirements.PythonRequirement
        - unix
        - installable
        - file
## ImportHook
        Base class: mlem.core.import_objects.ImportHook
        - pandas
        - pickle


# Models
## ModelType
        Base class: mlem.core.model.ModelType
        Base class for dataset type metadata.

        - mlem.core.model.ModelType
        - callable
        - xgboost
        - catboost
        - lightgbm
        - torch
        - sklearn
## ModelIO
        Base class: mlem.core.model.ModelIO
        IO base class for models

        - torch_io
        - simple_pickle
        - xgboost_io
        - lightgbm_io
        - catboost_io
        - pickle

# Datasets
## DatasetType
        Base class: mlem.core.dataset_type.DatasetType
        Base class for dataset type metadata.

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
        Base class: mlem.core.dataset_type.DatasetReader

        - pandas
        - numpy
## DatasetWriter
        Base class: mlem.core.dataset_type.DatasetWriter

        - pandas
        - numpy

# Storage

## Artifact
        Base class: mlem.core.artifacts.Artifact
        

        - dvc
        - fsspec
        - mlem.core.artifacts.PlaceholderArtifact
        - local
## Storage
        Base class: mlem.core.artifacts.Storage
        

        - dvc
        - fsspec
        - local
# Runtime

## Interface
        Base class: mlem.runtime.interface.base.Interface
        - model
        - simple

## Server
        Base class: mlem.runtime.server.base.Server
        - fastapi
        - heroku


# Packing
## Packager
        Base class: mlem.pack.base.Packager
        - docker
        - whl
        - docker_dir
        - pip
# Deployment

## TargetEnvMeta
        Base class: mlem.core.objects.TargetEnvMeta
        - heroku
## DeployMeta
        Base class: mlem.core.objects.DeployMeta
        - mlem.core.objects.DeployMeta
        - heroku

## DeployState
        Base class: mlem.core.objects.DeployState
        - heroku
        - mlem.core.objects.DeployState







