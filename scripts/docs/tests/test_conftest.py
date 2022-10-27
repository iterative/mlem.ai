from conftest import get_code_snippet, load_docsfile


def test_load_docs():
    assert load_docsfile("get-started", "index.md") is not None


def test_get_code_snippet():
    text = """text
text

```python
python1
```

```python
python2
```

other text

```bash
bash1
```
"""
    assert get_code_snippet(text, index=0, type_="python") == "python1"
    assert get_code_snippet(text, index=1, type_="python") == "python2"
    assert get_code_snippet(text, index=0, type_="bash") == "bash1"
