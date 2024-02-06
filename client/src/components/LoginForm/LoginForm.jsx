import { useState, useContext, useCallback } from "react";
import { useMutation } from "@apollo/client";
import AccessTokenContext from "../../utils/AccessTokenContext.js";
import { LOGIN_USER } from "../../utils/mutations.js";
import "./loginForm.css";


function LoginForm() {
     const { setAccessToken } = useContext(AccessTokenContext);
     const [userFormData, setUserFormData] = useState({ username: "", password: "" });
     const [errorMessage, setErrorMessage] = useState(null);

     const handleCompleted = (data) => {
          // The login mutation has completed. Set the access token in the state.
          setAccessToken(data.login.accessToken);
     };

     const [login] = useMutation(LOGIN_USER, {
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
                    await login({ variables: { ...userFormData } });
                    setUserFormData({ username: "", password: "" });
                    setErrorMessage(null);
               } catch (err) {
                    setErrorMessage(
                         err.message.includes("Invalid username or password")
                              ? "Invalid username or password"
                              : err.message,
                    );
               }
          },
          [login, userFormData],
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
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={userFormData.password}
                    onChange={handleInputChange}
                    required
                    autoComplete="current-password"
               />
               <button disabled={!(userFormData.username && userFormData.password)} type="submit">
                    Log in
               </button>
               {errorMessage && <p>{errorMessage}</p>}
          </form>
     );
}

export default LoginForm;
