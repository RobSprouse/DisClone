import React, { useState, useEffect } from "react";

const Profile = () => {
    // Define the initial user state
    const initialUser = {
        firstName: "N/A",
        lastName: "",
        email: "john.doe@example.com",
        age: 0,
        bio: "Create your bio here.",
    };

    // Load user data from localStorage, or use initialUser if not found
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(storedUser || initialUser);
    const [isEditing, setIsEditing] = useState(false);

    // Save user data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    // Function to handle signup event and reset user profile
    const handleSignup = () => {
        setUser(initialUser);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    return (
        <div className="container mx-auto p-4 dark:bg-white dark:text-slate-800">
            <h1 className="text-center text-3xl font-bold mb-4">Welcome to the Profile Page</h1>
            <div>
                <h2 className="text-xl font-bold mb-2">User Information</h2>
                <p>
                    <strong>Name:</strong>{" "}
                    {isEditing ? (
                        <>
                            <input type="text" name="firstName" value={user.firstName} onChange={handleChange} />
                            <input type="text" name="lastName" value={user.lastName} onChange={handleChange} />
                        </>
                    ) : (
                        <>
                            {user.firstName} {user.lastName}
                        </>
                    )}
                </p>
                <p>
                    <strong>Email:</strong>{" "}
                    {isEditing ? (
                        <input type="email" name="email" value={user.email} onChange={handleChange} />
                    ) : (
                        user.email
                    )}
                </p>
                <p>
                    <strong>Age:</strong>{" "}
                    {isEditing ? (
                        <input type="number" name="age" value={user.age} onChange={handleChange} />
                    ) : (
                        user.age
                    )}
                </p>
                <p>
                    <strong>Bio:</strong>{" "}
                    {isEditing ? (
                        <textarea name="bio" value={user.bio} onChange={handleChange} />
                    ) : (
                        user.bio
                    )}
                </p>
            </div>
            <div className="text-md px-4 py-2 rounded-xl hover:bg-sky-800 dark:hover:bg-sky-800">
                {isEditing ? (
                    <button onClick={handleSave}>Save</button>
                ) : (
                    <button onClick={handleEdit}>Edit</button>
                )}
            </div>
        </div>
    );
};

export default Profile;
