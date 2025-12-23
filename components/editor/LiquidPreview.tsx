"use client";

import { useEffect, useState } from 'react';

interface LiquidPreviewProps {
    code: string;
    viewportMode: 'desktop' | 'mobile';
}

export default function LiquidPreview({ code, viewportMode }: LiquidPreviewProps) {
    const [mounted, setMounted] = useState(false);

    // Prevent hydration errors by only rendering on client
    useEffect(() => {
        setMounted(true);
    }, []);

    // Process Liquid code for preview
    const processLiquidCode = (liquidCode: string) => {
        let processed = liquidCode;
        let extractedCSS = '';

        // 1. Extract CSS from {% style %} tags
        const styleMatch = processed.match(/{%\s*style\s*%}([\s\S]*?){%\s*endstyle\s*%}/);
        if (styleMatch) {
            extractedCSS = styleMatch[1].trim();
            processed = processed.replace(/{%\s*style\s*%}[\s\S]*?{%\s*endstyle\s*%}/g, '');
        }

        // 2. Parse schema to get defaults
        const schemaDefaults: Record<string, any> = {}; // eslint-disable-line @typescript-eslint/no-explicit-any
        const schemaBlocks: any[] = []; // eslint-disable-line @typescript-eslint/no-explicit-any

        const schemaMatch = processed.match(/{%\s*schema\s*%}([\s\S]*?){%\s*endschema\s*%}/);
        if (schemaMatch) {
            try {
                const schema = JSON.parse(schemaMatch[1]);

                // Get setting defaults
                if (schema.settings) {
                    schema.settings.forEach((setting: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                        if (setting.id && setting.default !== undefined) {
                            schemaDefaults[`section.settings.${setting.id}`] = setting.default;
                        }
                    });
                }

                // Get block defaults
                if (schema.blocks && schema.blocks.length > 0) {
                    const blockType = schema.blocks[0];
                    const maxBlocks = schema.max_blocks || 4;

                    // Create mock blocks based on schema
                    for (let i = 0; i < Math.min(maxBlocks, 4); i++) {
                        const mockBlock: Record<string, any> = {}; // eslint-disable-line @typescript-eslint/no-explicit-any

                        if (blockType.settings) {
                            blockType.settings.forEach((setting: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                                if (setting.id && setting.default !== undefined) {
                                    mockBlock[setting.id] = setting.default;
                                } else if (setting.id === 'image') {
                                    mockBlock[setting.id] = 'https://placehold.co/800x600/f6efe9/2b2b2b?text=Image';
                                }
                            });
                        }

                        schemaBlocks.push(mockBlock);
                    }
                }
            } catch (e) {
                console.error('Error parsing schema:', e);
            }
        }

        // Remove schema tags
        processed = processed.replace(/{%\s*schema\s*%}[\s\S]*?{%\s*endschema\s*%}/g, '');

        // 3. Handle {% for block in section.blocks %} loops
        const forLoopMatch = processed.match(/{%\s*for\s+(\w+)\s+in\s+section\.blocks\s*%}([\s\S]*?){%\s*endfor\s*%}/);
        if (forLoopMatch && schemaBlocks.length > 0) {
            const blockVarName = forLoopMatch[1];
            const loopContent = forLoopMatch[2];
            let expandedBlocks = '';

            schemaBlocks.forEach((blockData) => {
                let blockHTML = loopContent;

                // Replace block.settings.* variables with mock data
                Object.keys(blockData).forEach((key) => {
                    const value = blockData[key];

                    // Handle different types of replacements
                    blockHTML = blockHTML.replace(
                        new RegExp(`{{\\s*${blockVarName}\\.settings\\.${key}\\s*\\|[^}]*}}`, 'g'),
                        value
                    );
                    blockHTML = blockHTML.replace(
                        new RegExp(`{{\\s*${blockVarName}\\.settings\\.${key}\\s*}}`, 'g'),
                        value
                    );
                });

                // Remove {% if %} blocks that check for missing values
                blockHTML = blockHTML.replace(/{%\s*if\s+[^%]*%}/g, '');
                blockHTML = blockHTML.replace(/{%\s*endif\s*%}/g, '');

                // Remove other Liquid tags from this block
                blockHTML = blockHTML.replace(/{{[^}]*block\.shopify_attributes[^}]*}}/g, '');

                expandedBlocks += blockHTML;
            });

            processed = processed.replace(
                /{%\s*for\s+\w+\s+in\s+section\.blocks\s*%}[\s\S]*?{%\s*endfor\s*%}/,
                expandedBlocks
            );
        }

        // 4. Replace section.settings.* with schema defaults
        Object.keys(schemaDefaults).forEach((key) => {
            const value = schemaDefaults[key];
            processed = processed.replace(
                new RegExp(`{{\\s*${key.replace('.', '\\.')}\\s*}}`, 'g'),
                value
            );
        });

        // 5. Remove remaining Liquid control tags
        processed = processed.replace(/{%\s*if\s+[^%]*%}/g, '');
        processed = processed.replace(/{%\s*endif\s*%}/g, '');
        processed = processed.replace(/{%\s*unless\s+[^%]*%}/g, '');
        processed = processed.replace(/{%\s*endunless\s*%}/g, '');
        processed = processed.replace(/{%\s*else\s*%}/g, '');

        // 6. Handle remaining Liquid output tags with default values
        const genericMocks: Record<string, string> = {
            "product.title": "Sample Product",
            "product.price": "$99.00",
            "product.featured_image": "https://placehold.co/600x600/e5e7eb/6b7280?text=Product",
        };

        Object.entries(genericMocks).forEach(([liquidVar, mockValue]) => {
            processed = processed.replace(
                new RegExp(`{{\\s*${liquidVar.replace('.', '\\.')}[^}]*}}`, 'g'),
                mockValue
            );
        });

        // 7. Remove any remaining Liquid tags
        processed = processed.replace(/{{.*?}}/g, '');
        processed = processed.replace(/{%.*?%}/g, '');

        // 8. Combine with extracted CSS
        if (extractedCSS) {
            processed = `<style>${extractedCSS}</style>\n${processed}`;
        }

        return processed;
    };

    const processedHTML = processLiquidCode(code);

    // Don't render until client-side mounted to avoid hydration errors
    if (!mounted) {
        return (
            <div
                className={`bg-white rounded-lg shadow-sm mx-auto transition-all ${viewportMode === 'mobile' ? 'max-w-sm' : 'max-w-5xl'
                    }`}
                style={{ width: viewportMode === 'mobile' ? '375px' : '100%' }}
            >
                <div className="p-8 text-center text-gray-400">
                    Loading preview...
                </div>
            </div>
        );
    }

    return (
        <div
            className={`bg-white rounded-lg shadow-sm mx-auto transition-all ${viewportMode === 'mobile' ? 'max-w-sm' : 'max-w-5xl'
                }`}
            style={{ width: viewportMode === 'mobile' ? '375px' : '100%' }}
            suppressHydrationWarning
        >
            <div
                dangerouslySetInnerHTML={{ __html: processedHTML }}
                className="liquid-preview-content"
                suppressHydrationWarning
            />
        </div>
    );
}
