# Using MLEM in DVC Pipeline

DVC pipelines are the useful DVC mechanism to build data pipelines, in which you
can process your data and train your model. You may be already training your ML
models in them and what to start using MLEM to save those models.

MLEM could be easily plug in into existing DVC pipelines.

You may have a simple pipeline in which you train your model, like this:

```yaml
# dvc.yaml
stages:
  generate:
    cmd: python src/generate_data.py
    deps:
      - src/generate_data.py
    outs:
      - data/train.csv
  train:
    cmd: python src/train.py data/train models/rf
    deps:
      - data/train.csv
      - src/train.py
    outs:
      - models/rf
```

Next step would be to start saving your models with MLEM:

```python
# train.py
import mlem
from training_module import train

model = train()
mlem.api.save(model)
```

Now, since MLEM saves both **binary** and **metadata** you need to have both of
them in DVC pipeline:

```yaml
# dvc.yaml
stages:
  generate:
    cmd: python src/generate_data.py
    deps:
      - src/generate_data.py
    outs:
      - data/train.csv
  train:
    cmd: python src/train.py data/train models/rf models/logreg
    deps:
      - data/train
      - src/train.py
    outs:
      - models/rf
      - models/rf.mlem:
          cache: false
```

Since binary was already captured before, we don't need to add anything for it.
For metadata, we've added two rows to capture it and specify `cache: false`
since we want the metadata to be committed to Git, and not be pushed to DVC
remote.

Now MLEM is ready to be used in your DVC pipeline!
