import { defineCollection, z } from "astro:content";
import { glob } from 'astro/loaders';



const blog = defineCollection({
    loader: glob({ pattern: '*.md', base: './src/content/blog' }),
    schema: z.object({
        title: z.string(),
        date: z.date(),
        slug: z.string(),
        description: z.string()
    })
})

export const collections = { blog }