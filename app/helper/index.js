// Upload image on cloudinary
export const handleUploadImage = async (image) => {
  if (!image) return;

  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "ml_default"); // 👈 required

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dcrp1bwq8/image/upload",
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await res.json();

    return data?.secure_url;
  } catch (err) {
    console.error(err);
  }
};
