import React, { useEffect, useState } from "react";
import { EditForm } from "../components";
import { getError } from "../utils/error";
import axiosInstance from "../utils/axiosUtil";

export default function EditProfileModel(props) {
  const [error, setError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [user, setUser] = useState(null);

  const userData = {
    email: "",
    fullname: "",
    mobile: "",
  };
  const userAttr = [
    {
      type: "text",
      props: {
        label: "Fullname",
        name: "fullname",
      },
    },

    {
      type: "text",
      props: {
        label: "Email",
        name: "email",
        required: true,
      },
    },
    {
      type: "text",
      props: {
        label: "Mobile No.",
        name: "mobile",
      },
    },
  ];
  const [info, setInfo] = useState(userData);

  useEffect(() => {
    // const getProfile = async()=>{
    //     try {
    //       dispatch(showLoading());
    //       const response = await axiosInstance.get('/api/user/profile',{
    //         headers:{
    //           Authorization: token,
    //         }
    //       });
    //       console.log(response);
    // const {user}= response.data;
    //        setUser(user)
    //       dispatch(hideLoading());
    //     } catch (error) {
    //       dispatch(hideLoading());
    //       setError(getError(error));
    //     }
    //   }
    // if (user) {
    //   console.log({ user })
    //   setInfo({
    //     email: user.email,
    //     fullname: user.fullname,
    //     mobile: user.mobile,
    //   });
    // }
    // (async () => {
    //     await getProfile();
    //   })();
  }, [props.show]);

  const resetForm = () => {
    setInfo(userData);
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // dispatch(showLoading());
      const response = await axiosInstance.put("/api/admin/update", {
        fullname: info.firstname,
        email: info.email,
        mobile: info.mobile,
      });
      // dispatch(hideLoading());
      const { user, success } = response.data;

      if (success) {
        setUpdateSuccess(success);
        resetForm();
        // dispatch(userSignin(user,token))
      }
    } catch (error) {
      // dispatch(hideLoading());
      setError(getError(error));
    }
  };

  return (
    <EditForm
      {...props}
      title="Update Profile"
      data={info}
      setData={setInfo}
      inputFieldProps={userAttr}
      submitHandler={submitHandler}
      target=""
      successMessage="User Updated Successfully! Redirecting..."
      reducerProps={{ error, updateSuccess }}
    ></EditForm>
  );
}
