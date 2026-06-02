import { Client, Account, ID, OAuthProvider } from "appwrite";
import conf from "../conf.js";

class auth {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(conf.API_ENDPOINT).setProject(conf.PROJECT_ID);
    this.account = new Account(this.client);
  }

  async createAccount({email, password, name}) {
    try {
        await this.account.create({ userId:ID.unique(), email, password, name });
        return await this.createEPSession({email, password})
    } catch (error) {
        console.log("create account: ",error);
        
    }
  }

  async getAccount() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("error in get Account: ", error);
    }
  }

  async createEPSession({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession({ email, password });
    } catch (error) {
      console.log("create ep session: ", error);
    }
  }
  async deleteSessions() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("deletesessions: ", error);
    }
  }

  async createOAuth2Session(){
    try {
      return await this.account.createOAuth2Session({
        provider:OAuthProvider.Google,
        success:"https://blog-beta-azure.vercel.app",
        failure:"https://blog-beta-azure.vercel.app/signup"
      })
    } catch (error) {
      console.log("createOAuth2Session: ",error);
      
    }
  }
  
}

const authService = new auth()

export default authService