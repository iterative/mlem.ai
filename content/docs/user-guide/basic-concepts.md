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

## Model Codification

Saving models to files or loading them back into python objects may seem like a
deceptively simple task at first. For example, `pickle` and `torch` libraries
can serialize/deserialize model objects to/from files, or you can use `joblib`
to serialize NumPy-heavy models more effectively.

However, when MLEM is used to
[save python model objects](/doc/api-reference/save) or enrich existing model
files using the [import command](/doc/user-guide/importing), it adds its
"special sauce" - all the things needed to reliably recreate this Python object
later are extracted **auto-magically** and are written to a `.mlem` metadata
file. This additional "metafile" is a yaml representation of the
[MLEM Object](#mlem-object) corresponding to the model Python object. This is
why we refer to this operation as a "codification" of the model, and is a very
powerful concept, underlining a lot of MLEM's abilities.

Here are the key advantages of using MLEM to save your models:

- Deep inspection and input data schema serialization - more details on what's
  extracted below
- Standardized, single tool to save/load models - decoupled from your ML
  framework of choice (`torch`, `catboost`, `sklearn` or any other package)
- Drop-in replacement for most existing use-cases
- MLEM is modular by design, supporting new formats for models/data and other
  objects is easy and native as an umbrella tool on top of existing technologies

Here is a breakdown of the data MLEM extracts from models objects:

1. Model methods: Like `predict` and `predict_proba`
2. Deep recursive inspection - custom Python functions and objects, like other
   models/transformers/preprocessors your model calls under the hood
3. Input data schema: Describes the dataframe (Iris dataset)
4. Python Requirements: `sklearn` and `pandas` in this case, with the specific
   versions used to train the model

Down the line this metadata enables us to easily and reliably package and serve
different model types in various ways using MLEM.

<admon type='tip'>

This is extracted by MLEM when we save/import models with MLEM. We don't have to
specify any of this ourselves. MLEM inspects the object (even if it's complex)
and infers all of this automatically!

</admon>

<details>

### Click to see an example model metafile

Here is an example model metafile `rf.mlem`, produced by saving the model from
the [get-started guide](/doc/get-started#saving-your-model):

```yaml
artifacts:
  data:
    hash: 5a38e5d68b9b9e69e9e894bcc9b8a601
    size: 163651
    uri: rf
model_type:
  methods:
    predict:
      args:
        - name: data
          type_:
            columns:
              - sepal length (cm)
              - sepal width (cm)
              - petal length (cm)
              - petal width (cm)
            dtypes:
              - float64
              - float64
              - float64
              - float64
            index_cols: []
            type: dataframe
      name: predict
      returns:
        dtype: int64
        shape:
          - null
        type: ndarray
    predict_proba:
      args:
        - name: data
          type_:
            columns:
              - sepal length (cm)
              - sepal width (cm)
              - petal length (cm)
              - petal width (cm)
            dtypes:
              - float64
              - float64
              - float64
              - float64
            index_cols: []
            type: dataframe
      name: predict_proba
      returns:
        dtype: float64
        shape:
          - null
          - 3
        type: ndarray
  type: sklearn
object_type: model
requirements:
  - module: sklearn
    version: 1.1.2
  - module: numpy
    version: 1.22.4
  - module: pandas
    version: 1.5.0
```

</details>
