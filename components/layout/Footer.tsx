import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 pt-16 pb-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 text-xl font-bold mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm">
                                SV
                            </div>
                            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                SectionVault
                            </span>
                        </Link>
                        <p className="text-gray-600 max-w-sm">
                            The ultimate library for Shopify Liquid sections. Preview, save, and share your snippets with developers around the world.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Platform</h4>
                        <ul className="space-y-2">
                            <li><Link href="/editor" className="text-gray-600 hover:text-indigo-600 transition">Editor</Link></li>
                            <li><Link href="/gallery" className="text-gray-600 hover:text-indigo-600 transition">Gallery</Link></li>
                            <li><Link href="/my-codes" className="text-gray-600 hover:text-indigo-600 transition">My Codes</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition">About</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition">Contact</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} SectionVault. All rights reserved. Built for Shopify Developers.
                    </p>
                    <div className="flex gap-6">
                        <a href="https://github.com" className="text-gray-400 hover:text-gray-600 transition">
                            GitHub
                        </a>
                        <a href="https://twitter.com" className="text-gray-400 hover:text-gray-600 transition">
                            Twitter
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
