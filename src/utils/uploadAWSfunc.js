import { useDispatch } from "react-redux";
import axiosInstance from "./axiosUtil";
import { getError } from "./error";





export const uploadAudio = async (file, token, percentHandler) => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("audio", file);

    const options = {
      onUploadProgress: (progressEvent) => {
        if (progressEvent.lengthComputable) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          percentHandler(percent);
          console.log(`${progressEvent.loaded}B of ${progressEvent.total}B | ${percent}%`);
        }
      },
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    };

    const { data } = await axiosInstance.post("/api/admin/audio", bodyFormData, options);
    console.log("Audio data:",data);

    if (data) {
      console.log("location", data.s3Response.Location);
      return data.s3Response.Location;
    }
  } catch (err) {
    return { error: getError(err) };
  }
};



export const uploadImage = async (file, token, percentHandler) => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        percentHandler(percent);
        console.log(`${loaded}kb of ${total}kb | ${percent}`);
      },
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    };
    const { data } = await axiosInstance.post(
      "/api/admin/image",
      bodyFormData,
      options
    );
    console.log("Image data:",data);
    if (data) {      
      console.log("location", data.s3Response.Location);
      return data.s3Response.Location;
    }
  } catch (err) {
    return { error: getError(err) };
  }
};
