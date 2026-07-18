import React, { useRef } from "react";
import { ImagePlus, X } from "lucide-react";

interface SingleImageUploadProps {
  value: string | File | null;
  onChange: (file: File | null) => void;
  label?: string;
  description?: string;
  className?: string;
}

export function SingleImageUpload({
  value,
  onChange,
  label = "Upload Image",
  description = "Upload a single image (JPEG, PNG).",
  className = "",
}: SingleImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Derive the preview URL from the value
  let previewUrl: string | null = null;
  if (value instanceof File) {
    previewUrl = URL.createObjectURL(value);
  } else if (typeof value === "string" && value) {
    previewUrl = value;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      onChange(file);
    }
    // Reset input value so the same file can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemove = () => {
    onChange(null);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <h3 className="text-sm font-semibold tracking-tight uppercase text-muted-foreground flex items-center gap-2 mb-2">
          <ImagePlus className="h-4 w-4" />
          {label}
        </h3>
      )}

      <div className="flex gap-4 items-center">
        {previewUrl ? (
          <div className="relative h-24 w-24 rounded-md overflow-hidden border border-border group bg-muted flex-shrink-0">
            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="h-24 w-24 flex-shrink-0 rounded-md border-2 border-dashed border-muted-foreground/25 hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer flex flex-col items-center justify-center gap-1 text-muted-foreground"
          >
            <ImagePlus className="h-6 w-6 mb-1" />
            <span className="text-[10px] font-medium text-center leading-tight px-1">Add Image</span>
          </div>
        )}

        <div className="flex-1">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          {previewUrl && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-2 text-xs font-medium text-primary hover:underline"
            >
              Change Image
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
