function showToDo() {
    toDoList = JSON.parse(localStorage.getItem('toDoList'));
    if (toDoList == null) {
        toDoList = [];
    }
    var listLength = toDoList.length;
    if (listLength > 0) {
        var i;
        for (i = 0; i < listLength; i++) {
            createToDo(toDoList[i].toDo, toDoList[i].status, i);
        }
    }
}

function addToDo() {
    var toDoText = document.getElementById("todo-input-text").value;
    if (toDoText == "") {
        alert("Please Type Something!!")
    } else {
        /*Store In to Local Storage*/
        var toDoIndex = storeToLocalStorage(toDoText);
        /*Create outer div element*/
        createToDo(toDoText, 0, toDoIndex);
    }

}

function storeToLocalStorage(toDoText) {
    toDoList = JSON.parse(localStorage.getItem('toDoList'));
    if (toDoList == null) {
        toDoList = [];
    }
    var toDoData = {
        toDo: toDoText,
        status: 0,
    };
    toDoList.push(toDoData);
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
    var toDoIndex = toDoList.length - 1;
    return toDoIndex;
}

function createToDo(toDoText, status, listCount) {
    var contentDiv = document.createElement("div");
    contentDiv.classList.add("containt");
    contentDiv.classList.add("list-item");
    if (status == 1) {
        contentDiv.classList.add("checked-content");
    }
    /*Create icon element*/
    var checkIcon = document.createElement("i");
    checkIcon.classList.add("fa");
    if (status == 0) {
        checkIcon.classList.add("fa-square-o");
    } else {
        checkIcon.classList.add("fa-check-square-o");
    }
    checkIcon.classList.add("icon");
    checkIcon.onclick = checked;
    /*Create Text Div*/
    var textDiv = document.createElement("div");
    textDiv.classList.add("to-do-text");
    var toDoStr = document.createTextNode(toDoText);
    textDiv.appendChild(toDoStr);
    if (status == 1) {
        textDiv.classList.add("checked");
    }
    /*Create a hidden div*/
    var count = document.createElement("input");
    count.setAttribute("type", "hidden");
    count.setAttribute("value", listCount);
    count.classList.add("count");
    /*create icon for Drag and Drop*/
    var dragIcon = document.createElement("i");
    dragIcon.classList.add("fa");
    dragIcon.classList.add("fa-bars");
    dragIcon.classList.add("dragIcon");
    /*Apend to content div*/
    contentDiv.appendChild(checkIcon);
    contentDiv.appendChild(textDiv);
    contentDiv.appendChild(count);
    contentDiv.appendChild(dragIcon);
    /*Apent to container*/
    var parent = document.getElementById("toDoList");
    parent.appendChild(contentDiv);
}

function checked() {
    this.parentNode.classList.add("checked-content");
    var toDoText = this.nextSibling;
    toDoText.classList.add("checked");
    this.classList.remove("fa-square-o");
    this.classList.add("fa-check-square-o");
    var count = toDoText.nextSibling.value;
    changeStatus(count);
}

function changeStatus(count) {
    toDoList = JSON.parse(localStorage.getItem('toDoList'));
    toDoList[count].status = 1;
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
}
window.addEventListener("load", function() {
    document.getElementById("addBtn").addEventListener("click", addToDo);
});