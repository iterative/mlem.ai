import contextlib
import os.path
import pathlib
import re
import subprocess

import pytest

DOCS_PATH = str(pathlib.Path(__file__).parent.parent.parent.parent / "content" / "docs")

def load_docsfile(*paths):
        with open(os.path.join(DOCS_PATH, *paths), "r", encoding="utf8") as f:
            return f.read()



def get_code_snippet(content, index: int = None, type_: str = ''):
    res = re.findall(f"```{type_}(.*?)^```",
          content, flags=re.MULTILINE | re.DOTALL)
    if index is not None:
        return res[index].strip()
    return res



def run_in_dir(dirpath, filename, code):
    path = os.path.join(dirpath, filename)
    with open(path, "w", encoding="utf8") as f:
        f.write(code)

    return subprocess.check_output(["python", filename], cwd=dirpath)