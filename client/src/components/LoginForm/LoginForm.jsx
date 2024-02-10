import { useState, useContext, useCallback } from "react";
import { useMutation } from "@apollo/client";
import AccessTokenContext from "../../utils/AccessTokenContext.js";
import { LOGIN_USER } from "../../utils/mutations.js";
import "./loginForm.css";
import { Card, Input, Checkbox, Button, Typography } from "@material-tailwind/react";
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
          <>
            <div className="flex items-center justify-center mt-10">
               <Card color="transparent" shadow={false}>
                    <Typography variant="h4" color="blue-gray">
                         Log In
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                         Nice to meet you! Enter your details to register.
                    </Typography>
                    <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                         <div className="mb-1 flex flex-col gap-6">
                              <Typography variant="h6" color="blue-gray" className="-mb-3">
                                   Username
                              </Typography>
                              <Input
                                   type="text"
                                   name="username"
                                   value={userFormData.username}
                                   onChange={handleInputChange}
                                   required
                                   size="lg"
                                   placeholder="name@mail.com"
                                   autoComplete="username"
                                   className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                   labelProps={{
                                        className: "before:content-none after:content-none",
                                   }}
                              />
                              <Typography variant="h6" color="blue-gray" className="-mb-3">
                                   Password
                              </Typography>
                              <Input
                                   type="password"
                                   name="password"
                                   value={userFormData.password}
                                   onChange={handleInputChange}
                                   size="lg"
                                   placeholder="********"
                                   autoComplete="current-password"
                                   className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                   required
                                   labelProps={{
                                        className: "before:content-none after:content-none",
                                   }}
                              />
                         </div>
                         <Button type="submit" className="mt-6" fullWidth>
                              Log In
                         </Button>
                         <Typography color="gray" className="mt-4 text-center font-normal">
                              New to Disclone?{" "}
                              <a href="#" className="font-medium text-gray-900">
                                   Creat an account
                              </a>
                         </Typography>
                    </form>
               </Card>
            </div>
          </>
     );
}

export default LoginForm;
