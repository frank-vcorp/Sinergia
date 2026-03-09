import React from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { X, ImageIcon } from 'lucide-react';

interface ImageGalleryProps {
    title: string;
    images: string[];
    onPaste: (e: React.ClipboardEvent) => void;
    onRemove: (index: number) => void;
    onImageClick: (index: number) => void;
    disabled?: boolean;
    bgColor?: string;
}

export function ImageGallery({
    title,
    images,
    onPaste,
    onRemove,
    onImageClick,
    disabled = false,
    bgColor = "bg-gray-50"
}: ImageGalleryProps) {
    return (
        <div className="mt-3">
            <Label className="text-xs font-semibold mb-1 block">{title}</Label>
            <div
                className={`border-2 border-dashed rounded min-h-[100px] flex flex-col items-center justify-center p-3 ${bgColor} mt-1 transition-all duration-200 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-primary/50'
                    }`}
                tabIndex={0}
                onPaste={onPaste}
            >
                {images.length > 0 ? (
                    <div className="w-full">
                        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                            {images.map((url, idx) => (
                                <div key={idx} className="relative group aspect-square">
                                    <img
                                        src={url}
                                        alt={`Evidencia ${idx + 1}`}
                                        className="h-full w-full object-cover rounded-md shadow-sm cursor-zoom-in hover:brightness-90 transition-all"
                                        onClick={() => onImageClick(idx)}
                                        loading="lazy"
                                    />
                                    {!disabled && (
                                        <Button
                                            size="icon"
                                            variant="destructive"
                                            className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 h-6 w-6 rounded-full shadow-md transition-opacity"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onRemove(idx);
                                            }}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <p className="text-[10px] sm:text-xs text-muted-foreground mt-3 flex items-center gap-1">
                            <span className="font-medium">{images.length}</span> imágenes • Pegar (Ctrl+V) para añadir más
                        </p>
                    </div>
                ) : (
                    <div className="text-center text-muted-foreground space-y-1 py-4">
                        <ImageIcon className="h-6 w-6 mx-auto opacity-20" />
                        <p className="text-xs">Haz clic aquí y presiona <kbd className="px-1 py-0.5 rounded bg-muted">CTRL+V</kbd></p>
                        <p className="text-[10px] opacity-70">Para añadir imágenes desde el portapapeles</p>
                    </div>
                )}
            </div>
        </div>
    );
}
