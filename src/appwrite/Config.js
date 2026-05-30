import conf from "../conf";
import { Client, Condition, ID, TablesDB, Storage, Query } from "appwrite";
//$id ,userId, userName, ImageId, title, content, status
class Config {
  client = new Client();
  tablesDB;
  storage;
  constructor() {
    this.client.setEndpoint(conf.API_ENDPOINT).setProject(conf.PROJECT_ID);
    this.tablesDB = new TablesDB(this.client);
    this.storage = new Storage(this.client);
  }

  async createRow({ userId, userName, ImageId, title, content, status }) {
    try {
      return await this.tablesDB.createRow({
        databaseId: conf.DATABASE_ID,
        tableId: conf.TABLE_ID,
        rowId: ID.unique(),
        data: {
          userId,
          userName,
          ImageId,
          title,
          content,
          status,
        },
      });
    } catch (error) {
      console.log("src/appwrite/Config.js createRow", error);
    }
  }

  async getRow(rowId) {
    try {
       return await this.tablesDB.getRow({
        databaseId: conf.DATABASE_ID,
        tableId: conf.TABLE_ID,
        rowId: rowId,
      });
    } catch (error) {
      console.log("getRow: ", error);
    }
  }

  //todo: add public/private tag to posts and show private posts(in AllPosts section) only to the author (staus:true/false), add query in listRows for this

  async listRows() {
    try {
      return await this.tablesDB.listRows({
        databaseId: conf.DATABASE_ID,
        tableId: conf.TABLE_ID,
        queries:[Query.orderDesc("$createdAt")]
      });
    } catch (error) {
      console.log("listRows: ", error);
    }
  }

  async updateRow({ rowId, ImageId, title, content, status }) {
    try {
      return await this.tablesDB.updateRow({
        databaseId: conf.DATABASE_ID,
        tableId: conf.TABLE_ID,
        rowId: rowId,
        data: {
          ImageId,
          title,
          content,
          status,
        },
      });
    } catch (error) {
      console.log("updateRow: ", error);
    }
  }

  async deleteRow(rowId) {
    try {
      return await this.tablesDB.deleteRow({
        databaseId: conf.DATABASE_ID,
        tableId: conf.TABLE_ID,
        rowId: rowId,
      });
    } catch (error) {
      console.log("deleteRow: ", error);
    }
  }

  //storage operations
  async createFile(file) {
    try {
      return await this.storage.createFile({
        file: file,
        fileId: ID.unique(),
        bucketId: conf.BUCKET_ID,
      });
    } catch (error) {
      console.log("createFile: ", error);
    }
  }

  async getFile(ImageId) {
    try {
      return await this.storage.getFile({
        bucketId: conf.BUCKET_ID,
        fileId: ImageId,
      });
    } catch (error) {
      console.log("getFile: ", error);
    }
  }
  async deleteFile(ImageId) {
    try {
      return await this.storage.deleteFile({
        bucketId: conf.BUCKET_ID,
        fileId: ImageId
      })
    } catch (error) {
      console.log("deleteFile: ", error);
    }
  }
  async getfilePreview(ImageId){
    try {
        return await this.storage.getFileView({
            bucketId:conf.BUCKET_ID,
            fileId: ImageId
        })
    } catch (error) {
     console.log("getFilePreview: ",error);
        
    }
  }

}
const appwriteService = new Config();

export default appwriteService;
