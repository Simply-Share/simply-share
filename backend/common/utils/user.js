export function getFileSizeLimit(user) {
  const { storageLimit } = user.plan.data
  return storageLimit
}
