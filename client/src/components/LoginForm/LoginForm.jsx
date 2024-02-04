import { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import AccessTokenContext from "../../utils/AccessTokenContext.js";
import { LOGIN_USER } from "../../utils/mutations.js";

function LoginForm() {
          
     const [userFormData, setUserFormData] = useState({ username: "", password: "" });
     const setAccessToken = useContext(AccessTokenContext);

     const [login, { data }] = useMutation(LOGIN_USER, {
          onCompleted: (data) => {
               // The login mutation has completed. Set the access token in the state.
               setAccessToken(data.login.accessToken);
          },
     });

     const handleInputChange = (event) => {
          const { name, value } = event.target;
          setUserFormData({ ...userFormData, [name]: value });
     };

     const handleSubmit = async (event) => {
          event.preventDefault();

          try {
               const response = await login({
                    variables: { ...userFormData },
               });
          } catch (err) {
               console.error(err);
          }
          setUserFormData({ username: "", password: "" });
     };

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
          </form>
     );
}

export default LoginForm;
