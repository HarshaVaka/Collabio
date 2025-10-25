import { API } from "./api";

export class HomeService {
  static checkAuth = async () => {
    return true;
    const response = await API.get("/home/protect");
    return response.data;
  };
}