import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create client only if credentials are available
export const supabase = supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

// Types
export interface UserCode {
    id: string;
    clerk_user_id: string;
    title: string;
    description: string | null;
    liquid_code: string;
    is_public: boolean;
    created_at: string;
    updated_at: string;
}

// Helper to check if Supabase is configured
function checkSupabase() {
    if (!supabase) {
        throw new Error('Supabase is not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local');
    }
    return supabase;
}

// API Functions
export async function saveCode(data: {
    clerkUserId: string;
    title: string;
    description?: string;
    liquidCode: string;
    isPublic: boolean;
}) {
    const client = checkSupabase();

    const { data: result, error } = await client
        .from('user_codes')
        .insert({
            clerk_user_id: data.clerkUserId,
            title: data.title,
            description: data.description || null,
            liquid_code: data.liquidCode,
            is_public: data.isPublic,
        })
        .select()
        .single();

    if (error) throw error;
    return result;
}

export async function getUserCodes(clerkUserId: string) {
    const client = checkSupabase();

    const { data, error } = await client
        .from('user_codes')
        .select('*')
        .eq('clerk_user_id', clerkUserId)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data as UserCode[];
}

export async function getPublicCodes() {
    const client = checkSupabase();

    const { data, error } = await client
        .from('user_codes')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data as UserCode[];
}

export async function getCodeById(id: string) {
    const client = checkSupabase();

    const { data, error } = await client
        .from('user_codes')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data as UserCode;
}

export async function updateCode(
    id: string,
    updates: Partial<Omit<UserCode, 'id' | 'clerk_user_id' | 'created_at' | 'updated_at'>>
) {
    const client = checkSupabase();

    const { data, error } = await client
        .from('user_codes')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function deleteCode(id: string, clerkUserId: string) {
    const client = checkSupabase();

    const { error } = await client
        .from('user_codes')
        .delete()
        .eq('id', id)
        .eq('clerk_user_id', clerkUserId); // Security: only delete own codes

    if (error) throw error;
}
