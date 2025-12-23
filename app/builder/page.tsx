"use client";

import { useState } from 'react';
import { useBuilderStore } from '@/lib/store/builderStore';
import SectionPreview from '@/components/preview/SectionPreview';
import BlockLibrary from '@/components/builder/BlockLibrary';
import BlockCanvas from '@/components/builder/BlockCanvas';
import BlockSettings from '@/components/builder/BlockSettings';
import CodeViewer from '@/components/code/CodeViewer';
import ImageUploader from '@/components/builder/ImageUploader';
import { Monitor, Smartphone, Save, Download } from 'lucide-react';

export default function BuilderPage() {
    const [activeTab, setActiveTab] = useState<'builder' | 'code'>('builder');
    const { viewportMode, setViewportMode, sectionName, setSectionName } = useBuilderStore();

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            {/* Top Bar */}
            <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
                <input
                    type="text"
                    value={sectionName}
                    onChange={(e) => setSectionName(e.target.value)}
                    className="text-lg font-semibold border-none outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2 py-1"
                    placeholder="Section name..."
                />

                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 text-gray-600 hover:text-indigo-600 flex items-center gap-2">
                        <Download size={18} />
                        <span className="hidden md:inline">Export</span>
                    </button>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2">
                        <Save size={18} />
                        <span className="hidden md:inline">Save Section</span>
                    </button>
                </div>
            </div>

            {/* Split Panel Layout */}
            <div className="flex-1 flex overflow-hidden">
                {/* LEFT: Live Preview Panel */}
                <div className="w-1/2 bg-gray-100 flex flex-col border-r border-gray-300">
                    {/* Preview Controls */}
                    <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                        <h3 className="font-semibold text-gray-700">Live Preview</h3>

                        {/* Viewport Toggle */}
                        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                            <button
                                onClick={() => setViewportMode('desktop')}
                                className={`px-3 py-1.5 rounded flex items-center gap-2 transition ${viewportMode === 'desktop'
                                    ? 'bg-white text-indigo-600 shadow'
                                    : 'text-gray-600 hover:text-indigo-600'
                                    }`}
                            >
                                <Monitor size={16} />
                                <span className="text-sm">Desktop</span>
                            </button>
                            <button
                                onClick={() => setViewportMode('mobile')}
                                className={`px-3 py-1.5 rounded flex items-center gap-2 transition ${viewportMode === 'mobile'
                                    ? 'bg-white text-indigo-600 shadow'
                                    : 'text-gray-600 hover:text-indigo-600'
                                    }`}
                            >
                                <Smartphone size={16} />
                                <span className="text-sm">Mobile</span>
                            </button>
                        </div>
                    </div>

                    {/* Preview Area */}
                    <div className="flex-1 overflow-auto p-6">
                        <SectionPreview />
                    </div>
                </div>

                {/* RIGHT: Builder/Code Panel */}
                <div className="w-1/2 bg-white flex flex-col">
                    {/* Tab Controls */}
                    <div className="border-b border-gray-200 px-4 flex">
                        <button
                            onClick={() => setActiveTab('builder')}
                            className={`px-6 py-3 font-medium border-b-2 transition ${activeTab === 'builder'
                                ? 'border-indigo-600 text-indigo-600'
                                : 'border-transparent text-gray-600 hover:text-indigo-600'
                                }`}
                        >
                            Visual Builder
                        </button>
                        <button
                            onClick={() => setActiveTab('code')}
                            className={`px-6 py-3 font-medium border-b-2 transition ${activeTab === 'code'
                                ? 'border-indigo-600 text-indigo-600'
                                : 'border-transparent text-gray-600 hover:text-indigo-600'
                                }`}
                        >
                            Section Code
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="flex-1 overflow-hidden">
                        {activeTab === 'builder' ? (
                            <div className="h-full flex">
                                {/* Block Library + Canvas */}
                                <div className="flex-1 flex flex-col overflow-hidden">
                                    <ImageUploader />
                                    <BlockLibrary />
                                    <BlockCanvas />
                                </div>

                                {/* Block Settings Sidebar */}
                                <div className="w-80 border-l border-gray-200 overflow-auto">
                                    <BlockSettings />
                                </div>
                            </div>
                        ) : (
                            <CodeViewer />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
