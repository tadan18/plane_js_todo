(() => {
    var todos = [];
    var filter = "all";
    var addTodoLists = document.getElementsByTagName("form");
    var addTodoList = addTodoLists[0];
    var todoItems = document.getElementById("todo-list");
    var footer = document.getElementById("footer");

    show = () => {
        var html = "";
        var filterTodos = todos.concat();
        if (filter === "act") {
            filterTodos = todos.filter(todo => !todo.active);
        } else if (filter === "cmp") {
            filterTodos = todos.filter(todo => todo.active);
        } else if (filter === "clear") {
            todos = todos.filter(todo => !todo.active);
            filterTodos = todos;
        }

        for (var i = 0; i < filterTodos.length; i++) {
            var check = "";
            var style = "";
            if (filterTodos[i].active) {
                check = "checked";
                style = "text-decoration: line-through;";
            }
            html += `
            <div>
                <input type="checkbox" class="activate" id="${i}" ${check}>
                <span style="${style}">${filterTodos[i].text}</spam>
                <img src="./dustbox.png" class="remove" id="${i}" />
            </div>`
        }
        todoItems.innerHTML = html;

        countUp();

        buttons = document.getElementsByClassName("remove");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", remove);
        }

        checks = document.getElementsByClassName("activate");
        for (var i = 0; i < checks.length; i++) {
            checks[i].addEventListener("click", displayItems);
        }
    };

    countUp = () => {
        if (todos.length !== 0) {
            var count = todos.filter(todo => !todo.active).length;
            footer.innerHTML = `
            <div>
                <span>${count} item left</span>
                <button class="btn" id="all">All</button>
                <button class="btn" id="act">Active</button>
                <button class="btn" id="cmp">Complete</button>
                <button class="btn" id="clear">Clear Complete</button>
            </div>
            `;
            
            filters = document.getElementsByClassName("btn");
            for (var i = 0; i < filters.length; i++) {
                filters[i].addEventListener("click", todoFilter)
            }
        } else {
            footer.innerHTML = "";
        }
    };

    todoFilter = () => {
        filter = event.target.id;
        show();
        filter = "all";
    };

    displayItems = () => {
        todos[event.target.id].active = event.target.checked;
        show();
    };

    remove = () => {
        todos.splice(event.target.id, 1);
        show();
    };

    addTodoList.addEventListener("submit", (evt) => {
        todoMap = {
            "text": document.getElementById("todo").value,
            "active": false,
        };
        todos.push(todoMap);
        document.getElementById("todo").value = "";
        show();
        evt.preventDefault();
    });
})();