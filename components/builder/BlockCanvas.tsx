"use client";

import { useBuilderStore } from '@/lib/store/builderStore';
import { GripVertical, Trash2, Copy } from 'lucide-react';
import { Block } from '@/types';

export default function BlockCanvas() {
    const { blocks, activeBlockId, setActiveBlock, removeBlock } = useBuilderStore();

    const handleDuplicate = (block: Block) => {
        const newBlock = {
            ...block,
            id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        };
        useBuilderStore.getState().addBlock(newBlock);
    };

    if (blocks.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center text-gray-400 p-8">
                <div className="text-center">
                    <p className="text-lg font-medium mb-2">No blocks yet</p>
                    <p className="text-sm">Add blocks from the library above to get started</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-auto p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Blocks</h3>
            <div className="space-y-2">
                {blocks.map((block, index) => (
                    <div
                        key={block.id}
                        onClick={() => setActiveBlock(block.id)}
                        className={`group p-3 rounded-lg border-2 transition cursor-pointer ${activeBlockId === block.id
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200 bg-white hover:border-indigo-300'
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <GripVertical size={16} className="text-gray-400 cursor-move" />
                                <span className="font-medium text-sm capitalize">{block.type.replace('-', ' ')}</span>
                                <span className="text-xs text-gray-500">#{index + 1}</span>
                            </div>

                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDuplicate(block);
                                    }}
                                    className="p-1.5 hover:bg-gray-100 rounded"
                                    title="Duplicate"
                                >
                                    <Copy size={14} className="text-gray-600" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeBlock(block.id);
                                    }}
                                    className="p-1.5 hover:bg-red-50 rounded"
                                    title="Delete"
                                >
                                    <Trash2 size={14} className="text-red-600" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
