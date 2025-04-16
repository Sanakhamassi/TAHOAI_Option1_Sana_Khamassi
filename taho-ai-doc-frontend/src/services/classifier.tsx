import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const classifyDocument = async (text?: string, file?: File) => {
  const formData = new FormData();

  if (text?.trim()) formData.append("text", text);
  if (file) formData.append("file", file);

  const response = await axios.post(`${apiUrl}/classify`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
