import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_CHANNEL } from "../../utils/mutations";
import { GET_ALL_CHANNELS, GET_USER } from "../../utils/queries";
import "../AddChannel/AddChannel.css";

const AddChannel = () => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [showModal, setShowModal] = useState(false); // State to control the modal visibility
    const navigate = useNavigate();
  
    const [addChannel] = useMutation(ADD_CHANNEL, {
      refetchQueries: [{ query: GET_ALL_CHANNELS }, { query: GET_USER }],
    });
  
    const handleNameChange = (event) => {
      setName(event.target.value);
    };
  
    const handleImageChange = (event) => {
      setImage(event.target.value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const { data } = await addChannel({
          variables: { name, image },
        });
        navigate(`/channels`);
      } catch (error) {
        console.error("Error adding channel:", error);
        alert("Error adding channel");
      }
    };
  
    const openModal = () => {
      setShowModal(true);
    };
  
    const closeModal = () => {
      setShowModal(false);
      setErrorMessage("");
    };
  
    return (
      <div>
        <h1 className="text-3xl text-center mt-5 dark:text-teal-100">Add Channel</h1>
        <div className="flex justify-center">
        <button className="text-xl dark:text-teal-100 px-4 py-2 rounded-xl hover:bg-sky-800 dark:hover:bg-sky-800" onClick={openModal}>Create Channel</button>
        </div>
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <button className="exit-button" onClick={closeModal}>
                &times;
              </button>
              <h2 className="text-center">Add Channel</h2>
              <form onSubmit={handleSubmit}>
                <label>
                  Name:
                  <input type="text" value={name} onChange={handleNameChange} placeholder="Enter Channel Name" />
                </label>
                <label>
                  Image:
                  <input type="text" value={image} onChange={handleImageChange} placeholder="Enter Channel Image URL" />
                </label>
                <div className="button-container flex items-center justify-center px-4 py-2 rounded-xl hover:bg-sky-800">
                <button type="submit" disabled={!name || !image}>
                  Add Channel
                </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default AddChannel;
