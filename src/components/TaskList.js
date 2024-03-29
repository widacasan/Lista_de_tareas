import React, { useState } from 'react';
import Task from './Task';
import '../styles/TaskList.css';
import {  IoSendSharp } from 'react-icons/io5'; //icono

/**
 * Componente que representa una lista de tareas.
 *
 * @component
 * @returns {JSX.Element} Elemento JSX que representa una lista de tareas.
 */
function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  /**
   * Maneja el cambio de valor del campo de texto para la nueva tarea.
   * @param {Object} event - Objeto de evento del cambio.
   */
  const handleNewTaskChange = (event) => {//cambio de valor del campo de texto para la nueva tarea. 
    setNewTask(event.target.value);
  };

  /**
   * Agrega una nueva tarea a la lista de tareas.
   */
  const handleAddTask = () => {//agrega una nueva tarea a la lista de tareas
    if (newTask.trim() !== '') {
      const task = {
        id: Date.now(),
        text: newTask,
        completed: false,
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  /**
   * Marca una tarea como completada o pendiente.
   * @param {number} taskId - ID de la tarea.
   */
  const completeTask = (taskId) => {//marca una tarea como completada o pendiente
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  /**
   * Edita el texto de una tarea.
   * @param {number} taskId - ID de la tarea.
   * @param {string} newText - Nuevo texto de la tarea.
   */
  const editTask = (taskId, newText) => {//edita el texto de una tarea
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, text: newText };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  /**
   * Elimina una tarea de la lista.
   * @param {number} taskId - ID de la tarea.
   */
  const deleteTask = (taskId) => {//elimina una tarea de la lista
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  /**
   * Filtra las tareas según el tipo de filtro seleccionado.
   * @param {string} filterType - Tipo de filtro ('all', 'completed' o 'pending').
   */
  const filterTasks = (filterType) => {//filtra las tareas según el tipo de filtro seleccionado.
    setFilter(filterType);
  };

  /**
   * Filtra las tareas de acuerdo al tipo de filtro seleccionado.
   */
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') {
      return task.completed;
    } else if (filter === 'pending') {
      return !task.completed;
    }
    return true;
  });

  return (
    <div className="task-list">
      <div className="task-container">
        <input
          type="text"
          value={newTask}
          onChange={handleNewTaskChange}
          placeholder="Nueva tarea"
        />
        <button onClick={handleAddTask} className="task-button">
        <IoSendSharp />
        </button>
      </div>
      <div className="button-group">
        <button onClick={() => filterTasks('all')}>Todas</button>
        <button onClick={() => filterTasks('completed')}>Completadas</button>
        <button onClick={() => filterTasks('pending')}>Pendientes</button>
      </div>
      <ul className="task-list-items">
        {filteredTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            completeTask={completeTask}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
