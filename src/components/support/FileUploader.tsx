import React, { useId } from "react";
import { Button } from "@/components/ui/button";
import { Paperclip } from "lucide-react";

interface FileUploaderProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  accept?: string;
}

export default function FileUploader({
  files,
  onFilesChange,
  accept,
}: FileUploaderProps) {
  const id = useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    onFilesChange(Array.from(e.target.files));
  };

  const removeAt = (idx: number) => {
    onFilesChange(files.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <div className="mt-2 rounded-md border border-dashed p-4">
        <input
          id={id}
          type="file"
          multiple
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />

        <label
          htmlFor={id}
          className="flex cursor-pointer flex-col items-center justify-center gap-2"
        >
          <div className="flex flex-col items-center">
            <Paperclip className="h-6 w-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Click to upload or drag and drop files here.
            </p>
            <p className="text-sm text-muted-foreground">
              PDF, JPG, PNG up to 10MB
            </p>
          </div>
        </label>

        {files.length > 0 && (
          <div className="mt-3 space-y-2">
            {files.map((f, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-md border px-3 py-2"
              >
                <span className="text-sm">{f.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAt(i)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
