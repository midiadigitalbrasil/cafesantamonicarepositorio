import axios from "axios";

 
export default class MasterDataRest {
    private urlDoc: string;
    private urlSearch: string; 
    /**
     *
     * @param {String} entityName - Singla da entidade do masterData
     */
    constructor(entityName: string) { 
        this.urlDoc = `/safedata/${entityName}/documents/`;
        this.urlSearch = `/api/dataentities/${entityName}/search`;


    }

    /**
     * Realiza uma request http para o MasterData pela rota:
     *  - https://developers.vtex.com/reference/search
     * @param {} query - objecto com os query params
     * @param {} headers - Objeto com as informaçoes do cabeçalho da request
     *
     */
    public search(query = {}) {
        const params = new URLSearchParams(query).toString();
        return axios(`${this.urlSearch}?${params}`, {
            method: "GET"
        });
    }
 
    public get(id: string) {
        return axios(this.urlDoc + id, {
            method: "GET"
        });
    }
 
 
  
 
}
