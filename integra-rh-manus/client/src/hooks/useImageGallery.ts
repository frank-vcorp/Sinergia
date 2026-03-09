import { useState } from 'react';
import { toast } from 'sonner';

interface UseImageGalleryProps {
    initialImages: string[];
    processId: string;
    tipoDocumento: string;
    onUpdate: (newImages: string[]) => void;
    uploadMutation: {
        mutateAsync: (data: any) => Promise<{ url: string }>;
    };
}

export function useImageGallery({
    initialImages,
    processId,
    tipoDocumento,
    onUpdate,
    uploadMutation
}: UseImageGalleryProps) {
    const [isUploading, setIsUploading] = useState(false);

    const handlePaste = async (e: React.ClipboardEvent) => {
        e.preventDefault();
        const items = e.clipboardData.items;
        let blob: File | null = null;

        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf("image") !== -1) {
                blob = items[i].getAsFile();
                break;
            }
        }

        if (!blob) {
            toast.error("No se detectó imagen en el portapapeles");
            return;
        }

        // Validaciones basicas
        if (blob.size > 5 * 1024 * 1024) {
            toast.error("La imagen excede los 5MB permitidos");
            return;
        }

        try {
            setIsUploading(true);
            toast.info("Subiendo imagen...");

            const arrayBuf = await blob.arrayBuffer();
            const bytes = new Uint8Array(arrayBuf);
            let binary = '';
            for (let i = 0; i < bytes.byteLength; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            const base64 = btoa(binary);

            const res = await uploadMutation.mutateAsync({
                procesoId: processId,
                tipoDocumento,
                fileName: `paste-${Date.now()}.png`,
                contentType: blob.type,
                base64
            });

            const newImages = [...initialImages, res.url];
            onUpdate(newImages);
            toast.success("Imagen guardada correctamente");
        } catch (err: any) {
            console.error(`[ImageGallery] Error subiendo ${tipoDocumento}:`, err);
            toast.error("Error al subir imagen");
        } finally {
            setIsUploading(false);
        }
    };

    const removeImage = (index: number) => {
        const newImages = initialImages.filter((_, i) => i !== index);
        onUpdate(newImages);
        toast.success("Imagen eliminada");
    };

    return {
        handlePaste,
        removeImage,
        isUploading
    };
}
