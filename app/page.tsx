export default function HomePage() {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="inline-block mb-4 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                        ✨ Preview, Save & Share Shopify Liquid Code
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        SectionVault
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Paste your Shopify Liquid section code, preview it live, save to your library,
                        and share with the community.
                    </p>

                    <div className="flex gap-4 justify-center flex-wrap">
                        <a
                            href="/editor"
                            className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Start Previewing →
                        </a>
                        <a
                            href="/gallery"
                            className="px-8 py-4 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg font-semibold hover:bg-indigo-50"
                        >
                            Browse Gallery
                        </a>
                    </div>
                </div>

                {/* Decorative gradient orbs */}
                <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        Everything you need to preview and share Liquid code
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="p-6 rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all">
                            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">💻</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Code Editor</h3>
                            <p className="text-gray-600">
                                Paste your Shopify Liquid code and see it come to life instantly.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-6 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">👁️</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Live Preview</h3>
                            <p className="text-gray-600">
                                Instantly preview your Liquid section code. Toggle between desktop and mobile.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-6 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">💾</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Save to Library</h3>
                            <p className="text-gray-600">
                                Save your favorite Liquid sections to your personal library.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">🌐</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Share Publicly</h3>
                            <p className="text-gray-600">
                                Make your code public and share it with the Shopify community.
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="p-6 rounded-xl border border-gray-200 hover:border-yellow-300 hover:shadow-lg transition-all">
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">📚</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Browse Gallery</h3>
                            <p className="text-gray-600">
                                Explore public code shared by other developers. Copy and customize.
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="p-6 rounded-xl border border-gray-200 hover:border-pink-300 hover:shadow-lg transition-all">
                            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">🔒</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Private & Public</h3>
                            <p className="text-gray-600">
                                Control visibility. Keep your code private or share it publicly.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to preview your Liquid code?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Join developers sharing and discovering amazing Shopify section code.
                    </p>
                    <a
                        href="/editor"
                        className="inline-block px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        Start Previewing for Free →
                    </a>
                </div>
            </section>
        </main>
    );
}
