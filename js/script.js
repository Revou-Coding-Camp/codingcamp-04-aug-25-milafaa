// Seleksi Elemen DOM
const todoForm = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('date-input');
const todoList = document.getElementById('todo-list');
const errorMessage = document.getElementById('error-message');
const noTaskMessage = document.getElementById('no-task-message');
const deleteAllButton = document.getElementById('delete-all-button');
const filterButton = document.getElementById('filter-button');
const deleteModal = document.getElementById('delete-modal');
const confirmDeleteButton = document.getElementById('confirm-delete-button');
const cancelDeleteButton = document.getElementById('cancel-delete-button');

// State Aplikasi
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all'; // 'all', 'pending', 'completed'

// Fungsi untuk menyimpan tasks ke localStorage
const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Fungsi utama untuk me-render (menggambar) daftar tugas
const renderTodos = () => {
    // 1. Kosongkan daftar yang ada
    todoList.innerHTML = '';

    // 2. Filter tugas berdasarkan state `currentFilter`
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'pending') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true; // untuk 'all'
    });

    // 3. Cek apakah ada tugas untuk ditampilkan
    if (filteredTasks.length === 0) {
        noTaskMessage.classList.remove('hidden');
    } else {
        noTaskMessage.classList.add('hidden');
        // 4. Loop melalui tugas yang sudah difilter dan buat elemennya
        filteredTasks.forEach(task => {
            const todoItem = document.createElement('div');
            // Menambahkan kelas untuk animasi
            todoItem.classList.add('grid', 'grid-cols-1', 'md:grid-cols-4', 'gap-4', 'items-center', 'bg-slate-800', 'p-3', 'rounded-lg', 'animate-fade-in');
            
            // Layout responsif untuk mobile
            todoItem.innerHTML = `
                <div class="col-span-1 md:col-span-1 break-words ${task.completed ? 'line-through text-slate-500' : 'text-white'}">
                    <span class="font-bold md:hidden">Task: </span>${task.text}
                </div>
                <div class="col-span-1 md:col-span-1 text-slate-400 text-sm">
                    <span class="font-bold md:hidden">Due: </span>${task.date}
                </div>
                <div class="col-span-1 md:col-span-1">
                    <button class="status-button text-white text-xs font-bold py-1 px-3 rounded-full transition duration-300 w-fit ${task.completed ? 'bg-green-500' : 'bg-yellow-500'}">
                        ${task.completed ? 'Completed' : 'Pending'}
                    </button>
                </div>
                <div class="col-span-1 md:col-span-1 flex justify-end">
                    <button class="delete-button text-red-500 hover:text-red-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                    </button>
                </div>
            `;
            
            todoList.appendChild(todoItem);
            
            // Tambahkan event listener ke tombol yang baru dibuat
            todoItem.querySelector('.status-button').addEventListener('click', () => {
                toggleTaskStatus(task.id);
            });
            
            todoItem.querySelector('.delete-button').addEventListener('click', () => {
                deleteTask(task.id);
            });
        });
    }
};

// --- Fungsi Aksi ---
const addTask = (text, date) => {
    const newTask = {
        id: Date.now(),
        text: text,
        date: date,
        completed: false
    };
    tasks.push(newTask);
    saveTasks();
    renderTodos();
};

const deleteTask = (id) => {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTodos();
};

const toggleTaskStatus = (id) => {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTodos();
    }
};

const deleteAllTasks = () => {
    tasks = [];
    saveTasks();
    renderTodos();
};

// --- Event Listeners ---
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    const taskDate = dateInput.value;
    if (taskText === '' || taskDate === '') {
        errorMessage.classList.remove('hidden');
        return;
    }
    errorMessage.classList.add('hidden');
    addTask(taskText, taskDate);
    todoForm.reset();
    taskInput.focus();
});

filterButton.addEventListener('click', () => {
    if (currentFilter === 'all') {
        currentFilter = 'pending';
        filterButton.textContent = 'Filter: Pending';
    } else if (currentFilter === 'pending') {
        currentFilter = 'completed';
        filterButton.textContent = 'Filter: Completed';
    } else {
        currentFilter = 'all';
        filterButton.textContent = 'Filter: All';
    }
    renderTodos();
});

// Event Listeners untuk Modal
deleteAllButton.addEventListener('click', () => {
    deleteModal.classList.remove('hidden');
});

cancelDeleteButton.addEventListener('click', () => {
    deleteModal.classList.add('hidden');
});

confirmDeleteButton.addEventListener('click', () => {
    deleteAllTasks();
    deleteModal.classList.add('hidden');
});

// Render awal saat halaman dimuat
renderTodos();
