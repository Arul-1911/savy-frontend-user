import { toast } from "react-toastify";

export const getError = (error) => {
  const errorMessage =
    error?.response?.data?.error?.message ||
    error?.data?.message ||
    error?.response ||
    error?.message ||
    "Something went wrong";

  if (errorMessage) {
    toast.error(errorMessage, toastOptions);
  }
  return errorMessage;
};

export const toastOptions = {
  position: "top-right",
  autoClose: 2000,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};
