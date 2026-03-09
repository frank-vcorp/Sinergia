import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface LightboxViewerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    images: string[];
    currentIndex: number;
    onNext: () => void;
    onPrev: () => void;
}

export function LightboxViewer({
    open,
    onOpenChange,
    title,
    images,
    currentIndex,
    onNext,
    onPrev
}: LightboxViewerProps) {
    if (images.length === 0) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl w-[95vw] p-0 overflow-hidden sm:rounded-lg">
                <DialogHeader className="p-4 border-b bg-muted/30">
                    <DialogTitle className="text-sm font-medium flex items-center gap-2">
                        <Maximize2 className="h-4 w-4 text-primary" />
                        {title}
                    </DialogTitle>
                </DialogHeader>

                <div className="relative bg-black/5 flex items-center justify-center min-h-[300px] max-h-[80vh]">
                    <img
                        src={images[currentIndex]}
                        alt={`Vista ampliada ${currentIndex + 1}`}
                        className="w-full h-full max-h-[70vh] object-contain select-none animate-in fade-in zoom-in-95 duration-300"
                    />

                    <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <Button
                            variant="secondary"
                            size="icon"
                            className="rounded-full shadow-lg opacity-80 hover:opacity-100 disabled:opacity-0 transition-all"
                            onClick={onPrev}
                            disabled={currentIndex === 0}
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </Button>
                    </div>

                    <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <Button
                            variant="secondary"
                            size="icon"
                            className="rounded-full shadow-lg opacity-80 hover:opacity-100 disabled:opacity-0 transition-all"
                            onClick={onNext}
                            disabled={currentIndex === images.length - 1}
                        >
                            <ChevronRight className="h-6 w-6" />
                        </Button>
                    </div>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                        <div className="bg-black/60 text-white text-[10px] sm:text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                            {currentIndex + 1} / {images.length}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
