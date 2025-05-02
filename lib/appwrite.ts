import { Client, Storage } from "appwrite";

const client = new Client();

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1') // 
    .setProject('681329ed001df9b81104');

export const storage = new Storage(client);   