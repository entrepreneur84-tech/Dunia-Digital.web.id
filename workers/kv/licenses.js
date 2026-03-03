export async function saveLicense(env, license) {
  await env.LICENSES.put(license.license, JSON.stringify(license))
}

export async function getLicense(env, key) {
  const data = await env.LICENSES.get(key)
  if (!data) return null
  return JSON.parse(data)
}
