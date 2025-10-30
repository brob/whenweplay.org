export const prerender = false
import {loadStripe} from '@stripe/stripe-js';
import {createClient} from '@sanity/client'

const client = createClient({
    projectId: "4v8ldsm8",
    dataset: "production",

    apiVersion: '2025-02-06', // use current date (YYYY-MM-DD) to target the latest API version. Note: this should always be hard coded. Setting API version based on a dynamic value (e.g. new Date()) may break your application at a random point in the future.
    token: import.meta.env.SANITY_WRITE // Needed for certain operations like updating content, accessing drafts or using draft perspectives
  })
const stripe = await loadStripe(import.meta.env.STRIPE_SECRET);


export async function POST({ request }) {
    let event = request.body;

    const signature = request.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
console.log({event})
    if (!event.metadata.sanity_id) return new Response({status: 500})
    
    console.log(event.metadata)

    return new Response(JSON.stringify({'name':'hi'}), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
  