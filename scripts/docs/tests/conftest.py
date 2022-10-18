import contextlib
import os.path
import pathlib
import re
import subprocess

DOCS_PATH = str(pathlib.Path(__file__).parent.parent.parent.parent / "content" / "docs")
CHECK_ONLY = False


def load_docsfile(*paths):
    with open(os.path.join(DOCS_PATH, *paths), "r", encoding="utf8") as f:
        return f.read()


def write_docsfile(content, *paths):
    with open(os.path.join(DOCS_PATH, *paths), "w", encoding="utf8") as f:
        f.write(content)


def replace_section(
    data: str, section_name: str, new_value: str, section_prefix: str = "## "
) -> str:
    return re.sub(
        f"{section_prefix}{section_name}(.*?)^{section_prefix}",
        f"{section_prefix}{section_name}{new_value}{section_prefix}",
        data,
        flags=re.MULTILINE | re.DOTALL,
    )


def get_code_snippet(content, index: int = None, type_: str = ""):
    res = re.findall(f"```{type_}(.*?)^```", content, flags=re.MULTILINE | re.DOTALL)
    if index is not None:
        return res[index].strip()
    return res


def run_in_dir(dirpath, filename, code):
    path = os.path.join(dirpath, filename)
    with open(path, "w", encoding="utf8") as f:
        f.write(code)

    return subprocess.check_output(["python", filename], cwd=dirpath)


def assert_file_snippet(*paths, index: int, type_="", actual):
    content = load_docsfile(*paths)
    snippet = get_code_snippet(content, index, type_)
    if snippet != actual and not CHECK_ONLY:
        content = replace_section(
            content, section_name=type_ + "\n", new_value=actual, section_prefix="```"
        )
        write_docsfile(content, *paths)
    assert actual == snippet
