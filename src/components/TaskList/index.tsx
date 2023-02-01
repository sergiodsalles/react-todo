import styles from "./styles.module.css";

import { Trash } from "phosphor-react";
import { useState } from "react";

interface Task {
  id: string;
  description: string;
  completed: boolean;
}

export const TaskList = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);

  const [newTaskName, setNewTaskName] = useState("");

  const completedTasksCount =
    taskList.filter(({ completed }) => completed)?.length || 0;

  const handleChangeTaskNameInput = (event: any) => {
    setNewTaskName(event.target.value);
  };

  const handleNewTaskFormSubmit = (event: any) => {
    event.preventDefault();
    const newTask: Task = {
      id: new Date().toISOString(),
      description: newTaskName,
      completed: false,
    };
    setTaskList((state) => [...state, newTask]);
    setNewTaskName("");
  };

  const handleTaskCheckboxChange = (event: any) => {
    const newList = taskList
      .map((task) => {
        if (task.id === event.target.value) {
          return { ...task, completed: event.target.checked };
        }
        return task;
      })
      .sort((taskA, taskB) => (taskA.completed ? 1 : taskB.completed ? -1 : 0));
    setTaskList(newList);
  };

  const handleDeleteTask = (id: string) => {
    const taskListWithouDeletedOne = taskList.filter((task) => task.id !== id);
    setTaskList(taskListWithouDeletedOne);
  };

  return (
    <main className={styles.taskListContainer}>
      <form
        onSubmit={handleNewTaskFormSubmit}
        className={styles.taskFormContainer}
      >
        <input
          type="text"
          onChange={handleChangeTaskNameInput}
          value={newTaskName}
          placeholder="Add a new task"
        />
        <button type="submit">Create</button>
      </form>

      <div className={styles.taskList}>
        <header>
          <div className={styles.totalTasks}>
            Total tasks{" "}
            <span className={styles.countBadge}>{taskList.length}</span>
          </div>
          <div className={styles.doneTasks}>
            Done{" "}
            <span className={styles.countBadge}>
              {completedTasksCount} of {taskList.length}
            </span>
          </div>
        </header>

        {taskList ? (
          <ul>
            {taskList.map((task) => (
              <li
                key={task.id}
                className={task.completed ? styles.taskCompleted : styles.task}
              >
                <div>
                  <input
                    onChange={handleTaskCheckboxChange}
                    type="checkbox"
                    id={task.id}
                    value={task.id}
                  />
                  <label htmlFor={task.id}>{task.description}</label>
                </div>
                <Trash onClick={() => handleDeleteTask(task.id)} size={18} />
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.noTasksContainer}>
            <strong>No tasks created</strong>
            <p>Create tasks and organize your todo list</p>
          </div>
        )}
      </div>
    </main>
  );
};
