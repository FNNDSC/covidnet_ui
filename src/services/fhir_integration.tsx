import axios, { AxiosRequestConfig } from "axios";

class FhirIntegration {
    static fetchRequest(url: string) {
        const auth = { token: `${window.sessionStorage.getItem("AUTH_TOKEN")}` };
        const header = {
          "Content-Type": "application/vnd.collection+json",
          "Authorization": "Token " + auth.token
        };
    
        const config: AxiosRequestConfig = {
          headers: header,
          method: "get",
          url
        };
        return axios(config);
      }

      static getPatientInfo(url: string):  {

      }

      //where is the URL passed? retrieved? where is being set/kept?
}
