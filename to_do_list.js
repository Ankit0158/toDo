function addToDoEnter(){
    event.preventDefault();
    if (event.keyCode === 13) {
        addToDo();
    }
}
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
    document.getElementById("todo-input-text").value = "";
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
    contentDiv.classList.add("content");
    contentDiv.classList.add("list-item");
    contentDiv.setAttribute("draggable", "true");
    contentDiv.setAttribute("id", listCount);
    contentDiv.setAttribute("ondragover", "allowDrop(event)");
    contentDiv.setAttribute("ondragstart", "dragStart(event)");
    contentDiv.setAttribute("ondrop", "drop(event)");
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
    if (status == 0) {
        checkIcon.onclick = checked;
    } else {
        checkIcon.onclick = unchecked;
    }
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
    var crossIcon = document.createElement("i");
    crossIcon.classList.add("fa");
    crossIcon.classList.add("fa-close");
    crossIcon.classList.add("crossIcon");
    crossIcon.onclick = removeToDo;
    /*Apend to content div*/
    contentDiv.appendChild(checkIcon);
    contentDiv.appendChild(textDiv);
    contentDiv.appendChild(count);
    contentDiv.appendChild(crossIcon);
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
    this.onclick = unchecked;
    var count = toDoText.nextSibling.value;
    changeStatus(count);
}

function changeStatus(count) {
    toDoList = JSON.parse(localStorage.getItem('toDoList'));
    if (toDoList[count].status == 0) {
        toDoList[count].status = 1;
    } else {
        toDoList[count].status = 0;
    }
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
}

function unchecked() {
    this.parentNode.classList.remove("checked-content");
    var toDoText = this.nextSibling;
    toDoText.classList.remove("checked");
    this.classList.remove("fa-check-square-o");
    this.classList.add("fa-square-o");
    this.onclick = checked;
    var count = toDoText.nextSibling.value;
    changeStatus(count);
}

function removeToDo() {
    toDoList = JSON.parse(localStorage.getItem('toDoList'));
    toDoIndex = this.previousSibling.value;
    toDoList.splice(toDoIndex, 1);
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
    document.location.reload();
}

var id;

function dragStart(e) {
    id = e.target.id;
}

function allowDrop(e) {
    e.preventDefault();
}

function drop(e) {
    var dropElement = document.getElementById(e.target.id);
    var dragElement = document.getElementById(id)
    var parentNode = dropElement.parentNode;
    var dropIndex = parseInt(dropElement.childNodes[2].value);
    var dragIndex = parseInt(dragElement.childNodes[2].value);
    if (dropIndex < dragIndex) {
        parentNode.insertBefore(dragElement, dropElement);
        var i;
        tempElement = dragElement;
        for (i = dropIndex; i <= dragIndex; i++) {
            tempElement.id = i;
            tempElement.childNodes[2].value = i;
            tempElement = tempElement.nextSibling;
        }
    } else {
        nextElement = dropElement.nextSibling;
        parentNode.insertBefore(dragElement, nextElement);
        var i;
        tempElement = dragElement;
        for (i = dropIndex; i >= dragIndex; i--) {
            tempElement.id = i;
            tempElement.childNodes[2].value = i;
            tempElement = tempElement.previousSibling;
        }
    }
    reorderLocalStorage(dropIndex, dragIndex)
}

function reorderLocalStorage(dropIndex, dragIndex) {
    toDoList = JSON.parse(localStorage.getItem('toDoList'));
    if (dropIndex < dragIndex) {
        var i;
        var temp1 = toDoList[dragIndex]
        for (i = dragIndex; i > dropIndex; i--) {
            toDoList[i] = toDoList[i - 1];
        }
        toDoList[dropIndex] = temp1;
    } else {
        var i;
        var temp1 = toDoList[dragIndex];
        for (i = dragIndex; i < dropIndex; i++) {
            toDoList[i] = toDoList[i + 1];
        }
        toDoList[dropIndex] = temp1;
    }

    localStorage.setItem('toDoList', JSON.stringify(toDoList));
}
window.addEventListener("load", function() {
    document.getElementById("addBtn").addEventListener("click", addToDo);
    document.getElementById("todo-input-text").addEventListener("keyup", addToDoEnter);
});