"use client";

import { useBuilderStore } from '@/lib/store/builderStore';

export default function BlockSettings() {
    const { blocks, activeBlockId, updateBlock } = useBuilderStore();
    const activeBlock = blocks.find((b) => b.id === activeBlockId);

    if (!activeBlock) {
        return (
            <div className="p-6 text-center text-gray-400">
                <p>Select a block to edit its settings</p>
            </div>
        );
    }

    const handleChange = (key: string, value: any) => {
        updateBlock(activeBlock.id, { [key]: value });
    };

    return (
        <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Block Settings</h3>
            <div className="space-y-4">
                {/* Text Block Settings */}
                {activeBlock.type === 'text' && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                            <textarea
                                value={activeBlock.config.content || ''}
                                onChange={(e) => handleChange('content', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                rows={3}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Font Size (px)</label>
                            <input
                                type="number"
                                value={activeBlock.config.fontSize || 16}
                                onChange={(e) => handleChange('fontSize', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
                            <input
                                type="color"
                                value={activeBlock.config.color || '#000000'}
                                onChange={(e) => handleChange('color', e.target.value)}
                                className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Alignment</label>
                            <select
                                value={activeBlock.config.align || 'left'}
                                onChange={(e) => handleChange('align', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="left">Left</option>
                                <option value="center">Center</option>
                                <option value="right">Right</option>
                            </select>
                        </div>
                    </>
                )}

                {/* Image Block Settings */}
                {activeBlock.type === 'image' && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                            <input
                                type="text"
                                value={activeBlock.config.url || ''}
                                onChange={(e) => handleChange('url', e.target.value)}
                                placeholder="https://example.com/image.jpg"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
                            <input
                                type="text"
                                value={activeBlock.config.alt || ''}
                                onChange={(e) => handleChange('alt', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Aspect Ratio</label>
                            <select
                                value={activeBlock.config.aspectRatio || '16:9'}
                                onChange={(e) => handleChange('aspectRatio', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="16:9">16:9 (Landscape)</option>
                                <option value="4:3">4:3</option>
                                <option value="1:1">1:1 (Square)</option>
                                <option value="3:4">3:4 (Portrait)</option>
                            </select>
                        </div>
                    </>
                )}

                {/* Button Block Settings */}
                {activeBlock.type === 'button' && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                            <input
                                type="text"
                                value={activeBlock.config.text || ''}
                                onChange={(e) => handleChange('text', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Link URL</label>
                            <input
                                type="text"
                                value={activeBlock.config.url || ''}
                                onChange={(e) => handleChange('url', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
                            <input
                                type="color"
                                value={activeBlock.config.bgColor || '#6366f1'}
                                onChange={(e) => handleChange('bgColor', e.target.value)}
                                className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
                            <input
                                type="color"
                                value={activeBlock.config.textColor || '#ffffff'}
                                onChange={(e) => handleChange('textColor', e.target.value)}
                                className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                            />
                        </div>
                    </>
                )}

                {/* Newsletter Block Settings */}
                {activeBlock.type === 'newsletter' && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                value={activeBlock.config.title || ''}
                                onChange={(e) => handleChange('title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Placeholder</label>
                            <input
                                type="text"
                                value={activeBlock.config.placeholder || ''}
                                onChange={(e) => handleChange('placeholder', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                            <input
                                type="text"
                                value={activeBlock.config.buttonText || ''}
                                onChange={(e) => handleChange('buttonText', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </>
                )}

                {/* Generic message for other blocks */}
                {!['text', 'image', 'button', 'newsletter'].includes(activeBlock.type) && (
                    <p className="text-sm text-gray-500">Settings for {activeBlock.type} block coming soon...</p>
                )}
            </div>
        </div>
    );
}
