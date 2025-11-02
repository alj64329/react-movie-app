import { Client, Account, TablesDB } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID

export const client = new Client()

client
    .setEndpoint('https://nyc.cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)

export const account = new Account(client)
export const tableDB = new TablesDB(client)
export {ID} from 'appwrite'
