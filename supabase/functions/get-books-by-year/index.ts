import { serve } from 'https://deno.land/std@0.114.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.0.5';

const supabase = createClient('https://qfqweyetibfyetcsshqs.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmcXdleWV0aWJmeWV0Y3NzaHFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk0MDU0MjMsImV4cCI6MjAzNDk4MTQyM30.z90xCrQfGfLGkF58Y_CWwKEJFr2PXiLpzFfNFlPp-ik');

serve(async (req: { url: string | URL; }) => {
  try {
    const { searchParams } = new URL(req.url);
    const year = searchParams.get('year');

    if (!year) {
      return new Response(JSON.stringify({ error: 'Year is required' }), { status: 400 });
    }

    const { data, error } = await supabase
      .rpc('get_books_by_year_and_price', { year: parseInt(year, 10) }); 

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error:', error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
});


