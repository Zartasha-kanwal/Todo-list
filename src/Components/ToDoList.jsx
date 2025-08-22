import React, { useEffect, useRef, useState } from "react";
import { TodoItems } from "./TodoItems";
import Swal from "sweetalert2";

export const ToDoList = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const [editingId, setEditingId] = useState(null);
  const inputRef = useRef();

 

const add = () => {
  const inputText = inputRef.current.value.trim();
  if (inputText === "") return;

  if (editingId) {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === editingId ? { ...todo, text: inputText } : todo
      )
    );
    setEditingId(null);
    Swal.fire("Updated!", "Your task was updated.", "success");
  } else {
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    setTodoList((prev) => [...prev, newTodo]);
    Swal.fire("Added!", "New task added successfully.", "success");
  }

  inputRef.current.value = "";
};

const deleteItem = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This task will be deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      setTodoList((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
      Swal.fire("Deleted!", "Your task has been deleted.", "success");
    }
  });
};

const toggle = (id) => {
  setTodoList((prevTodo) =>
    prevTodo.map((todo) => {
      if (todo.id === id) {
        const updated = { ...todo, isComplete: !todo.isComplete };

        if (updated.isComplete) {
          Swal.fire("✅ Completed!", "Task is marked as completed.", "success");
        } else {
          Swal.fire("↩️ Unchecked!", "Task is marked as incomplete.", "info");
        }

        return updated;
      }
      return todo;
    })
  );
};



  const editItem = (id, text) => {
    inputRef.current.value = text;
    setEditingId(id);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-sm:mx-3 max-sm:mt-16 bg-[#FAF7F3] rounded-xl px-3 py-4 my-6 mx-auto shadow-md overflow-y-auto">
      {/* Title */}
      <div className="flex gap-2 items-center justify-center py-3">
        <i className="fa-solid fa-clipboard-list text-xl sm:text-2xl text-[#493628]"></i>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#493628]">
          To Do List
        </h1>
      </div>

      {/* Input box */}
      <div className="flex items-center py-2 px-3 rounded-full bg-slate-200 overflow-hidden">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add your task"
          className="flex-1 border-none outline-none bg-transparent placeholder:text-slate-400 text-sm sm:text-base"
        />
        <button
          onClick={add}
          className="rounded-full cursor-pointer px-3 py-2 sm:px-4 sm:py-2 bg-green-800 text-white font-bold text-xs sm:text-sm"
        >
          {editingId ? "UPDATE" : "ADD +"}
        </button>
      </div>

      {/* Todo list box */}
      <div className="mt-3">
        {todoList.map((item) => (
          <TodoItems
            key={item.id}
            text={item.text}
            id={item.id}
            isComplete={item.isComplete}
            deleteItem={deleteItem}
            toggle={toggle}
            editItem={editItem}
          />
        ))}
      </div>
    </div>
  );
};
