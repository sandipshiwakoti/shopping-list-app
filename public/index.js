const btnAdd = document.querySelector(".btn-add");
const addItemForm = document.querySelector("#add-item-form");
const shoppingItemsDOM = document.querySelector(".shopping-items");
const messageDOM = document.querySelector(".message");

const displayMessage = (msg, type) => {
  messageDOM.textContent = msg;
  messageDOM.classList.add("show", type);
  setTimeout(() => {
    messageDOM.textContent = "";
    messageDOM.classList.remove("show", type);
  }, 2000);
};

const setupRemoveItem = () => {
  const btnRemoveAll = document.querySelectorAll(".btn-remove");
  btnRemoveAll.forEach((btnRemove) => {
    const id = btnRemove.dataset.id;
    btnRemove.addEventListener("click", async () => {
      try {
        const { data } = await axios.delete(`/api/v1/shopping/${id}`);
        console.log(data);
        displayMessage("Successfully removed!", "success");
        loadItems();
      } catch (err) {
        // const responsedMsg = err.response.data.msg.errors.name.message;
        displayMessage(`${err.response.data.msg}`, "error");
      }
      addItemForm.name.value = "";
    });
  });
};

const loadItems = async () => {
  try {
    const { data } = await axios.get("/api/v1/shopping");
    const items = data.items
      .map((item) => {
        const completed = item.completed;
        return ` <div class='shopping-item ${completed ? "completed" : ""}'>
            <div class="btn-icon completed-icon">
              <i class="fas fa-check-square"></i>
            </div>
            <h3 class="shopping-item-name">${item.name}</h3>
            <div>
              <a href="/edit.html?id=${
                item._id
              }" class="btn-edit btn-icon"><i class="fas fa-edit"></i></a>
              <span class="btn-remove btn-icon" data-id="${item._id}"
                ><i class="fas fa-trash"></i
              ></span>
            </div>
          </div>`;
      })
      .join("");
    shoppingItemsDOM.innerHTML = items;
    setupRemoveItem();
  } catch (err) {
    console.log(err);
  }
};

const addItem = async () => {
  const name = addItemForm.name.value;
  try {
    const { data } = await axios.post("/api/v1/shopping", { name });
    console.log(data.item);
    displayMessage("Successfully added!", "success");
    loadItems();
  } catch (err) {
    console.log(err.response);
    // const responsedMsg = err.response.data.msg.errors.name.message;
    displayMessage(`${err.response.data.msg}`, "error");
  }
  addItemForm.name.value = "";
};

btnAdd.addEventListener("click", (e) => {
  e.preventDefault();
  addItem();
});

window.addEventListener("DOMContentLoaded", async () => {
  await loadItems();
});
