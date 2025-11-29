import { getCollection } from "astro:content";
const materials = await getCollection("materials");
const searchData = materials.map(item => ({
  title: item.data.name,
  description: item.data.descriptionPlainText
}))
export function GET({ params, request }) {
  return new Response(
    JSON.stringify(searchData)
  )
    
}