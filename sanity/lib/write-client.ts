import "server-only"

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../env'


export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, 
  token: token
})

if(!writeClient.config().token){
    throw new Error("Write Token not found")
}//this is the failsafe.

//now that we finally have the token, we can finally update the views in view.ts