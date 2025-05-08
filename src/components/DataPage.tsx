import { useEffect, useState } from "react"
import MedicalService from "../app/services/medicalSevice";
import { MedicalData } from "../app/core/entities/MedicalData";
import TadawiTable from "./TadawiTable";
import Header from "./Header";
import queryString from 'query-string';

const DataPage = () => {
    const [data, setData] = useState([] as MedicalData);
    const [error, setError] = useState(''); 
    const parsed = queryString.parse(window.location.search);

        let branchno = parsed.branchno?.toString() ?? "02"; 
    const fetchData = async (branchno: string | undefined) => {
        try {

            const result = await MedicalService.getData(branchno);
            setData(result);

        } catch (err) {
            setError('error');
        }
    }
    useEffect(() => {
        fetchData(branchno);
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval)
    }, [])
  
    return <div>
        <Header />

        <TadawiTable sampleData={data} /></div>
}
export default DataPage