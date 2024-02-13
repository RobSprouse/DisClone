import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_CHANNEL } from "../../utils/mutations";
import { GET_ALL_CHANNELS, GET_USER } from "../../utils/queries";

const AddChannel = () => {
     const [name, setName] = useState("");
     const [image, setImage] = useState("");
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
          }
     };

     return (
          <div>
               <h1>Add Channel</h1>
               <form onSubmit={handleSubmit}>
                    <label>
                         Name:
                         <input type="text" value={name} onChange={handleNameChange} />
                    </label>
                    <label>
                         Image:
                         <input type="text" value={image} onChange={handleImageChange} />
                    </label>
                    <button type="submit" disabled={!name || !image}>
                         Add Channel
                    </button>
               </form>
          </div>
     );
};

export default AddChannel;
