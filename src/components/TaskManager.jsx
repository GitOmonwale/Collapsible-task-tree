import React, { useState } from 'react';
import Task from './Task';
import { FaPlus } from "react-icons/fa6";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask = {
        id: Date.now(),
        title: newTaskTitle,
        completed: false,
        subtasks: [],
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
    }
  };

  const updateTask = (id, newTitle) => {
    setTasks(updateSubtasks(tasks, id, newTitle));
  };

  const updateSubtasks = (tasks, id, newTitle) => {
    return tasks.map((task) => {
      if (task.id === id) {
        return { ...task, title: newTitle };
      }
      return { ...task, subtasks: updateSubtasks(task.subtasks, id, newTitle) };
    });
  };

  const deleteTask = (id) => {
    setTasks(removeTask(tasks, id));
  };

  const removeTask = (tasks, id) => {
    return tasks
      .filter((task) => task.id !== id)
      .map((task) => ({
        ...task,
        subtasks: removeTask(task.subtasks, id),
      }));
  };

  const addSubtask = (parentId, subtaskTitle) => {
    const newSubtask = {
      id: Date.now(),
      title: subtaskTitle,
      completed: false,
      subtasks: [],
    };
    setTasks(addSubtaskToTask(tasks, parentId, newSubtask));
  };

  const addSubtaskToTask = (tasks, parentId, subtask) => {
    return tasks.map((task) => {
      if (task.id === parentId) {
        return { ...task, subtasks: [...task.subtasks, subtask] };
      }
      return { ...task, subtasks: addSubtaskToTask(task.subtasks, parentId, subtask) };
    });
  };

  return (
    <div className=''>
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        placeholder="Enter a new task"
        className='outline-none'
      />
      <button onClick={addTask} className='text-gray-500'><FaPlus/></button>
      <div>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={{ ...task, level: 0 }}
            onUpdate={updateTask}
            onDelete={deleteTask}
            onAddSubtask={addSubtask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
