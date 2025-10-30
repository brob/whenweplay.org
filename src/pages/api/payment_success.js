export const prerender = false
import {loadStripe} from '@stripe/stripe-js';
import {createClient} from '@sanity/client'
import { sanityClient } from 'sanity:client';

const client = createClient({
    projectId: "4v8ldsm8",
    dataset: "production",

    apiVersion: '2025-02-06', // use current date (YYYY-MM-DD) to target the latest API version. Note: this should always be hard coded. Setting API version based on a dynamic value (e.g. new Date()) may break your application at a random point in the future.
    token: import.meta.env.SANITY_WRITE // Needed for certain operations like updating content, accessing drafts or using draft perspectives
  })


export async function POST({ request }) {
  const data = (await request.json()).object
  console.log(data)

    if (!data?.metadata?.sanity_id) return new Response('No metadata',{status: 500})
    
      try {
        const response = await client.patch(data.metadata.sanity_id).dec({quantity: 1}).commit()
        console.log(response)
        return new Response(JSON.stringify({'name':'hi'}), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });

      } catch(error) {
        console.log(error)
        return new Response(error,{status: 500})
      }

    
}
  