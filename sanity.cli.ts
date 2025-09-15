/**
 * ###########################################################################
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/

//this is a config file, so we can use sanity operations using the sanity cli
//we can use projectId and dataset.
import { defineCliConfig } from 'sanity/cli'
//IT AUTOMATICALLY ADDED THE ENV VARIABLES FOR US.
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export default defineCliConfig({ api: { projectId, dataset } })
//NOW GO BACK.