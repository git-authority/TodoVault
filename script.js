document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // render saved tasks
    tasks.forEach(task => renderTask(task));


    // add task button functionality
    addTaskButton.addEventListener('click', () => {
        const taskText = todoInput.value.trim();
        if (taskText === '') return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            isCompleted: false
        };

        tasks.push(newTask);
        saveTasks();

        // Add the newly added task in the todo list on the webpage
        renderTask(newTask);

        todoInput.value = "";
        todoInput.focus();
    });

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTask(task) {

        const li = document.createElement('li');
        li.classList.add('task');
        li.setAttribute('data-id', task.id);


        // For CSS - Strikethrough
        if (task.isCompleted) li.classList.add("completed");


        // Add Todo Feature
        li.innerHTML = `
            <span>${task.text}</span>
            <button>Delete</button>
        `;

        todoList.appendChild(li);



        // Strike through feature on each li
        li.addEventListener("click", (e) => {
            if (e.target.tagName === 'BUTTON') return;
            task.isCompleted = !task.isCompleted;
            li.classList.toggle("completed");
            saveTasks();
        });



        // Delete Feature
        li.querySelector('button').addEventListener('click', (e) => {

            e.stopPropagation();


            li.classList.add('removing');


            setTimeout(() => {

                tasks = tasks.filter(t => t.id !== task.id);

                saveTasks();

                if (li.parentNode) li.parentNode.removeChild(li);

            }, 240);
        });


    }

});
