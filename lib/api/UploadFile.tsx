export const uploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "usitech"); // đổi bằng preset của bạn

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    console.log(data.url);
    return data.url;
  };
