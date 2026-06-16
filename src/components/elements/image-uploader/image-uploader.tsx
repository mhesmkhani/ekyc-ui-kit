import { File as FileIcon, ImageOff, ImagePlus, X, ZoomIn } from 'lucide-react';
import React, { forwardRef, useEffect, useRef, useState } from 'react';

import type { ImageUploaderProps, PreviewFile } from './image-uploader.props';

const ImagePreviewModal = ({ isOpen, onClose, imageUrl, imageName }: { isOpen: boolean; onClose: () => void; imageUrl: string; imageName: string }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={onClose}>
      <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center p-4">
        <button onClick={onClose} className="absolute top-4 right-4 bg-white text-black rounded-full p-2 hover:bg-gray-100 z-10">
          <X size={20} />
        </button>
        <img src={imageUrl} alt={imageName} className="max-w-full max-h-full object-contain" onClick={(e) => e.stopPropagation()} />
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">{imageName}</div>
      </div>
    </div>
  );
};

const ImageUploader = forwardRef<HTMLDivElement, ImageUploaderProps>(
  (
    {
      title = 'Upload Image',
      subtitle = 'Click or drag image here',
      accept = 'image/*',
      multiple = false,
      maxSize = 5, // MB
      value,
      onChange,
      onError,
      onRemove,
      disabled = false,
      className = '',
      preview = true,
      placeholder,
      enableZoom = false,
    },
    ref,
  ) => {
    const [isDragging, setIsDragging] = useState(false);
    const [previewFiles, setPreviewFiles] = useState<PreviewFile[]>([]);
    const [zoomModal, setZoomModal] = useState<{
      isOpen: boolean;
      imageUrl: string;
      imageName: string;
    }>({
      isOpen: false,
      imageUrl: '',
      imageName: '',
    });
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (value) {
        if (typeof value === 'string') {
          const isBase64 = value.startsWith('data:');

          setPreviewFiles([
            {
              file: {} as File,
              url: value,
              name: isBase64 ? 'uploaded image' : 'uploaded file',
              size: 0,
            },
          ]);
        } else if (Array.isArray(value) && typeof value[0] === 'string') {
          const previews = (value as string[]).map((url, index) => {
            const isBase64 = url.startsWith('data:');
            return {
              file: {} as File,
              url,
              name: isBase64 ? `uploaded image ${index + 1}` : `uploaded file ${index + 1}`,
              size: 0,
            };
          });
          setPreviewFiles(previews);
        } else if (value instanceof File) {
          const url = URL.createObjectURL(value);
          setPreviewFiles([
            {
              file: value,
              url,
              name: value.name,
              size: value.size,
            },
          ]);
        } else if (Array.isArray(value) && value[0] instanceof File) {
          const previews = (value as File[]).map((file) => ({
            file,
            url: URL.createObjectURL(file),
            name: file.name,
            size: file.size,
          }));
          setPreviewFiles(previews);
        }
      } else {
        setPreviewFiles([]);
      }
    }, [value]);

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) {
        setIsDragging(true);
      }
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      if (disabled) return;

      const files = Array.from(e.dataTransfer.files);
      handleFiles(files);
    };

    const handleClick = (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest('.zoom-button')) {
        return;
      }

      if (!disabled && inputRef.current) {
        inputRef.current.click();
      }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const files = Array.from(e.target.files);
        handleFiles(files);
      }
    };

    const handleFiles = (files: File[]) => {
      const validFiles = files.filter((file) => {
        if (accept !== '*' && accept !== '') {
          const acceptedTypes = accept.split(',').map((type) => type.trim());
          const fileType = file.type;
          const fileExtension = `.${file.name.split('.').pop()}`;

          return acceptedTypes.some((type) => type === fileType || (type.endsWith('/*') && fileType.startsWith(type.replace('/*', ''))) || type === fileExtension);
        }
        return true;
      });

      const sizeValidFiles = validFiles.filter((file) => {
        if (file.size > maxSize * 1024 * 1024) {
          onError?.(`File ${file.name} exceeds ${maxSize}MB`);
          return false;
        }
        return true;
      });

      if (sizeValidFiles.length === 0) return;

      const filesToProcess = multiple ? sizeValidFiles : [sizeValidFiles[0]];

      const newPreviews = filesToProcess.map((file) => ({
        file,
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
      }));

      setPreviewFiles(newPreviews);
      onChange?.(multiple ? filesToProcess : filesToProcess[0]);
    };

    const removeFile = (index: number) => {
      const newPreviews = previewFiles.filter((_, i) => i !== index);
      setPreviewFiles(newPreviews);

      if (multiple) {
        onChange?.(newPreviews.map((p) => p.file));
      } else {
        if (onRemove) {
          onRemove();
        } else {
          onChange?.(newPreviews[0]?.file || (null as any));
        }
      }
    };

    const openZoomModal = (imageUrl: string, imageName: string) => {
      setZoomModal({
        isOpen: true,
        imageUrl,
        imageName,
      });
    };

    const closeZoomModal = () => {
      setZoomModal({
        isOpen: false,
        imageUrl: '',
        imageName: '',
      });
    };

    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
    };

    const isImage = (file: PreviewFile) => {
      if (file.file && file.file.type) {
        return file.file.type.startsWith('image/');
      }
      if (file.url.startsWith('data:image/')) {
        return true;
      }

      return file.url.match(/\.(jpg|jpeg|png|gif|webp)$/i) !== null;
    };

    return (
      <div ref={ref} className={`w-full ${className}`}>
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-lg p-4 
            transition-all duration-200 cursor-pointer 
            h-[280px] w-full flex flex-col
            ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
            ${disabled ? 'opacity-75 cursor-not-allowed' : ''}
            ${previewFiles.length > 0 ? 'bg-gray-50' : 'bg-white'}
          `}
        >
          {/* Title */}
          <div className="text-center mb-3 flex-shrink-0">
            <h3 className="text-sm font-medium text-gray-700 border-b pb-2">{title}</h3>
          </div>

          {/* Center Content - Fixed height area */}
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            {previewFiles.length > 0 && preview ? (
              <div className={'w-full h-full flex items-center justify-center'}>
                {previewFiles.map((preview, index) => (
                  <div key={index} className="relative group">
                    {isImage(preview) ? (
                      <div className="w-full h-[150px] bg-gray-100 rounded-lg overflow-hidden relative">
                        <img src={preview.url} alt={preview.name} className="w-full h-full object-cover" />

                        {enableZoom && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openZoomModal(preview.url, preview.name);
                            }}
                            className="zoom-button absolute top-2 left-2 bg-black bg-opacity-50 text-white rounded-full p-1
                                     opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-opacity-75"
                            title="بزرگنمایی"
                          >
                            <ZoomIn size={14} />
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="w-full h-[150px] flex flex-col items-center justify-center bg-gray-100 rounded-lg">
                        <FileIcon size={32} className="text-gray-400 mb-2" />
                        <span className="text-xs text-gray-600 text-center px-2 line-clamp-2">{preview.name}</span>
                      </div>
                    )}

                    {/* Remove Button */}
                    {!disabled && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(index);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1
                                 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      >
                        <X size={14} />
                      </button>
                    )}

                    {/* File Size */}
                    {preview.size > 0 && (
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50
                                    text-white text-xs p-1 rounded-b-lg text-center"
                      >
                        {formatFileSize(preview.size)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center">
                {placeholder || (
                  <>
                    {value !== null ? (
                      <ImageOff size={60} className="mx-auto text-gray-400 mb-2" />
                    ) : disabled ? (
                      <ImageOff size={60} className="mx-auto text-gray-400 mb-2" />
                    ) : (
                      <ImagePlus size={48} className="mx-auto text-gray-400 mb-2" />
                    )}
                    <p className="text-sm text-gray-500">{value !== null ? '' : disabled ? '' : 'انتخاب فایل'}</p>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Subtitle */}
          <div className="text-center mt-3 flex-shrink-0">
            <p className="text-xs text-gray-500">{subtitle}</p>
          </div>
        </div>

        <input ref={inputRef} type="file" accept={accept} multiple={multiple} onChange={handleFileChange} disabled={disabled} className="hidden" />

        {/* Zoom Modal */}
        <ImagePreviewModal isOpen={zoomModal.isOpen} onClose={closeZoomModal} imageUrl={zoomModal.imageUrl} imageName={zoomModal.imageName} />
      </div>
    );
  },
);

ImageUploader.displayName = 'ImageUploader';

export default ImageUploader;
