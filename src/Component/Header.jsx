
import React, { useState } from 'react';
import '../Component/Header.css';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

const Header = ({ passArrayToParent }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [showDialog, setShowDialog] = useState(false); // State to control dialog visibility
  const { toast } = useToast()

  const addTodo = () => {
    const newTodo = {
      id: Date.now(),
      title: title,
      description: description,
      category: category,
      date: date
    };

    const existingTodos = JSON.parse(localStorage.getItem('todos')) || [];
    const updatedTodos = [...existingTodos, newTodo];

    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    passArrayToParent(updatedTodos);

    setTitle('');
    setDescription('');
    setCategory('');
    setDate('');
    setShowDialog(false); // Close the dialog after adding task
  };

  return (
    <>
      <section className='header-section'>
        <div className='logo-text'>
          Todo
        </div>
        <Dialog>
          <DialogTrigger>
            <button className='new-task-button' onClick={() => setShowDialog(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              New Task
            </button>
          </DialogTrigger>
          {showDialog && ( // Render dialog only if showDialog is true
            <DialogContent className='bg-slate-900 text-white'>
              <DialogHeader>
                <DialogTitle className='m-4  poppins-bold' >Add Your Task</DialogTitle>
                <DialogDescription >
                  <form onSubmit={e => {
                    e.preventDefault();
                    addTodo();
                  }} className="task-form bg-slate-800 rounded-sm h-full w-full flex flex-col items-center justify-evenly p-4">
                    <input type="text" placeholder='Title' className='m-4 title-input' onChange={(e) => e.target.value === '' ? alert("empty field") : setTitle(e.target.value)} />
                    <textarea rows={4} cols={50} placeholder='more about your task' onChange={e => setDescription(e.target.value)} ></textarea>
                    <div className='date-category-div m-4'>
                      <select onChange={e => setCategory(e.target.value)} placeholder='choose the level' className='m-4 category px-2 py-1 rounded-md'>
                        <option>okayy</option>
                        <option>intermediate</option>
                        <option>urgent</option>
                      </select>
                      <input onChange={e => setDate(e.target.value)} className='m-4 date-input px-2 py-1 rounded-md' type='date' />
                    </div>
                    <button onClick={() => {
                      toast({
                        title: "Scheduled: Catch up ",
                        description: "Friday, February 10, 2023 at 5:57 PM",
                        action: (
                          <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
                        ),
                      })
                    }} className='m-4 add-button'>add</button> {/* Change button type to submit */}
                  </form>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          )}
        </Dialog>
      </section>
    </>
  );
}

export default Header;

