import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask() {
    if (!newTaskTitle) return;

    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      isComplete: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
  }

  function handleToggleTaskCompletion(id: number) {
    const updatedTaskList = tasks.map((task) =>
      task.id === id ? { ...task, isComplete: !task.isComplete } : task
    );

    setTasks([...updatedTaskList]);
  }

  function handleRemoveTask(id: number) {
    const updatedTaskList = tasks.filter((task) => task.id !== id);
    setTasks([...updatedTaskList]);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={({ target }) => setNewTaskTitle(target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(({ id, isComplete, title }) => (
            <li key={id}>
              <div className={isComplete ? "completed" : ""} data-testid="task">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={isComplete}
                    onClick={() => handleToggleTaskCompletion(id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
