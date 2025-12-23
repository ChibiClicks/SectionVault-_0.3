"use client";

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 text-xl font-bold">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm">
                        SV
                    </div>
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        SectionVault
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/gallery" className="text-gray-600 hover:text-indigo-600 font-medium">
                        Gallery
                    </Link>
                    <SignedIn>
                        <Link href="/editor" className="text-gray-600 hover:text-indigo-600 font-medium">
                            Editor
                        </Link>
                        <Link href="/my-codes" className="text-gray-600 hover:text-indigo-600 font-medium">
                            My Codes
                        </Link>
                    </SignedIn>
                </nav>

                {/* Auth */}
                <div className="flex items-center gap-3">
                    <SignedOut>
                        <Link
                            href="/sign-in"
                            className="px-4 py-2 text-gray-600 hover:text-indigo-600 font-medium"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/sign-up"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
                        >
                            Sign Up
                        </Link>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </header>
    );
}
