import { create } from 'zustand';
import { BuilderState, Block } from '@/types';

export const useBuilderStore = create<BuilderState>((set) => ({
    blocks: [],
    activeBlockId: null,
    viewportMode: 'desktop',
    sectionName: 'Untitled Section',

    addBlock: (block) =>
        set((state) => ({
            blocks: [...state.blocks, block],
            activeBlockId: block.id,
        })),

    removeBlock: (id) =>
        set((state) => ({
            blocks: state.blocks.filter((b) => b.id !== id),
            activeBlockId: state.activeBlockId === id ? null : state.activeBlockId,
        })),

    updateBlock: (id, config) =>
        set((state) => ({
            blocks: state.blocks.map((b) =>
                b.id === id ? { ...b, config: { ...b.config, ...config } } : b
            ),
        })),

    reorderBlocks: (startIndex, endIndex) =>
        set((state) => {
            const result = Array.from(state.blocks);
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);
            return { blocks: result };
        }),

    setActiveBlock: (id) => set({ activeBlockId: id }),

    setViewportMode: (mode) => set({ viewportMode: mode }),

    setSectionName: (name) => set({ sectionName: name }),

    clearAll: () => set({ blocks: [], activeBlockId: null, sectionName: 'Untitled Section' }),
}));
