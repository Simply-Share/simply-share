import { generateSlug } from 'random-word-slugs'

export async function randomSlugGenerator() {
  const slug = generateSlug(3, {
    format: 'sentence',
  })
    .toLowerCase()
    .replace(/\s/g, '-')
  const isAreadyExist = false
  if (isAreadyExist) {
    return randomSlugGenerator()
  }
  return slug
}
