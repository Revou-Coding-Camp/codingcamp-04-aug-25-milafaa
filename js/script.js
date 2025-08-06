document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const taskInput = document.getElementById('task-input');
    const dateInput = document.getElementById('date-input');
    const todoList = document.getElementById('todo-list');
    const errorMessage = document.getElementById('error-message');

    // Fungsi untuk menampilkan tugas di UI
    const displayTodo = (task, date) => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('bg-gray-800', 'p-4', 'rounded-lg', 'flex', 'items-center', 'justify-between', 'transition', 'duration-300', 'animate-fade-in');

        const todoContent = document.createElement('div');
        
        const taskText = document.createElement('p');
        taskText.classList.add('font-semibold');
        taskText.textContent = task;

        const dateText = document.createElement('p');
        dateText.classList.add('text-sm', 'text-gray-400');
        dateText.textContent = date;

        todoContent.appendChild(taskText);
        todoContent.appendChild(dateText);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Hapus';
        deleteButton.classList.add('text-red-500', 'hover:text-red-700', 'font-semibold', 'py-1', 'px-3', 'rounded-md', 'transition', 'duration-300');
        
        // Event listener untuk menghapus tugas
        deleteButton.addEventListener('click', () => {
            todoItem.classList.add('animate-fade-out');
            setTimeout(() => {
                todoList.removeChild(todoItem);
            }, 300);
        });

        todoItem.appendChild(todoContent);
        todoItem.appendChild(deleteButton);

        todoList.appendChild(todoItem);
    };

    // Event listener untuk form submission
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Mencegah form dari reload halaman

        const task = taskInput.value.trim();
        const date = dateInput.value;

        // Validasi input
        if (task === '' || date === '') {
            errorMessage.classList.remove('hidden');
            return;
        } else {
            errorMessage.classList.add('hidden');
        }

        displayTodo(task, date);

        // Reset form fields
        taskInput.value = '';
        dateInput.value = '';
    });

    // Menambahkan beberapa animasi sederhana dengan CSS
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeOut {
            from { opacity: 1; transform: scale(1); }
            to { opacity: 0; transform: scale(0.9); }
        }
        .animate-fade-out {
            animation: fadeOut 0.3s ease-in forwards;
        }
    `;
    document.head.appendChild(style);
});