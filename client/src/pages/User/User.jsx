import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate, Link } from "react-router-dom";
import { GET_ALL_USERS } from "../../utils/queries"; 


const UserList = () => {
    const { loading, error, data } = useQuery(GET_ALL_USERS);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            setUsers(data.getAllUsers);
        }
    }, [data]);

    const handleAddUser = async (userId, payload) => {
        try {
            console.log("Adding user with ID:", userId);
            // Navigate to the messages page with specific parameters
            navigate("/messages", { state: { id: userId, type: "user" } });
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching users: {error.message}</p>;

    if (users.length === 0) {
        return <p>No users found.</p>;
    }

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        <div>
                            <p>{user.username}</p>
                        </div>
                        <button onClick={() => handleAddUser(user._id, { key: "value" })}>
                            Add User
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
