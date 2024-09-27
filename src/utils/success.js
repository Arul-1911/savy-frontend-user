import { toast } from "react-toastify";

export const getSuccess = (success) => {
  const successMessage = success;

  if (successMessage) {
    toast.success(successMessage, toastOptions);
  }
  return successMessage;
};

export const toastOptions = {
  position: "top-right",
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};
