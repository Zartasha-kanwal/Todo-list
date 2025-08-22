import React from "react";

export const TodoItems = ({ text, id, isComplete, deleteItem, toggle, editItem }) => {
  return (
    <div className="flex items-center justify-between gap-2 my-4 px-2 flex-wrap sm:flex-nowrap">
      <div
        className="flex flex-1 gap-2 items-center cursor-pointer min-w-0"
        onClick={() => toggle(id)}
      >
        <i
          className={`fa-regular fa-circle-check shrink-0 ${
            isComplete ? "text-orange-500" : "text-gray-400"
          }`}
        ></i>

        <p
          className={`text-lg font-medium truncate ${
            isComplete ? "text-orange-500" : "text-black"
          }`}
        >
          {text}
        </p>
      </div>

      {/* buttons */}
      <div className="flex gap-3 shrink-0">
        {/* Edit */}
        <i
          onClick={() => editItem(id, text)}
          className="fa-solid fa-pen cursor-pointer text-blue-600"
        ></i>

        {/* Delete */}
        <i
          onClick={() => deleteItem(id)}
          className="fa-solid fa-trash cursor-pointer text-red-800"
        ></i>
      </div>
    </div>
  );
};
