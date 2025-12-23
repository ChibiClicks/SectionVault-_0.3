"use client";

import { useState } from 'react';
import { Upload, Loader } from 'lucide-react';
import Image from 'next/image';
import { useBuilderStore } from '@/lib/store/builderStore';
import { Block } from '@/types';

export default function ImageUploader() {
    const [uploading, setUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const addBlock = useBuilderStore((state) => state.addBlock);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Image size should be less than 5MB');
            return;
        }

        setUploading(true);

        try {
            // Create preview URL
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);

            // In a real app, you'd upload to Supabase Storage here
            // For now, we'll use the local object URL

            // Auto-generate a section with the uploaded image
            const imageBlock: Block = {
                id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                type: 'image',
                config: {
                    url: objectUrl,
                    alt: file.name.replace(/\.[^/.]+$/, ''),
                    aspectRatio: '16:9',
                },
            };

            addBlock(imageBlock);

            // Optional: Add a text block below the image
            setTimeout(() => {
                const textBlock: Block = {
                    id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    type: 'text',
                    config: {
                        content: 'Add your heading here',
                        fontSize: '32',
                        color: '#000000',
                        align: 'center',
                    },
                };
                addBlock(textBlock);
            }, 100);

            // Reset after 2 seconds
            setTimeout(() => {
                setPreviewUrl(null);
            }, 2000);

        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            // Create a synthetic event
            const input = document.createElement('input');
            input.type = 'file';
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            input.files = dataTransfer.files;

            handleFileSelect({ target: input } as any); // eslint-disable-line @typescript-eslint/no-explicit-any
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <div className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">📸 Upload Image & Generate Section</h3>

            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-indigo-300 rounded-lg p-6 text-center hover:border-indigo-500 transition cursor-pointer bg-white"
            >
                {uploading ? (
                    <div className="flex flex-col items-center gap-2">
                        <Loader className="animate-spin text-indigo-600" size={32} />
                        <p className="text-sm text-gray-600">Generating section...</p>
                    </div>
                ) : previewUrl ? (
                    <div className="space-y-2">
                        <Image
                            src={previewUrl}
                            alt="Preview"
                            width={200}
                            height={128}
                            className="max-h-32 mx-auto rounded object-contain"
                            unoptimized
                        />
                        <p className="text-sm text-green-600 font-medium">✓ Section generated!</p>
                    </div>
                ) : (
                    <label className="cursor-pointer">
                        <Upload className="mx-auto text-indigo-600 mb-2" size={32} />
                        <p className="text-sm font-medium text-gray-700 mb-1">
                            Drag & drop an image or click to browse
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 5MB</p>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                    </label>
                )}
            </div>

            <p className="text-xs text-gray-600 mt-2 text-center">
                We&apos;ll auto-create an image block + text heading for you
            </p>
        </div>
    );
}
