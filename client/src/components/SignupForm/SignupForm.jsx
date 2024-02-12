import { useState, useContext, useCallback } from "react";
import { useMutation } from "@apollo/client";
import AccessTokenContext from "../../utils/AccessTokenContext.js";
import { SIGNUP_USER } from "../../utils/mutations.js";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";

function SignUpForm() {
     const { setAccessToken } = useContext(AccessTokenContext);
     const navigate = useNavigate();

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
                    navigate("/");
               } catch (err) {
                    setErrorMessage(
                         err.message.includes("E11000 duplicate key error collection")
                              ? "Username or email already exists"
                              : err.message,
                    );
               }
          },
          [signup, userFormData, navigate],
     );

     return (
          <>
               <div className="backgroundImage"></div>

               <div className="flex items-center justify-center mt-10">
                    <Card color="transparent" shadow={false}>
                         <Typography variant="h4" color="blue-gray" className="text-teal-100 text-center">
                              Sign Up
                         </Typography>
                         <Typography color="gray" className="mt-1 font-normal text-teal-100 text-center">
                              Welcome to Disclone! Enter your details to register.
                         </Typography>
<<<<<<< HEAD
                         <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 items-center justify-center bg-teal-100 shadow-2xl shadow-teal-300 rounded-3xl">
=======
                         <form
                              onSubmit={handleSubmit}
                              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 items-center justify-center bg-cyan-100 shadow-2xl shadow-cyan-300 rounded-3xl"
                         >
>>>>>>> main
                              <div className="mb-1 flex flex-col gap-6 p-5">
                                   <Typography variant="h6" color="blue-gray" className="-mb-3">
                                        First Name
                                   </Typography>
                                   <Input
                                        type="text"
                                        name="firstName"
                                        value={userFormData.firstName}
                                        onChange={handleInputChange}
                                        required
                                        size="lg"
                                        placeholder="First Name"
                                        autoComplete="name"
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                             className: "before:content-none after:content-none",
                                        }}
                                   />
                                   <Typography variant="h6" color="blue-gray" className="-mb-3">
                                        Last Name
                                   </Typography>
                                   <Input
                                        type="text"
                                        name="lastName"
                                        value={userFormData.lastName}
                                        onChange={handleInputChange}
                                        required
                                        size="lg"
                                        placeholder="Last Name"
                                        autoComplete="lastname"
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                             className: "before:content-none after:content-none",
                                        }}
                                   />
                                   <Typography variant="h6" color="blue-gray" className="-mb-3">
                                        Email
                                   </Typography>
                                   <Input
                                        type="text"
                                        name="email"
                                        value={userFormData.email}
                                        onChange={handleInputChange}
                                        required
                                        size="lg"
                                        placeholder="email@example.com"
                                        autoComplete="email"
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                             className: "before:content-none after:content-none",
                                        }}
                                   />
                                   <Typography variant="h6" color="blue-gray" className="-mb-3">
                                        UserName
                                   </Typography>
                                   <Input
                                        type="text"
                                        name="username"
                                        value={userFormData.username}
                                        onChange={handleInputChange}
                                        required
                                        size="lg"
                                        placeholder="username"
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
                              <div className="flex justify-center">
                                   <Button type="submit" className="mt-2" size="lg">
                                        Sign Up
                                   </Button>
                              </div>
                              <Typography color="gray" className="mt-4 mb-4 text-center font-normal">
                                   Already have an account?{" "}
                                   <Link to="/login" className="font-medium text-gray-900">
                                        Log In
                                   </Link>
                              </Typography>
                         </form>
                    </Card>
               </div>
          </>
     );
}

export default SignUpForm;
