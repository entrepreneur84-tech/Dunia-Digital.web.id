export function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { "Content-Type": "application/json" }
  })
}

export function text(data, status = 200) {
  return new Response(data, { status })
}
export function json(data,status=200){

return new Response(JSON.stringify(data),{
status,
headers:{
"Content-Type":"application/json"
}
})

}
