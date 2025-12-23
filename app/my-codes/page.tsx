"use client";

import { useEffect, useState, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import { Pencil, Trash2, Globe, Lock, Loader, Database } from 'lucide-react';
import { getUserCodes, deleteCode, type UserCode } from '@/lib/supabase/client';

export default function MyCodesPage() {
    const { user } = useUser();
    const [codes, setCodes] = useState<UserCode[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deleting, setDeleting] = useState<string | null>(null);

    const loadCodes = useCallback(async () => {
        if (!user) return;

        setLoading(true);
        setError(null);
        try {
            const userCodes = await getUserCodes(user.id);
            setCodes(userCodes);
        } catch (error: any) {
            console.error('Error loading codes:', error);
            setError(error.message || 'Failed to load codes');
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            loadCodes();
        }
    }, [user, loadCodes]);

    const handleDelete = async (id: string) => {
        if (!user) return;
        if (!confirm('Delete this code? This cannot be undone.')) return;

        setDeleting(id);
        try {
            await deleteCode(id, user.id);
            setCodes(codes.filter(c => c.id !== id));
        } catch (error) {
            console.error('Error deleting code:', error);
            alert('Failed to delete code');
        } finally {
            setDeleting(null);
        }
    };

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
                    <Database className="mx-auto mb-4 text-gray-400" size={48} />
                    <h2 className="text-xl font-bold mb-2 text-gray-900">Supabase Not Configured</h2>
                    <p className="text-gray-600 mb-6">
                        Saving and loading codes requires Supabase database.
                    </p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-left">
                        <p className="text-sm text-yellow-800">
                            💡 You can still use the <strong>Editor</strong> to preview Liquid code!
                            The preview feature works without database.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <a
                            href="/editor"
                            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            Go to Editor
                        </a>
                        <button
                            onClick={loadCodes}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader className="animate-spin text-indigo-600" size={40} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">My Codes</h1>
                        <p className="text-gray-600">
                            {codes.length} saved {codes.length === 1 ? 'section' : 'sections'}
                        </p>
                    </div>

                    <a
                        href="/editor"
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold"
                    >
                        + New Code
                    </a>
                </div>

                {/* Codes Grid */}
                {codes.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {codes.map((code) => (
                            <div
                                key={code.id}
                                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all"
                            >
                                {/* Preview Thumbnail */}
                                <div className="h-48 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg mb-4 flex items-center justify-center">
                                    <span className="text-4xl">📝</span>
                                </div>

                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-bold text-lg flex-1">{code.title}</h3>
                                    <div className="flex items-center gap-1">
                                        {code.is_public ? (
                                            <Globe size={16} className="text-green-600" aria-label="Public" />
                                        ) : (
                                            <Lock size={16} className="text-gray-400" aria-label="Private" />
                                        )}
                                    </div>
                                </div>

                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {code.description || 'No description'}
                                </p>

                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">
                                        {new Date(code.created_at).toLocaleDateString()}
                                    </span>

                                    <div className="flex gap-2">
                                        <a
                                            href={`/editor?id=${code.id}`}
                                            className="p-2 hover:bg-indigo-50 rounded-lg transition"
                                            title="Edit"
                                        >
                                            <Pencil size={16} className="text-indigo-600" />
                                        </a>
                                        <button
                                            onClick={() => handleDelete(code.id)}
                                            disabled={deleting === code.id}
                                            className="p-2 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                                            title="Delete"
                                        >
                                            {deleting === code.id ? (
                                                <Loader size={16} className="text-red-600 animate-spin" />
                                            ) : (
                                                <Trash2 size={16} className="text-red-600" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-gray-300">
                        <p className="text-gray-500 text-lg mb-4">No saved codes yet</p>
                        <p className="text-gray-400 mb-6">
                            Create your first Liquid section preview
                        </p>
                        <a
                            href="/editor"
                            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold"
                        >
                            Create Your First Code →
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
