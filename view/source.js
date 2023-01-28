let editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/java");
    editor.setHighlightActiveLine(true);
    editor.session.setTabSize(4);

fetch("../src/source/source.java")
    .then(response => response.text())
    .then(outputTxt => {
        editor.setValue(outputTxt);
    });