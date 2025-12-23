"use client";

import { useBuilderStore } from '@/lib/store/builderStore';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Block } from '@/types';

// Code generator function
function generateLiquidCode(blocks: Block[], sectionName: string): string {
    let liquidCode = `<div class="section-${sectionName.toLowerCase().replace(/\s+/g, '-')}">\n`;

    blocks.forEach((block, index) => {
        switch (block.type) {
            case 'text':
                liquidCode += `  <div class="text-block" style="font-size: ${block.config.fontSize}px; color: ${block.config.color}; text-align: ${block.config.align};">\n`;
                liquidCode += `    {{ section.settings.text_${index} }}\n`;
                liquidCode += `  </div>\n`;
                break;

            case 'image':
                liquidCode += `  <div class="image-block">\n`;
                liquidCode += `    <img src="{{ section.settings.image_${index} | img_url: 'master' }}" alt="{{ section.settings.image_alt_${index} }}" loading="lazy" />\n`;
                liquidCode += `  </div>\n`;
                break;

            case 'button':
                liquidCode += `  <div class="button-block">\n`;
                liquidCode += `    <a href="{{ section.settings.button_url_${index} }}" style="background-color: ${block.config.bgColor}; color: ${block.config.textColor};" class="button">\n`;
                liquidCode += `      {{ section.settings.button_text_${index} }}\n`;
                liquidCode += `    </a>\n`;
                liquidCode += `  </div>\n`;
                break;

            case 'newsletter':
                liquidCode += `  <div class="newsletter-block">\n`;
                liquidCode += `    <h3>{{ section.settings.newsletter_title_${index} }}</h3>\n`;
                liquidCode += `    <form action="/contact#newsletter" method="post">\n`;
                liquidCode += `      <input type="email" name="email" placeholder="{{ section.settings.newsletter_placeholder_${index} }}" />\n`;
                liquidCode += `      <button type="submit">{{ section.settings.newsletter_button_${index} }}</button>\n`;
                liquidCode += `    </form>\n`;
                liquidCode += `  </div>\n`;
                break;

            default:
                liquidCode += `  <!-- ${block.type} block -->\n`;
        }
    });

    liquidCode += `</div>\n\n`;

    // Generate schema
    liquidCode += `{% schema %}\n`;
    liquidCode += `{\n`;
    liquidCode += `  "name": "${sectionName}",\n`;
    liquidCode += `  "settings": [\n`;

    blocks.forEach((block, index) => {
        if (index > 0) liquidCode += `,\n`;

        switch (block.type) {
            case 'text':
                liquidCode += `    {\n`;
                liquidCode += `      "type": "text",\n`;
                liquidCode += `      "id": "text_${index}",\n`;
                liquidCode += `      "label": "Text Content",\n`;
                liquidCode += `      "default": "${block.config.content}"\n`;
                liquidCode += `    }`;
                break;

            case 'image':
                liquidCode += `    {\n`;
                liquidCode += `      "type": "image_picker",\n`;
                liquidCode += `      "id": "image_${index}",\n`;
                liquidCode += `      "label": "Image"\n`;
                liquidCode += `    }`;
                break;

            case 'button':
                liquidCode += `    {\n`;
                liquidCode += `      "type": "text",\n`;
                liquidCode += `      "id": "button_text_${index}",\n`;
                liquidCode += `      "label": "Button Text",\n`;
                liquidCode += `      "default": "${block.config.text}"\n`;
                liquidCode += `    }`;
                break;

            case 'newsletter':
                liquidCode += `    {\n`;
                liquidCode += `      "type": "text",\n`;
                liquidCode += `      "id": "newsletter_title_${index}",\n`;
                liquidCode += `      "label": "Newsletter Title",\n`;
                liquidCode += `      "default": "${block.config.title}"\n`;
                liquidCode += `    }`;
                break;
        }
    });

    liquidCode += `\n  ],\n`;
    liquidCode += `  "presets": [\n`;
    liquidCode += `    {\n`;
    liquidCode += `      "name": "${sectionName}"\n`;
    liquidCode += `    }\n`;
    liquidCode += `  ]\n`;
    liquidCode += `}\n`;
    liquidCode += `{% endschema %}\n`;

    return liquidCode;
}

export default function CodeViewer() {
    const { blocks, sectionName } = useBuilderStore();
    const [copied, setCopied] = useState(false);

    const generatedCode = generateLiquidCode(blocks, sectionName);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(generatedCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="h-full flex flex-col bg-gray-900 text-gray-100">
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                <span className="text-sm font-mono text-gray-400">{sectionName.toLowerCase().replace(/\s+/g, '-')}.liquid</span>
                <button
                    onClick={handleCopy}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition ${copied
                        ? 'bg-green-600 text-white'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                >
                    {copied ? (
                        <>
                            <Check size={16} />
                            <span>Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy size={16} />
                            <span>Copy Code</span>
                        </>
                    )}
                </button>
            </div>

            <div className="flex-1 overflow-auto p-6">
                <pre className="text-sm font-mono leading-relaxed">
                    <code>{generatedCode}</code>
                </pre>
            </div>
        </div>
    );
}
