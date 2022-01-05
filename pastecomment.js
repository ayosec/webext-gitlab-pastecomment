"use strict";

document.body.addEventListener("focus", event => {
  let target = event.target;

  if(target.tagName === "TEXTAREA") {
    let write;
    let preview;

    // Find "Write" and "Preview" buttons

    let form = target.closest("form");
    if(typeof(form.dataset["__webextPasteAndReplace"]) !== "undefined") {
      return;
    }

    form.dataset["__webextPasteAndReplace"] = true;

    form.querySelectorAll("button").forEach(button => {
      switch(button.textContent.trim()) {
        case "Write":
          write = button;
          break;

        case "Preview":
          preview = button;
          break;
      }
    });

    // Add our own button to the toolbar

    let li = document.createElement("li");
    li.classList.add("md-header-toolbar");
    li.style.display = "block";
    li.style.visibility = "visible";

    preview.
      closest("ul").
      insertAdjacentElement("beforeend", li);

    let button = document.createElement("button");
    button.textContent = "Paste";
    li.appendChild(button);

    button.addEventListener("click", event => {
      event.preventDefault();

      // Change current tab to the editor
      write.click();

      // Get clipboard data and replace the content of the textarea
      navigator.clipboard.readText().then(text =>  {
        target.value = text;
        target.dispatchEvent(new Event("change"));
        setTimeout(() => preview.click(), 50);
      });
    });
  }
}, true);
