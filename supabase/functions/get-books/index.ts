import { serve } from 'https://deno.land/std@0.114.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.0.5';

const supabase = createClient('https://qfqweyetibfyetcsshqs.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmcXdleWV0aWJmeWV0Y3NzaHFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk0MDU0MjMsImV4cCI6MjAzNDk4MTQyM30.z90xCrQfGfLGkF58Y_CWwKEJFr2PXiLpzFfNFlPp-ik');

serve(async (req: { url: string | URL; }) => {
  try {
    const { searchParams } = new URL(req.url);
    const author_id = searchParams.get('author_id');
    const sort = searchParams.get('sort') || 'asc';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    let query = supabase
      .from('books')
      .select(`
        book_id,
        title,
        price,
        publish_date,
        authors (name)
      `)
      .order('publish_date', { ascending: sort === 'asc' });

    if (author_id) {
      query = query.eq('author_id', author_id);
    }

    const start = (page - 1) * limit;
    const end = start + limit - 1;

    query = query.range(start, end);

    const { data, error } = await query;

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
