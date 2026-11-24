
var form = document.querySelector("form");
var nameInput = document.getElementById("expense-name");
var amountInput = document.getElementById("expense-amount");
var categoryInput = document.getElementById("expense-category");
var list = document.getElementById("expense-list");
var filter = document.getElementById("filter");
var totalTop = document.getElementById("totalAmount");
var totalBottom = document.getElementById("total");


var expenses = [];
var nextId = 1;


form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  var name = nameInput.value.trim();
  var amountText = amountInput.value.trim();
  var amount = Number(amountText);
  var category = categoryInput.value;

 
  if (name === "" || amountText === "" || category === "") {
    alert("Please fill in all fields.");
    return;
  }


  if (isNaN(amount) || amount <= 0) {
    alert("Amount must be a number greater than 0.");
    return;
  }

  expenses.push({
    id: nextId,
    name: name,
    amount: amount,
    category: category
  });
  nextId++;

  form.reset();
  showExpenses();
});

function showExpenses() {
  list.innerHTML = "";

  var allTotal = 0;
  var shownTotal = 0;
  var selected = filter.value.toLowerCase();

  for (var i = 0; i < expenses.length; i++) {
    var expense = expenses[i];
    allTotal = allTotal + expense.amount;


    if (selected !== "all" && selected !== expense.category) {
      continue;
    }

    shownTotal = shownTotal + expense.amount;
    list.appendChild(createItem(expense));
  }

 
  if (list.children.length === 0) {
    var empty = document.createElement("li");
    empty.textContent = "No expenses to show.";
    list.appendChild(empty);
  }

  totalTop.textContent = "₹" + allTotal.toFixed(2);
  totalBottom.textContent = "₹" + shownTotal.toFixed(2);
}

function createItem(expense) {
  var li = document.createElement("li");

  var info = document.createElement("span");
  var categoryName = expense.category.charAt(0).toUpperCase() + expense.category.slice(1);
  info.textContent = expense.name + " (" + categoryName + ")";

  var price = document.createElement("span");
  price.textContent = "₹" + expense.amount.toFixed(2);

  var deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", function () {
    deleteExpense(expense.id);
  });

  li.appendChild(info);
  li.appendChild(price);
  li.appendChild(deleteBtn);
  return li;
}


function deleteExpense(id) {
  expenses = expenses.filter(function (e) {
    return e.id !== id;
  });
  showExpenses();
}

filter.addEventListener("change", showExpenses);


showExpenses();