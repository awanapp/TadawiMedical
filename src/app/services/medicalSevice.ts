import { MedicalData } from "../core/entities/MedicalData";
import HttpService from "./httpService";

class MedicalService {
    async getData(branchno: string | undefined): Promise<MedicalData> {
        try {
            return await HttpService.getData('http://192.168.28.12:9090/ords/exsys_api/ex_qu/qu_patient_approval_data?poffset=0&poffset_step=&planguageid=2&authorization=77938454&organization_no='+branchno);
        } catch (err) {
            throw new Error(
                "There is an error that happend while tring to connect to the server ."
            );
        }
    }
}
const _MedicalService = new MedicalService();
export default _MedicalService;