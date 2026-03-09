import { useState } from 'react';

export function useLightbox() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [section, setSection] = useState<string | null>(null);

    const openLightbox = (index: number, sectionName: string) => {
        setCurrentIndex(index);
        setSection(sectionName);
        setIsOpen(true);
    };

    const closeLightbox = () => {
        setIsOpen(false);
        setSection(null);
    };

    const nextImage = (total: number) => {
        setCurrentIndex((prev) => Math.min(prev + 1, total - 1));
    };

    const prevImage = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    return {
        isOpen,
        setIsOpen,
        currentIndex,
        setCurrentIndex,
        section,
        openLightbox,
        closeLightbox,
        nextImage,
        prevImage
    };
}
