import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
const Task = ({ task, onUpdate, onDelete, onAddSubtask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // Gère la visibilité des sous-tâches
  const [newTitle, setNewTitle] = useState(task.title);
  const [subtaskTitle, setSubtaskTitle] = useState('');

  const handleUpdate = () => {
    onUpdate(task.id, newTitle);
    setIsEditing(false);
  };

  const handleAddSubtask = () => {
    if (subtaskTitle.trim()) {
      onAddSubtask(task.id, subtaskTitle);
      setSubtaskTitle('');
    }
  };

  return (
    <div className={`pl-2 ${`ml-${(task.level || 0) * 5}`}`}>
      <div className='flex gap-6 items-center'>
        <div>
          <span onClick={() => setIsExpanded(!isExpanded)} className='cursor-pointer font-bold'>
            {isExpanded ? '▼' : '►'} {/* Icône pour montrer ou cacher les sous-tâches */}
          </span>
          {isEditing ? (
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onBlur={handleUpdate}
              autoFocus
            />
          ) : (
            <span onDoubleClick={() => setIsEditing(true)}>{task.title}</span>
          )}
        </div>
        <div className='flex gap-2 text-sm'>
          <button onClick={() => onDelete(task.id)} className='text-gray-500 hover:text-red-600 transition'><FaTrash /></button>
          <button onClick={() => setIsEditing(true)} className='text-gray-500 hover:text-blue-600 transition'><FaPen /></button>
        </div>
      </div>

      {/* Formulaire pour ajouter une sous-tâche */}
      {isExpanded && (
        <div className='ml-5'>
          <input
            type="text"
            value={subtaskTitle}
            onChange={(e) => setSubtaskTitle(e.target.value)}
            placeholder="Add a subtask"
            className='outline-none'
          />
          <button onClick={handleAddSubtask} className='text-gray-500'><FaPlus /></button>
        </div>
      )}

      {/* Affichage récursif des sous-tâches */}
      {isExpanded && task.subtasks.map((subtask) => (
        <Task
          key={subtask.id}
          task={{ ...subtask, level: (task.level || 0) + 1 }}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onAddSubtask={onAddSubtask}
        />
      ))}
    </div>
  );
};

export default Task;
