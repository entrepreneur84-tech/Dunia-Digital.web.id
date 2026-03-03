export function checkAdminAuth(req, env) {
  const auth = req.headers.get("Authorization")
  if (!auth) return false

  const token = auth.replace("Bearer ", "")
  return token === env.ADMIN_TOKEN
}
