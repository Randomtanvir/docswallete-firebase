export const uploadMultipleImagesToCloudinary = async (
  files,
  folderName = "uploads"
) => {
  const cloudName = "dlz30x9zm";
  const uploadPreset = "doscwallere";

  const uploadPromises = Array.from(files).map(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", folderName);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`Failed to upload image: ${errorData.error.message}`);
    }

    const data = await res.json();
    return data.secure_url; // ✅ a string URL
  });

  const imageUrls = await Promise.all(uploadPromises); // ✅ array of strings
  return imageUrls;
};
