// Block types that can be added to sections
export type BlockType =
    | 'text'
    | 'image'
    | 'button'
    | 'features'
    | 'testimonial'
    | 'product-grid'
    | 'newsletter'
    | 'faq';

// Individual block configuration
export interface Block {
    id: string;
    type: BlockType;
    config: Record<string, any>;
}

// Builder state
export interface BuilderState {
    blocks: Block[];
    activeBlockId: string | null;
    viewportMode: 'desktop' | 'mobile';
    sectionName: string;

    // Actions
    addBlock: (block: Block) => void;
    removeBlock: (id: string) => void;
    updateBlock: (id: string, config: Record<string, any>) => void;
    reorderBlocks: (startIndex: number, endIndex: number) => void;
    setActiveBlock: (id: string | null) => void;
    setViewportMode: (mode: 'desktop' | 'mobile') => void;
    setSectionName: (name: string) => void;
    clearAll: () => void;
}

// Template data structure
export interface Template {
    id: string;
    title: string;
    category: string;
    description: string;
    thumbnail: string;
    blocks: Block[];
}

// User section (saved)
export interface UserSection {
    id: string;
    user_id: string;
    name: string;
    blocks: Block[];
    generated_code: string;
    created_at: string;
    updated_at: string;
}
