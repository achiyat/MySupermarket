import { useRef, useState, DragEvent, ChangeEvent, useEffect } from "react";
import "./dropbox.css";

export const DropBox = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const items = e.dataTransfer.items;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (item.kind === "string") {
        item.getAsString((content) => {
          if (item.type !== "text/html") {
            setImagePreviews((prev) => [...prev, content]);
          } else {
            const urlMatch = content.match(/src=["'](https?:\/\/[^"']+)/i);
            if (urlMatch) {
              setImagePreviews((prev) => [...prev, urlMatch[1]]);
            }
          }
        });
        break;
      } else if (item.kind === "file") {
        const file = item.getAsFile();
        if (file && file.type.startsWith("image/")) {
          const url = URL.createObjectURL(file);
          setImagePreviews((prev) => [...prev, url]);
          break;
        }
      }
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setImagePreviews((prev) => [...prev, url]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    console.log(imagePreviews);
  }, [imagePreviews]);

  return (
    <>
      <div
        className={`dropbox ${isDragging ? "dragging" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragging(false);
        }}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <p className="dropbox-text">
          Drag & Drop Images Here or Click to Upload
        </p>
        <input
          ref={fileInputRef}
          type="file"
          className="file-input"
          accept="image/*"
          onChange={handleFileSelect}
        />
      </div>

      {imagePreviews.length > 0 && (
        <div className="image-preview-container">
          {imagePreviews.map((src, index) => (
            <div key={index} className="image-preview">
              <img src={src} alt={`Preview ${index + 1}`} />
              <button
                type="button"
                className="remove"
                onClick={() => handleRemoveImage(index)}
                aria-label="Remove image"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
