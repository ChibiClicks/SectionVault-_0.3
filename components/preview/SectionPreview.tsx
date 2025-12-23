"use client";

import { useBuilderStore } from '@/lib/store/builderStore';
import { Block } from '@/types';

// Individual block renderers
function TextBlockPreview({ config }: { config: any }) {
    return (
        <div
            style={{
                fontSize: `${config.fontSize || 16}px`,
                color: config.color || '#000000',
                textAlign: config.align || 'left',
            }}
        >
            {config.content || 'Your text here'}
        </div>
    );
}

function ImageBlockPreview({ config }: { config: any }) {
    if (!config.url) {
        return (
            <div className="bg-gray-200 rounded-lg p-12 text-center text-gray-500">
                <p>Upload an image or enter URL</p>
            </div>
        );
    }
    return (
        <img
            src={config.url}
            alt={config.alt || 'Image'}
            className="w-full h-auto rounded-lg object-cover"
            style={{ aspectRatio: config.aspectRatio || '16/9' }}
        />
    );
}

function ButtonBlockPreview({ config }: { config: any }) {
    return (
        <a
            href={config.url || '#'}
            style={{
                backgroundColor: config.bgColor || '#6366f1',
                color: config.textColor || '#ffffff',
            }}
            className="inline-block px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
            {config.text || 'Click me'}
        </a>
    );
}

function FeaturesBlockPreview({ config }: { config: any }) {
    return (
        <div>
            <h3 className="text-2xl font-bold mb-6 text-center">{config.title || 'Features'}</h3>
            <div className="grid md:grid-cols-3 gap-6">
                {(config.items || ['Feature 1', 'Feature 2', 'Feature 3']).map((item: string, idx: number) => (
                    <div key={idx} className="p-6 bg-gray-50 rounded-lg">
                        <p className="font-medium">{item}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function TestimonialBlockPreview({ config }: { config: any }) {
    return (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
            <p className="text-lg italic mb-4">&quot;{config.quote || 'Amazing product!'}&quot;</p>
            <p className="font-semibold">{config.author || 'Customer Name'}</p>
            <p className="text-sm text-gray-600">{config.role || 'Happy Customer'}</p>
        </div>
    );
}

function NewsletterBlockPreview({ config }: { config: any }) {
    return (
        <div className="bg-indigo-600 text-white p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">{config.title || 'Subscribe'}</h3>
            <div className="flex gap-2 max-w-md mx-auto">
                <input
                    type="email"
                    placeholder={config.placeholder || 'Enter your email...'}
                    className="flex-1 px-4 py-2 rounded-lg text-gray-900"
                    readOnly
                />
                <button className="px-6 py-2 bg-white text-indigo-600 rounded-lg font-semibold">
                    {config.buttonText || 'Subscribe'}
                </button>
            </div>
        </div>
    );
}

function ProductGridBlockPreview({ config }: { config: any }) {
    return (
        <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-100 rounded-lg p-4">
                    <div className="aspect-square bg-gray-200 rounded mb-2"></div>
                    <p className="font-medium">Product {i}</p>
                    <p className="text-sm text-gray-600">$99.00</p>
                </div>
            ))}
        </div>
    );
}

function FAQBlockPreview({ config }: { config: any }) {
    return (
        <div className="space-y-4">
            {(config.items || [{ q: 'Question?', a: 'Answer here.' }]).map((item: any, idx: number) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold mb-2">{item.q}</p>
                    <p className="text-gray-600">{item.a}</p>
                </div>
            ))}
        </div>
    );
}

// Main preview component
export default function SectionPreview() {
    const { blocks, viewportMode } = useBuilderStore();

    const renderBlock = (block: Block) => {
        switch (block.type) {
            case 'text':
                return <TextBlockPreview config={block.config} />;
            case 'image':
                return <ImageBlockPreview config={block.config} />;
            case 'button':
                return <ButtonBlockPreview config={block.config} />;
            case 'features':
                return <FeaturesBlockPreview config={block.config} />;
            case 'testimonial':
                return <TestimonialBlockPreview config={block.config} />;
            case 'newsletter':
                return <NewsletterBlockPreview config={block.config} />;
            case 'product-grid':
                return <ProductGridBlockPreview config={block.config} />;
            case 'faq':
                return <FAQBlockPreview config={block.config} />;
            default:
                return <div className="p-4 bg-gray-100 rounded">Unknown block type</div>;
        }
    };

    if (blocks.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center text-gray-400">
                <p className="text-lg font-medium mb-2">Empty canvas</p>
                <p>Add blocks to see the preview</p>
            </div>
        );
    }

    return (
        <div
            className={`bg-white rounded-lg shadow-sm mx-auto transition-all ${viewportMode === 'mobile' ? 'max-w-sm' : 'max-w-5xl'
                }`}
            style={{ width: viewportMode === 'mobile' ? '375px' : '100%' }}
        >
            <div className="p-8 space-y-8">
                {blocks.map((block) => (
                    <div key={block.id}>{renderBlock(block)}</div>
                ))}
            </div>
        </div>
    );
}
