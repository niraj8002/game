import axios from "axios";
import { environment } from "./Environment";


const axiosInstance = axios.create({ baseURL: environment.url.API_URL });

axiosInstance.get().then((response) => {
});
export default axiosInstance;