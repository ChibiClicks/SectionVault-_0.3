"use client";

import { useBuilderStore } from '@/lib/store/builderStore';
import { Block } from '@/types';
import { Type, Image, MousePointerClick, Grid3x3, MessageSquare, ShoppingBag, Mail, HelpCircle } from 'lucide-react';

const blockTypes = [
    { type: 'text' as const, icon: Type, label: 'Text', color: 'bg-blue-100 text-blue-600' },
    { type: 'image' as const, icon: Image, label: 'Image', color: 'bg-purple-100 text-purple-600' },
    { type: 'button' as const, icon: MousePointerClick, label: 'Button', color: 'bg-green-100 text-green-600' },
    { type: 'features' as const, icon: Grid3x3, label: 'Features', color: 'bg-yellow-100 text-yellow-600' },
    { type: 'testimonial' as const, icon: MessageSquare, label: 'Testimonial', color: 'bg-pink-100 text-pink-600' },
    { type: 'product-grid' as const, icon: ShoppingBag, label: 'Products', color: 'bg-indigo-100 text-indigo-600' },
    { type: 'newsletter' as const, icon: Mail, label: 'Newsletter', color: 'bg-cyan-100 text-cyan-600' },
    { type: 'faq' as const, icon: HelpCircle, label: 'FAQ', color: 'bg-orange-100 text-orange-600' },
];

// Default configurations for each block type
const getDefaultConfig = (type: Block['type']) => {
    switch (type) {
        case 'text':
            return { content: 'Your text here', fontSize: '16', color: '#000000', align: 'left' };
        case 'image':
            return { url: '', alt: 'Image', aspectRatio: '16:9' };
        case 'button':
            return { text: 'Click me', url: '#', bgColor: '#6366f1', textColor: '#ffffff' };
        case 'features':
            return { title: 'Features', items: ['Feature 1', 'Feature 2', 'Feature 3'] };
        case 'testimonial':
            return { quote: 'Amazing product!', author: 'Customer Name', role: 'Happy Customer' };
        case 'product-grid':
            return { columns: '3', spacing: '20' };
        case 'newsletter':
            return { title: 'Subscribe', placeholder: 'Enter your email...', buttonText: 'Subscribe' };
        case 'faq':
            return { items: [{ q: 'Question?', a: 'Answer here.' }] };
        default:
            return {};
    }
};

export default function BlockLibrary() {
    const addBlock = useBuilderStore((state) => state.addBlock);

    const handleAddBlock = (type: Block['type']) => {
        const newBlock: Block = {
            id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            type,
            config: getDefaultConfig(type),
        };
        addBlock(newBlock);
    };

    return (
        <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Add Block</h3>
            <div className="grid grid-cols-4 gap-2">
                {blockTypes.map(({ type, icon: Icon, label, color }) => (
                    <button
                        key={type}
                        onClick={() => handleAddBlock(type)}
                        className={`${color} p-3 rounded-lg hover:shadow-md transition flex flex-col items-center gap-2 text-xs font-medium`}
                    >
                        <Icon size={20} />
                        <span>{label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
