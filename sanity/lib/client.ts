import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

//this is the sanity readclient for fetching data through queries
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  //##################
  //if you set this to false it will cache your content for the next 60sec, after 60sec, you'll get a newer version of the data, but in those 60sec
  //the content will be delivered from the sanity cdn network, this follows the ISR data fetching strategy.
  // (go back)
})
