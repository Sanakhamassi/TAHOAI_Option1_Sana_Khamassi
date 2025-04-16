import { useState } from "react";
import { Upload, FileText } from "lucide-react";
import { classifyDocument } from "../services/classifier";
import toast from "react-hot-toast";

type ResponseData = {
  label: string;
  confidence: number;
};

export default function ClassifyForm() {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const [result, setResult] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);

    if (!text.trim() && !file) {
      const msg = "Please provide some text or upload a valid file.";
      toast.error(msg);
      setLoading(false);
      return;
    }

    try {
      const response = await classifyDocument(text, file);
      setResult(response);
    } catch (err: any) {
      const msg = err.response?.data?.detail || "Something went wrong.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl p-8 mx-auto mt-16 space-y-6 bg-white border shadow-xl rounded-3xl animate-fade-in">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        📄 Taho IA Document Classifier
      </h1>

      <div className="relative">
        <textarea
          id="text"
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-4 pt-6 text-sm border resize-none peer rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder=" Paste document text here..."
        />
        <label
          htmlFor="text"
          className="absolute text-sm text-gray-500 transition-all left-4 top-3 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400"
        ></label>
      </div>

      <label
        htmlFor="file-upload"
        className="flex items-center justify-center gap-2 px-4 py-3 text-sm text-gray-600 border border-dashed cursor-pointer bg-gray-50 rounded-xl hover:bg-gray-100"
      >
        <Upload className="w-4 h-4" />
        Upload .txt File
        <input
          id="file-upload"
          type="file"
          accept=".txt"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] || undefined)}
        />
      </label>

      {file && (
        <div className="flex items-center gap-2 px-2 text-sm text-gray-500">
          <FileText className="w-4 h-4" />
          {file.name}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-3 font-semibold text-white transition-all bg-blue-600 rounded-xl hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Classifying..." : "Classify Document"}
      </button>

      {result && (
        <div className="p-6 text-center border border-blue-200 bg-blue-50 rounded-xl">
          <div className="text-xl font-medium text-blue-800">
            Result: {result.label}
          </div>
          <div className="mt-1 text-sm text-blue-700">
            Confidence: {(result.confidence * 100).toFixed(2)}%
          </div>
        </div>
      )}
    </div>
  );
}
