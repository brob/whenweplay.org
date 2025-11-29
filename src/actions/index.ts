import { defineAction } from 'astro:actions';
import { getCollection } from 'astro:content';
import { z } from 'astro:schema';
import Fuse from 'fuse.js'

export const server = {
  search: defineAction({
    input: z.object({
      q: z.string(),
    }),
    handler: async({ q }) => {
        console.log(q)
        const list = (await getCollection('materials')).map(beer => beer.data)
        const fuseOptions = {
            keys: ['name', 'descriptionPlainText'],
            threshold: 0.3,
        }
        const fuse = new Fuse(list, fuseOptions)
        const results = fuse.search(q)
        return results.map(result => result.item);
    }
  })
}