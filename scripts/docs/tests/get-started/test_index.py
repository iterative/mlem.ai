import os

from conftest import assert_file_snippet, get_code_snippet, load_docsfile, \
    run_in_dir


def test_code_snippets(tmpdir):
    content = load_docsfile("get-started", "index.md")

    code = get_code_snippet(content, index=0, type_="py")

    run_in_dir(tmpdir, "train.py", code)

    dir_content = os.listdir(tmpdir / "models")
    assert set(dir_content) == {"rf", "rf.mlem"}

    assert_file_snippet("get-started", "index.md", index=0, type_="yaml", actual=(tmpdir / "models" / "rf.mlem").read())
