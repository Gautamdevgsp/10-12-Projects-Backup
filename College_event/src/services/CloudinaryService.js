const cloudName = "dhyi9ueu8";
const uploadPreset = "images";
const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

const CloudinaryService = {
  async upload(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    try {
      const res = await fetch(uploadUrl, { method: "POST", body: formData });
      if (!res.ok) throw new Error("Image upload failed");
      const data = await res.json();
      return data.secure_url;
    } catch (error) {
      console.log(error);
      throw new Error("Image upload failed");
    }
  },
};

export default CloudinaryService;
