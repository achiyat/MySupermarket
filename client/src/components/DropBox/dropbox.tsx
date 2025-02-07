import { useRef, DragEvent, ChangeEvent, useState } from "react";
import "./dropbox.css";

interface DropBoxProps {
  images: string[];
  onImageChange: (images: string[]) => void;
}

export const DropBox = ({ images, onImageChange }: DropBoxProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>(images);

  const handleImageChange = (data: string) => {
    const newImages = [...imagePreviews, data];
    setImagePreviews(newImages);
    onImageChange(newImages);
  };

  const handleUrl = (url: string): string => {
    return url.endsWith(".jpg") ? url : extractImageUrl(url);
  };

  const extractImageUrl = (text: string): string => {
    const match = text.match(/imgurl=([^&]+)/);
    if (match && match[1]) {
      return decodeURIComponent(match[1]);
    }
    return "not found";
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const items = e.dataTransfer.items;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (item.kind === "string") {
        item.getAsString((content) => {
          if (item.type !== "text/html") {
            handleImageChange(handleUrl(content));
          } else {
            const urlMatch = content.match(/src=["'](https?:\/\/[^"']+)/i);
            if (urlMatch) {
              handleImageChange(handleUrl(urlMatch[1]));
            }
          }
        });
        break;
      } else if (item.kind === "file") {
        const file = item.getAsFile();
        if (file && file.type.startsWith("image/")) {
          const url = URL.createObjectURL(file);
          handleImageChange(handleUrl(url));
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
      handleImageChange(handleUrl(url));
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(updatedImages);
    onImageChange(updatedImages);
  };

  //   useEffect(() => {
  //     console.log(imagePreviews);
  //   }, [imagePreviews]);

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
