"use client";

import { useEffect, useState, Suspense } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import Editor from '@monaco-editor/react';
import { Monitor, Smartphone, Save, Globe, Lock, Loader, ArrowLeft } from 'lucide-react';
import LiquidPreview from '@/components/editor/LiquidPreview';
import { saveCode, getCodeById, updateCode } from '@/lib/supabase/client';
import Link from 'next/link';

function EditorContent() {
    const { user } = useUser();
    const router = useRouter();
    const searchParams = useSearchParams();
    const codeId = searchParams.get('id');

    const [code, setCode] = useState(`<div class="hero-section">
  <h1>{{ section.settings.title }}</h1>
  <p>{{ section.settings.description }}</p>
  <style>
    .hero-section {
      padding: 60px 20px;
      text-align: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    .hero-section h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
  </style>
</div>

{% schema %}
{
  "name": "Hero Section",
  "settings": [
    {
      "type": "text",
      "id": "title",
      "label": "Title",
      "default": "Welcome to Our Store"
    },
    {
      "type": "textarea",
      "id": "description",
      "label": "Description",
      "default": "Discover amazing products"
    }
  ]
}
{% endschema %}`);

    const [title, setTitle] = useState('Untitled Section');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(!!codeId);

    // Load existing code if ID is present
    useEffect(() => {
        const loadCode = async () => {
            if (!codeId) return;

            try {
                const existingCode = await getCodeById(codeId);
                if (existingCode) {
                    setTitle(existingCode.title);
                    setDescription(existingCode.description || '');
                    setCode(existingCode.liquid_code);
                    setIsPublic(existingCode.is_public);
                }
            } catch (error) {
                console.error('Error loading code:', error);
                alert('Failed to load code for editing');
            } finally {
                setLoading(false);
            }
        };

        loadCode();
    }, [codeId]);

    const handleSave = async () => {
        if (!user) {
            alert('Please sign in to save codes');
            router.push('/sign-in');
            return;
        }

        if (!title.trim()) {
            alert('Please enter a title for your code');
            return;
        }

        setSaving(true);
        try {
            if (codeId) {
                // Update existing
                await updateCode(codeId, {
                    title: title.trim(),
                    description: description.trim(),
                    liquid_code: code,
                    is_public: isPublic,
                });
                alert('✅ Code updated successfully!');
            } else {
                // Save new
                await saveCode({
                    clerkUserId: user.id,
                    title: title.trim(),
                    description: description.trim(),
                    liquidCode: code,
                    isPublic,
                });
                alert('✅ Code saved successfully!');
            }
            router.push('/my-codes');
        } catch (error) {
            console.error('Error saving code:', error);
            alert('❌ Failed to save code. Please make sure Supabase is configured.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <Loader className="animate-spin text-indigo-600" size={40} />
                    <p className="text-gray-600 font-medium">Loading your code...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            {/* Top Bar */}
            <div className="bg-white border-b border-gray-200 px-6 py-3">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                        <Link
                            href="/my-codes"
                            className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-500 hover:text-indigo-600"
                            title="Back to My Codes"
                        >
                            <ArrowLeft size={20} />
                        </Link>
                        <div className="flex-1">
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="text-lg font-semibold border-none outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2 py-1 w-full max-w-md"
                                placeholder="Section title..."
                            />
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="text-sm text-gray-600 border-none outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2 py-1 w-full max-w-md mt-1"
                                placeholder="Add a description (optional)..."
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsPublic(!isPublic)}
                            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition ${isPublic
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-700'
                                }`}
                        >
                            {isPublic ? <Globe size={18} /> : <Lock size={18} />}
                            <span className="hidden md:inline">{isPublic ? 'Public' : 'Private'}</span>
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? <Loader size={18} className="animate-spin" /> : <Save size={18} />}
                            <span className="hidden md:inline">{saving ? 'Saving...' : 'Save'}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Split Panel Layout */}
            <div className="flex-1 flex overflow-hidden">
                {/* LEFT: Live Preview */}
                <div className="w-1/2 bg-gray-100 flex flex-col border-r border-gray-300">
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

                    <div className="flex-1 overflow-auto p-6">
                        <LiquidPreview code={code} viewportMode={viewportMode} />
                    </div>
                </div>

                {/* RIGHT: Code Editor */}
                <div className="w-1/2 bg-white flex flex-col">
                    <div className="bg-gray-900 px-4 py-2 flex items-center justify-between">
                        <span className="text-sm font-mono text-gray-400">section.liquid</span>
                        <span className="text-xs text-gray-500">Monaco Editor</span>
                    </div>

                    <div className="flex-1">
                        <Editor
                            height="100%"
                            defaultLanguage="html"
                            theme="vs-dark"
                            value={code}
                            onChange={(value) => setCode(value || '')}
                            options={{
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
            </div>
        </div>
    );
}

export default function EditorPage() {
    return (
        <Suspense fallback={
            <div className="h-screen flex items-center justify-center bg-gray-50">
                <Loader className="animate-spin text-indigo-600" size={40} />
            </div>
        }>
            <EditorContent />
        </Suspense>
    );
}
