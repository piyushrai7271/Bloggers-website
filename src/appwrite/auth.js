import conf from "../conf/conf";
import { Account, Client, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    
    try {
      const useAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (useAccount) {
        //call another method
        return this.login({ email, password });
      } else {
        return useAccount;
      }
    } catch (error) {
      console.log("Appwrite service :: createAccount :: error",error)
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
    }
    return null;
  }

  async logOut() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logOut :: error", error);
    }
  }
}
const authService = new AuthService();

export default authService;
