// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://zwlnljwztedfqxlumoch.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3bG5sand6dGVkZnF4bHVtb2NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NDA4NzUsImV4cCI6MjA0OTQxNjg3NX0.e0r6MR4KsUSLspl1SVX8zKT0z3XrEMdh-YTumHPp9ck";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);