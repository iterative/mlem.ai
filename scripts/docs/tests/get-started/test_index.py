import os

from conftest import get_code_snippet, load_docsfile, run_in_dir


def test_code_snippets(tmpdir):
    content = load_docsfile("get-started", "index.md")

    code = get_code_snippet(content, index=0, type_="py")

    run_in_dir(tmpdir, "train.py", code)

    dir_content = os.listdir(tmpdir / "models")
    assert set(dir_content) == {"rf", "rf.mlem"}

    rfmlem = get_code_snippet(content, index=0, type_="yaml")

    assert (tmpdir / "models" / "rf.mlem").read() == rfmlem