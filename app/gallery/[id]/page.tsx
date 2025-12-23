"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Monitor, Smartphone, Copy, Code as CodeIcon, User, Calendar, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import LiquidPreview from '@/components/editor/LiquidPreview';
import { getCodeById, type UserCode } from '@/lib/supabase/client';
import Editor from '@monaco-editor/react';

export default function CodeViewPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [codeData, setCodeData] = useState<UserCode | null>(null);
    const [loading, setLoading] = useState(true);
    const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');
    const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        async function loadCode() {
            try {
                const data = await getCodeById(id);
                if (data) {
                    setCodeData(data);
                } else {
                    router.push('/gallery');
                }
            } catch (error) {
                console.error('Error loading code:', error);
                router.push('/gallery');
            } finally {
                setLoading(false);
            }
        }
        loadCode();
    }, [id, router]);

    const handleCopy = () => {
        if (!codeData) return;
        navigator.clipboard.writeText(codeData.liquid_code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin text-indigo-600">
                    <Monitor size={48} />
                </div>
            </div>
        );
    }

    if (!codeData) return null;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navigation Bar */}
            <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
                <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/gallery"
                            className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-500 hover:text-indigo-600"
                        >
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">{codeData.title}</h1>
                            <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                                <span className="flex items-center gap-1">
                                    <User size={14} />
                                    {codeData.clerk_user_id.slice(0, 8)}...
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar size={14} />
                                    {new Date(codeData.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex bg-gray-100 p-1 rounded-lg">
                            <button
                                onClick={() => setActiveTab('preview')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'preview' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:text-indigo-900'}`}
                            >
                                Preview
                            </button>
                            <button
                                onClick={() => setActiveTab('code')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'code' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:text-indigo-900'}`}
                            >
                                Code
                            </button>
                        </div>

                        <button
                            onClick={handleCopy}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${copied ? 'bg-green-100 text-green-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                        >
                            {copied ? 'Copied!' : <><Copy size={18} /> Copy Code</>}
                        </button>

                        <Link
                            href={`/editor?id=${codeData.id}`}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
                        >
                            <ExternalLink size={18} />
                            Fork
                        </Link>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 py-8">
                {activeTab === 'preview' ? (
                    <div className="space-y-6">
                        {/* Description Section */}
                        {codeData.description && (
                            <div className="bg-white p-6 rounded-xl border border-gray-200">
                                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Description</h2>
                                <p className="text-gray-700">{codeData.description}</p>
                            </div>
                        )}

                        {/* Preview Controls */}
                        <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between">
                            <span className="font-semibold text-gray-700">Displaying Preview</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setViewportMode('desktop')}
                                    className={`p-2 rounded-lg transition ${viewportMode === 'desktop' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
                                    title="Desktop View"
                                >
                                    <Monitor size={20} />
                                </button>
                                <button
                                    onClick={() => setViewportMode('mobile')}
                                    className={`p-2 rounded-lg transition ${viewportMode === 'mobile' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
                                    title="Mobile View"
                                >
                                    <Smartphone size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Preview Execution */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[500px]">
                            <LiquidPreview code={codeData.liquid_code} viewportMode={viewportMode} />
                        </div>
                    </div>
                ) : (
                    <div className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-xl border border-gray-800">
                        <div className="bg-gray-900 px-4 py-2 flex items-center gap-2 border-b border-gray-800">
                            <CodeIcon size={16} className="text-gray-400" />
                            <span className="text-sm font-mono text-gray-400">section.liquid</span>
                        </div>
                        <div className="h-[70vh]">
                            <Editor
                                height="100%"
                                defaultLanguage="html"
                                theme="vs-dark"
                                value={codeData.liquid_code}
                                options={{
                                    readOnly: true,
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    lineNumbers: 'on',
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                    tabSize: 2,
                                }}
                            />
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
