export async function handleDownload(request, env) {

 const url = new URL(request.url)

 const fileId = url.searchParams.get("file")

 if (!fileId) {
  return new Response("File not found", { status: 404 })
 }

 const file = await env.DOWNLOADS.get(fileId, "arrayBuffer")

 if (!file) {
  return new Response("Ebook not found", { status: 404 })
 }

 return new Response(file, {
  headers: {
   "Content-Type": "application/pdf"
  }
 })

}
