const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "images");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dhyi9ueu8/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error?.message || "Image upload failed");
  }

  const data = await res.json();
  return data.secure_url;
};

export default uploadImage;
