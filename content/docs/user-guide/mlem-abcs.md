# MLEM Interfaces

List MlemABC root subclasses and thier builtin implementations. Also, third-party implementations when there will be at least one

Group abc by application (storing/serving/etc)
most importatnt like modeltype and datasettype (with satellites like io and reader/writer) can be extracted to separate doc
## artifact:
        Base class: mlem.core.artifacts.Artifact
        

        - dvc
        - fsspec
        - mlem.core.artifacts.PlaceholderArtifact
        - local
## storage:
        Base class: mlem.core.artifacts.Storage
        

        - dvc
        - fsspec
        - local
## requirement:
        Base class: mlem.core.requirements.Requirement
        Base class for python requirement

        - custom
        - mlem.core.requirements.PythonRequirement
        - unix
        - installable
        - file

## dataset_type:
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
## dataset_reader:
        Base class: mlem.core.dataset_type.DatasetReader

        - pandas
        - numpy
## dataset_writer:
        Base class: mlem.core.dataset_type.DatasetWriter

        - pandas
        - numpy
## model_io:
        Base class: mlem.core.model.ModelIO
        IO base class for models

        - torch_io
        - simple_pickle
        - xgboost_io
        - lightgbm_io
        - catboost_io
        - pickle
## model_type:
        Base class: mlem.core.model.ModelType
        Base class for dataset type metadata.

        - mlem.core.model.ModelType
        - callable
        - xgboost
        - catboost
        - lightgbm
        - torch
        - sklearn
## meta:
        Base class: mlem.core.objects.MlemMeta

        - packager
        - env
        - dataset
        - model
        - deployment
        - link
## deploy_state:
        Base class: mlem.core.objects.DeployState
        - heroku
        - mlem.core.objects.DeployState
## env:
        Base class: mlem.core.objects.TargetEnvMeta
        - heroku
## deploy:
        Base class: mlem.core.objects.DeployMeta
        - mlem.core.objects.DeployMeta
        - heroku
## import:
        Base class: mlem.core.import_objects.ImportHook
        - pandas
        - pickle
## packager:
        Base class: mlem.pack.base.Packager
        - docker
        - whl
        - docker_dir
        - pip
## interface:
        Base class: mlem.runtime.interface.base.Interface
        - model
        - simple
## server:
        Base class: mlem.runtime.server.base.Server
        - fastapi
        - heroku

