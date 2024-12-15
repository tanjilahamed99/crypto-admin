import axios from "axios";

const UploadImage = ({ setImg, name, img }) => {
  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      // Send the image to ImgBB
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.IMAGE_BB}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Get the image URL from the response
      const imageUrl = response.data.data.url;
      // Save the image URL to state or use it as needed
      setImg(imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-5">
      <input
        name={name}
        type="text"
        placeholder="Ex: http.."
        className="w-full pl-2 py-2 rounded-md"
        value={img} // Make it a controlled input
        readOnly // Optional: if you want it to be read-only since it's auto-filled
      />
      <div>
        <label
          htmlFor={`type3-2-${name}`}
          className="flex w-full max-w-[170px]"
        >
          <p className="w-max truncate rounded-full hover:shadow-[0px_0px_4px_0.5px] border-[3px] border-green-500 px-6 py-1.5 font-medium text-green-500 shadow-md">
            {"CHOOSE FILE"}
          </p>
        </label>
        <input
          onChange={handleImageUpload}
          className="hidden"
          type="file"
          name={name}
          id={`type3-2-${name}`}
        />
      </div>
    </div>
  );
};

export default UploadImage;
