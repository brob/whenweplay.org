import { defineCollection, z } from "astro:content";
import { glob } from 'astro/loaders';
import { sanityClient } from "sanity:client";
import type { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";


const blog = defineCollection({
    loader: glob({ pattern: '*.md', base: './src/content/blog' }),
    schema: z.object({
        title: z.string(),
        date: z.date(),
        slug: z.string(),
        description: z.string()
    })
})

const materials = defineCollection({
    schema: z.object({
        id: z.string(),
        name: z.string(),
        tagline: z.string().nullable(),
        slug: z.string(),
        boxArt: z.any().nullable(),
        available: z.boolean().nullable().optional(),
        description: z.any(),
        msrp: z.number().nullable().optional(),
        age: z.string().nullable(),
        itemType: z.string().nullable().optional()

    }),
    loader: async () => {

        // return []
        const query = `*[_type == "material"]{
            _id,
            name,
            tagline,
            slug,
            boxArt{
              ...,
              asset->
            },
            available,
            description,
            msrp,
            age,
            itemType
        }`;

        const builder = imageUrlBuilder(sanityClient)
        function urlFor(source) {
            return builder.image(source);
          }

        const materials = await sanityClient.fetch(query);
        const readiedMaterials = materials.map((material: SanityDocument) => ({
            id: material._id,
            name: material.name,
            tagline: material?.tagline || '',
            slug: material.slug.current,
            available: material.available,
            description: material.description,
            msrp: material.msrp,
            age: material.age,
            boxArt: material.boxArt,
            itemType: material.itemType,
            // boxArtUrl: material?.boxArt ? urlFor(material.boxArt).url() : null

        }))
        // return []
        return readiedMaterials; // Limit to 10 items for performance
    }
})


export const collections = { blog,materials }