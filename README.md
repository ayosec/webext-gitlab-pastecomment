# GitLab Paste In Comment - WebExtension

Add a *Paste* action to update a comment in GitLab with the contents of the clipboard. The button is added when the `<textarea>` element receives the focus. On click:

* It reads the content of the clipboard.
* Then, the content of the `<textarea>` is replaced with the text from the clipboard.
* Finally, it activates the preview of the comment.

The extension is intended to be used when the comment is created in an external editor.
