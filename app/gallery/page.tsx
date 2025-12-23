"use client";

import { useEffect, useState } from 'react';
import { Loader, Database } from 'lucide-react';
import { getPublicCodes, type UserCode } from '@/lib/supabase/client';

export default function GalleryPage() {
    const [publicCodes, setPublicCodes] = useState<UserCode[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadPublicCodes();
    }, []);

    const loadPublicCodes = async () => {
        setLoading(true);
        setError(null);
        try {
            const codes = await getPublicCodes();
            setPublicCodes(codes);
        } catch (error: any) {
            console.error('Error loading public codes:', error);
            setError(error.message || 'Failed to load gallery');
        } finally {
            setLoading(false);
        }
    };

    const filteredCodes = publicCodes.filter(code =>
        code.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (code.description?.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
                    <Database className="mx-auto mb-4 text-gray-400" size={48} />
                    <h2 className="text-xl font-bold mb-2 text-gray-900">Supabase Not Configured</h2>
                    <p className="text-gray-600 mb-6">
                        The gallery requires Supabase to store and retrieve public codes.
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                        <p className="text-sm text-gray-700 mb-2">
                            <strong>To enable the gallery:</strong>
                        </p>
                        <ol className="text-sm text-gray-600 list-decimal list-inside space-y-1">
                            <li>Create a Supabase project at supabase.com</li>
                            <li>Run the schema from lib/supabase/schema.sql</li>
                            <li>Add your keys to .env.local</li>
                            <li>Restart the dev server</li>
                        </ol>
                    </div>
                    <div className="flex gap-3">
                        <a
                            href="/editor"
                            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            Try Editor Instead
                        </a>
                        <button
                            onClick={loadPublicCodes}
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
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Public Gallery</h1>
                    <p className="text-gray-600">
                        Explore {publicCodes.length} Shopify Liquid {publicCodes.length === 1 ? 'section' : 'sections'} shared by the community
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search codes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                {/* Codes Grid */}
                {filteredCodes.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCodes.map((code) => (
                            <a
                                key={code.id}
                                href={`/gallery/${code.id}`}
                                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all cursor-pointer"
                            >
                                {/* Preview Thumbnail */}
                                <div className="h-48 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg mb-4 flex items-center justify-center">
                                    <span className="text-4xl">📝</span>
                                </div>

                                <h3 className="font-bold text-lg mb-2">{code.title}</h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {code.description || 'No description'}
                                </p>

                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>by {code.clerk_user_id.slice(0, 8)}...</span>
                                    <span>{new Date(code.created_at).toLocaleDateString()}</span>
                                </div>
                            </a>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="text-center py-12">
                        {searchQuery ? (
                            <>
                                <p className="text-gray-500 mb-4">No codes found matching &quot;{searchQuery}&quot;</p>
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="text-indigo-600 hover:underline"
                                >
                                    Clear search
                                </button>
                            </>
                        ) : (
                            <>
                                <p className="text-gray-500 mb-4">No public codes yet</p>
                                <a
                                    href="/editor"
                                    className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                >
                                    Create the First One →
                                </a>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
