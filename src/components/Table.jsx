// import React from 'react'
import axios from "axios";
import {
  MdOutlineDeleteOutline,
  MdEditNote,
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import React, { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Table = ({ todo, setTodo, isLoading }) => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [editText, setEditText] = useState({"body": ""})

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/todoApp/${id}/`
      );
      const newList = todo.filter((td) => td.id !== id);
      setTodo(newList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id, data) => {
    const response = await axios.patch(
      `http://127.0.0.1:8000/api/todoApp/${id}/`,
      data
    );
    const newTodo = todo.map((td) => (td.id === id ? response.data : td));
    setTodo(newTodo);
  };

  const handleCheckBox = async (id, data) => {
    console.log(id, !data);
    handleEdit(id, { completed: !data });
  };

  const handleChange = (e) => {
    setEditText(prev => ({
        ...prev, 'body': e.target.value
    }));
    
  }

  const handleClick = () => {
    handleEdit(editText.id, editText)
    closeModal()
  }


  return (
    <div className="py-5 ">
      <table className="w-11/12 max-w-2xl">
        <thead className="border-b-2 border-black">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Checkbox
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              To Do
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Status
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Created At
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {!isLoading &&
            todo.map((item, index) => (
              <tr key={index} className="border-b border-black">
                <td className="p-3">
                  <span
                    onClick={() => handleCheckBox(item.id, item.completed)}
                    className="text-2xl cursor-pointer inline-block"
                  >
                    {item.completed ? (
                      <MdOutlineCheckBox />
                    ) : (
                      <MdOutlineCheckBoxOutlineBlank />
                    )}
                  </span>
                </td>
                <td className="p-3 text-sm">{item.body}</td>
                <td className="p-3 text-sm text-center">
                  <span
                    className={`p-1.5 text-xs font-medium tracking-wider rounded-md ${
                      item.completed ? "bg-green-300" : "bg-red-300"
                    } `}
                  >
                    {item.completed ? "Done" : "Incomplete"}
                  </span>
                </td>
                <td className="p-3 text-sm">
                  {new Date(item.created_At).toLocaleString()}
                </td>
                <td className="p-3 text-sm font-medium grid grid-flow-col items-center mt-1">
                  <span className="text-2xl cursor-pointer">
                  <button onClick={openModal}><MdEditNote onClick={()=>setEditText(item)} /></button>
                  </span>
                  <span className="text-2xl cursor-pointer">
                    <MdOutlineDeleteOutline
                      onClick={() => handleDelete(item.id)}
                    />
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)} className="font-bold text-lg">Edit Todo</h2>
        <input type="text" placeholder="Type here" onChange={handleChange} value={editText.body} className="input w-full my-4 p-1 mt-8 border-black border-2 rounded" />
        <button onClick={closeModal} className="btn bg-black p-2 rounded-sm text-white">close</button>
        <button onClick={handleClick} className="btn bg-black p-2 rounded-sm mx-1 text-white">Edit</button>
        
      </Modal>
    </div>
  );
};

export default Table;
