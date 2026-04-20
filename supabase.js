
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://uqljeaeuwntqpipzyeys.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxbGplYWV1d250cXBpcHp5ZXlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNzczMjksImV4cCI6MjA5MTc1MzMyOX0.fW8THQChKztxemgUDV2H7vmz6rfQV4xJQyDcTPTTsKY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);