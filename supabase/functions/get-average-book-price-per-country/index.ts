import { serve } from 'https://deno.land/std@0.114.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.0.5';

const supabase = createClient('https://qfqweyetibfyetcsshqs.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmcXdleWV0aWJmeWV0Y3NzaHFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk0MDU0MjMsImV4cCI6MjAzNDk4MTQyM30.z90xCrQfGfLGkF58Y_CWwKEJFr2PXiLpzFfNFlPp-ik');

serve(async (req: { url: string | URL; }) => {
  try {
    const { data, error } = await supabase
      .rpc('get_average_book_price_per_country'); 

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


