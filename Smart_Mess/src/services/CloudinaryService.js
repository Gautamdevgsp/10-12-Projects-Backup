import axios from "axios";
import { toast } from "react-toastify";

const cloudName = "dhyi9ueu8";
const folder = "smartmess";
const uploadPreset = "images";
const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

const CloudinaryService = {
  async upload(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", folder);
    try {
      const res = await axios.post(uploadUrl, formData);
      return res.data.secure_url;
    } catch (error) {
      console.log(error);
      toast.error("Image upload failed");
      return "";
    }
  },
};

export default CloudinaryService;
