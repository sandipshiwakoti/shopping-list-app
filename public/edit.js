const editForm = document.querySelector(".shopping-edit-form");
const btnEdit = document.querySelector(".btn-edit-item");
const messageDOM = document.querySelector(".message");
const id = new URLSearchParams(window.location.search).get("id");

const displayMessage = (msg, type) => {
  messageDOM.textContent = msg;
  messageDOM.classList.add("show", type);
  setTimeout(() => {
    messageDOM.textContent = "";
    messageDOM.classList.remove("show", type);
  }, 2000);
};

const loadItem = async () => {
  try {
    const { data } = await axios.get(`/api/v1/shopping/${id}`);
    console.log(data);
    editForm.id.value = id;
    editForm.name.value = data.item.name;
    editForm.completed.checked = data.item.completed;
  } catch (err) {
    console.log(err);
  }
};

btnEdit.addEventListener("click", async () => {
  try {
    const id = editForm.id.value;
    const name = editForm.name.value;
    const completed = editForm.completed.checked;
    const { data } = await axios.patch(`/api/v1/shopping/${id}`, {
      name,
      completed,
    });
    console.log(data);
    displayMessage("Successfully edited!", "success");
  } catch (err) {
    console.log(err.response);
    displayMessage(`${err.response.data.msg}`, "error");
  }
});

window.addEventListener("DOMContentLoaded", async () => {
  await loadItem();
});
