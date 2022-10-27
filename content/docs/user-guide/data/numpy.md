# Numpy

DataType, Reader and Writer implementations for `np.ndarray` and `np.number`
primitives

## Description

**TODO**

## Requirements

```bash
pip install mlem[numpy]
# or
pip install numpy
```

## Examples

### Saving and loading numpy array

```python
import numpy as np

from mlem.api import save, load


data = np.zeros((100,))

save(data, "array")

data = load("array")
```
