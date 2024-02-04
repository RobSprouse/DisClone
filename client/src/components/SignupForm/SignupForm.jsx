import { useState, useContext, useCallback } from "react";
import { useMutation } from "@apollo/client";
import AccessTokenContext from "../../utils/AccessTokenContext.js";
import { SIGNUP_USER } from "../../utils/mutations.js";

function SignUpForm() {
     const setAccessToken = useContext(AccessTokenContext);

     const [userFormData, setUserFormData] = useState({
          username: "",
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          image: "",
     });

     const [errorMessage, setErrorMessage] = useState(null);

     const handleCompleted = (data) => {
          // The signup mutation has completed. Set the access token in the state.
          setAccessToken(data.signup.accessToken);
     };

     const [signup] = useMutation(SIGNUP_USER, {
          onCompleted: handleCompleted,
     });

     const handleInputChange = useCallback((event) => {
          const { name, value } = event.target;
          setUserFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
     }, []);

     const handleSubmit = useCallback(
          async (event) => {
               event.preventDefault();

               try {
                    await signup({ variables: { ...userFormData } });

                    setUserFormData({
                         username: "",
                         email: "",
                         password: "",
                         firstName: "",
                         lastName: "",
                         image: "",
                    });
                    setErrorMessage(null);
               } catch (err) {
                    setErrorMessage(
                         err.message.includes("E11000 duplicate key error collection")
                              ? "Username or email already exists"
                              : err.message,
                    );
               }
          },
          [signup, userFormData],
     );

     return (
          <form onSubmit={handleSubmit}>
               <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={userFormData.username}
                    onChange={handleInputChange}
                    required
                    autoComplete="username"
               />
               <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={userFormData.email}
                    onChange={handleInputChange}
                    required
                    autoComplete="email"
               />
               <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={userFormData.password}
                    onChange={handleInputChange}
                    required
                    autoComplete="new-password"
               />
               <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={userFormData.firstName}
                    onChange={handleInputChange}
                    required
               />
               <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={userFormData.lastName}
                    onChange={handleInputChange}
                    required
               />
               <input
                    type="text"
                    placeholder="Image URL"
                    name="image"
                    value={userFormData.image}
                    onChange={handleInputChange}
               />
               <button
                    disabled={
                         !(
                              userFormData.username &&
                              userFormData.email &&
                              userFormData.password &&
                              userFormData.firstName &&
                              userFormData.lastName
                         )
                    }
                    type="submit"
               >
                    Sign Up
               </button>
               {errorMessage && <p>{errorMessage}</p>}
          </form>
     );
}

export default SignUpForm;
