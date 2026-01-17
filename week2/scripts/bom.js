const input = document.querySelector("#favchap");
const button = document.querySelector("#addChapter");
const list = document.querySelector("#list");

button.addEventListener("click", () => {
  if (input.value.trim() === "") {
    input.focus();
    return;
  }

  const li = document.createElement("li");
  const deleteButton = document.createElement("button");

  li.textContent = input.value;

  deleteButton.textContent = "❌";
  deleteButton.setAttribute("aria-label", "Delete chapter");

  deleteButton.addEventListener("click", () => {
    list.removeChild(li);
    input.focus();
  });

  li.append(deleteButton);
  list.append(li);

  input.value = "";
  input.focus();
});
