
import React, { useState, useEffect, useRef } from 'react';
import '../Component/Content.css';
import '../Component/SearchHeader.css'
import { HiOutlineSearch } from "react-icons/hi";

import { Separator } from "@/components/ui/separator"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Content = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editTask, setEditTask] = useState(null); 
  const inputRef = useRef(null);

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(localStorageData);
    setFilteredTasks(localStorageData);
  }, []);

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setFilteredTasks(updatedTodos);
  };

  const searchCategory = () => {
    const inputVal = inputRef.current.value.trim().toLowerCase();
    const filtered = todos.filter(task =>
      task.title.toLowerCase().includes(inputVal) ||
      task.description.toLowerCase().includes(inputVal) ||
      task.category.toLowerCase().includes(inputVal) ||
      task.date.toLowerCase().includes(inputVal)
    );
    setFilteredTasks(filtered);
  };

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredTasks(todos);
    } else {
      const filtered = todos.filter(task => task.category.toLowerCase() === category);
      setFilteredTasks(filtered);
    }
  };

  const handleEdit = (task) => {
    setEditTask(task);
  };

  return (
    <>
      <section className='search-header'>
        <div className='w-full h-full flex items-center justify-around'>
          <div className="title-text">
            <h1>
              Category
            </h1>
            <Separator />
            <div className="category-selector">
              <span onClick={() => filterByCategory('all')} className={`category m-2 hover-category ${selectedCategory === 'all' ? 'active' : ''}`}>all</span>
              <Separator className='h-4' orientation="vertical" />
              <span onClick={() => filterByCategory('okay')} className={`category m-2 hover-category ${selectedCategory === 'okay' ? 'active' : ''}`}>okay</span>
              <Separator className='h-4' orientation="vertical" />
              <span onClick={() => filterByCategory('intermediate')} className={`category m-2 hover-category ${selectedCategory === 'intermediate' ? 'active' : ''}`}>intermediate</span>
              <Separator className='h-4' orientation="vertical" />
              <span onClick={() => filterByCategory('urgent')} className={`category m-2 hover-category ${selectedCategory === 'urgent' ? 'active' : ''}`}>urgent</span>
            </div>
          </div>
          <div className="search-div">
            <HiOutlineSearch onClick={searchCategory} className='search-icon' />
            <input ref={inputRef} type='text' placeholder='search..' />
          </div>
        </div>
      </section>
      <section className='content-section'>
        <div className="boxes-div">
          {filteredTasks.map((task, index) => (
            <div key={index} className="box poppins-medium">
              <div className="icons">
                <Dialog>
                  <DialogTrigger>
                    <div className='edit-icon icon-hover' onClick={() => handleEdit(task)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.862 3.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L8.582 18.07a4.5 4.5 0 0 1-1.897 1.13L4 20l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L17.5 6.125M16 13v4.75A2.25 2.25 0 0 1 13.75 20H3.25A2.25 2.25 0 0 1 1 17.75V7.25A2.25 2.25 0 0 1 3.25 5H8" />
                      </svg>
                    </div>
                  </DialogTrigger>
                  {editTask && (
                    <DialogContent className='bg-slate-800 text-white'>
                      <DialogHeader>
                        <DialogTitle className='m-4 poppins-bold'>Edit Task</DialogTitle>
                        <DialogDescription>
                          <div className='task-form bg-slate-800 rounded-sm h-full w-full flex flex-col items-center justify-evenly p-4'>
                            <input type="text" className='title-input m-4' value={editTask.title} onChange={(e) => setEditTask({ ...editTask, title: e.target.value })} />
                            <textarea value={editTask.description} onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}></textarea>
                            <div className="date-category-div m-4">
                              <select className='rounded-md m-2 px-2 py-1 ' value={editTask.category} onChange={(e) => setEditTask({ ...editTask, category: e.target.value })}>
                                <option value="all">All</option>
                                <option value="okay">Okay</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="urgent">Urgent</option>
                              </select>
                              <input className='rounded-md m-2 px-2 py-1' type="date" value={editTask.date} onChange={(e) => setEditTask({ ...editTask, date: e.target.value })} />
                            </div>
                            <button className='m-4 add-button' onClick={() => {
                              const updatedTasks = todos.map(item => item.id === editTask.id ? editTask : item);
                              setTodos(updatedTasks);
                              localStorage.setItem('todos', JSON.stringify(updatedTasks));
                              setFilteredTasks(updatedTasks);
                              setEditTask(null);
                            }}>Save</button>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  )}
                </Dialog>

                <Dialog>
                  <DialogTrigger>
                    <div className='delete-icon icon-hover' >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        <button onClick={() => { deleteTodo(task.id) }} className='bg-slate-500 text-white px-4 py-2 rounded-md mx-4 poppins-regular'>yes</button>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
              <h1 className='poppins-extrabold'>{task.title}</h1>
              <p>{task.description}</p>
              <p className='date-text poppins-light'>Date: <br />{task.date}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Content;
