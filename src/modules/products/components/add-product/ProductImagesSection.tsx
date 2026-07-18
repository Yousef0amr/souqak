import React, { useState, useRef, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { CreateProductInput } from "../../services/productsService";
import { ImagePlus, X } from "lucide-react";

interface ProductImagesSectionProps {
  form: UseFormReturn<CreateProductInput>;
}

export default function ProductImagesSection({ form }: ProductImagesSectionProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize previews if form already has images (e.g. from existing data)
  useEffect(() => {
    const initialImages = form.getValues("images");
    if (initialImages && initialImages.length > 0 && previews.length === 0) {
      setPreviews(initialImages.map(file => typeof file === "string" ? file : URL.createObjectURL(file)));
    }
  }, [form.getValues("images")]);

  // Clean up object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      previews.forEach((url) => { if (url.startsWith("blob:")) URL.revokeObjectURL(url); });
    };
  }, [previews]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const currentFiles = form.getValues("images") || [];
      const updatedFiles = [...currentFiles, ...newFiles].slice(0, 5); // Max 5 images

      form.setValue("images", updatedFiles, { shouldValidate: true, shouldDirty: true });

      // Create previews
      const newPreviews = updatedFiles.map((file) => typeof file === "string" ? file : URL.createObjectURL(file));
      
      // Revoke old previews
      previews.forEach((url) => { if (url.startsWith("blob:")) URL.revokeObjectURL(url); });
      
      setPreviews(newPreviews);
    }
    
    // Reset input value so the same file can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    const currentFiles = form.getValues("images") || [];
    const updatedFiles = currentFiles.filter((_, i) => i !== index);
    form.setValue("images", updatedFiles, { shouldValidate: true, shouldDirty: true });
    
    setPreviews((prev) => {
      const newPreviews = [...prev];
      if (newPreviews[index].startsWith("blob:")) URL.revokeObjectURL(newPreviews[index]);
      newPreviews.splice(index, 1);
      return newPreviews;
    });
  };

  return (
    <div className="space-y-4 pt-4 border-t border-border">
      <div>
        <h3 className="text-sm font-semibold tracking-tight uppercase text-muted-foreground flex items-center gap-2 mb-3">
          <ImagePlus className="h-4 w-4" />
          Product Images
        </h3>
        
        <div className="grid grid-cols-5 gap-3">
          {previews.map((preview, idx) => (
            <div key={idx} className="relative aspect-square rounded-md overflow-hidden border border-border group bg-muted">
              <img src={preview} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          
          {previews.length < 5 && (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square rounded-md border-2 border-dashed border-muted-foreground/25 hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer flex flex-col items-center justify-center gap-1 text-muted-foreground"
            >
              <ImagePlus className="h-5 w-5" />
              <span className="text-[10px] font-medium text-center leading-tight px-1">Add Image</span>
            </div>
          )}
        </div>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          multiple
          className="hidden"
        />
        <p className="text-[10px] text-muted-foreground mt-2">
          Upload up to 5 images (JPEG, PNG). The first image will be the primary cover.
        </p>
      </div>
    </div>
  );
}
