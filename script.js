document.addEventListener('DOMContentLoaded', function() {
	// initialize todos array
	let todos = [];

	// retrieve todos from local storage
	if (localStorage.getItem('todos')) {
		todos = JSON.parse(localStorage.getItem('todos'));
		displayTodos();
	}

	// add todo when form is submitted
	document.querySelector('#todo-form').addEventListener('submit', function(event) {
		event.preventDefault();
		let todoText = document.querySelector('#todo-input').value;
		if (todoText) {
			addTodo({
				text: todoText,
				checked: false
			});
			document.querySelector('#todo-input').value = '';
		}
	});

	// add todo to list
	function addTodo(todo) {
		todos.push(todo);
		localStorage.setItem('todos', JSON.stringify(todos));
		displayTodos();
	}

	// display todos in list
	function displayTodos() {
		let html = '';
		todos.forEach(function(todo, index) {
			html += '<div class="todo-item';
			if (todo.checked) {
				html += ' checked';
			}
			html += '">';
			html += '<input type="checkbox" class="todo-check" data-index="' + index + '"';
			if (todo.checked) {
				html += ' checked';
			}
			html += '>';
			html += '<span style="color: white;" class="todo-text">' + todo.text + '</span>';
			html += '<button class="btn btn-danger todo-delete" data-index="' + index + '">Delete</button>';
			html += '</div>';
		});
		document.querySelector('#todo-list').innerHTML = html;
	}

	// toggle todo checked state
	document.addEventListener('change', function(event) {
		if (event.target.classList.contains('todo-check')) {
			let index = event.target.getAttribute('data-index');
			todos[index].checked = event.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));
			displayTodos();
		}
	});

	// delete todo 
	document.addEventListener('click', function(event) {
		if (event.target.classList.contains('todo-delete')) {
			let index = event.target.getAttribute('data-index');
			todos.splice(index, 1);
			localStorage.setItem('todos', JSON.stringify(todos));
			displayTodos();
		}
	});
});
