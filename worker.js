
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const target = url.searchParams.get('url');
    if (!target) return new Response("Missing 'url' param", { status: 400 });

    try {
      const res = await fetch(target);
      const data = await res.text(); // Forward as text so browser can parse JSON
      return new Response(data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      });
    } catch (err) {
      return new Response(err.toString(), { status: 500 });
    }
  }
};
