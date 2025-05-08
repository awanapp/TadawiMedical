import { MedicalData } from '../core/entities/MedicalData';
import response from './data.json'
class HttpService {
    
    
    public async getData(url: string): Promise<MedicalData> {
        
      
        try {
            const result = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    //   Authorization: this._authorization.accessToken
                    //     ? `Bearer ${this._authorization.accessToken}`
                    //     : "none",
                },
            });


            return (await result.json()).data  as MedicalData;
        } catch (err) {


            return response.data as MedicalData;

        }
    }
}
const _HttpService = new HttpService();
export default _HttpService;