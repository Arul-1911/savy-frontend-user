import { toast } from "react-toastify";

export const getError = (error) => {
  console.log(error)
  const errorMessage = error?.response?.data?.error?.message || error?.data?.message || error?.response || error?.message || 'Something went wrong';
  
  if (errorMessage) {
    toast.error(errorMessage, toastOptions);
  }
  console.log(errorMessage);
  return errorMessage;
};

export const toastOptions = {
  position: "bottom-center",
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};