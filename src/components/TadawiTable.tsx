import { useEffect, useState } from "react";
import { MedicalData } from "../app/core/entities/MedicalData"; 

const TadawiTable = ({ sampleData }: { sampleData: MedicalData }) => {
  const [page, setPage] = useState(1); 

  const itemsPerPage = 10;

  const pagedData = sampleData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const totalPages = Math.ceil(sampleData.length / itemsPerPage);
  const maxVisiblePages = 3;

  const currentGroup = Math.floor((page - 1) / maxVisiblePages);
  const startPage = currentGroup * maxVisiblePages + 1;
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setPage(prevPage => (prevPage < totalPages ? prevPage + 1 : 1));
    }, 30000); 

    return () => clearInterval(interval);
  }, [totalPages]);
  return (
    <div className="p-4 bg-white shadow rounded-md font-sans">


      <table className="w-100 border-secondary text-center table-bordered dashed-border">
        <thead className="bg-primary text-white p-2" style={{ fontSize: '20px' }}>
          <tr>
            <th className="p-2 m-1"><p>N</p><p>م</p></th>
            <th className="p-2"><p>File Number</p> <p>رقم الملف</p></th>
            <th className="p-2"><p>Clinic</p><p>القسم </p></th>
            <th className="p-2"><p>Insurance Company</p><p>شركة التأمين</p></th>
            <th className="p-2"><p>Waiing Time</p><p>وقت الانتظار</p></th>
            <th className="p-2"><p>Status</p><p>الحالة</p></th>
          </tr>
        </thead>
        <tbody>
          {pagedData.map((row, idx) => (
            <tr key={idx} className="border-top border-primary" style={{ borderTopColor: '#e5e7eb' }}>
              <td className="p-2">{(page - 1) * itemsPerPage + idx + 1}</td>
              <td className="p-2">{row.patient_file_no}</td>
              <td className="p-2">{`${row.attendance_en} / ${row.attendance_ar}`}</td>
              <td className="p-2">{`${row.description_en} / ${row.description_ar}`}</td>
              <td className="p-2">{row.trx_date}</td>
              <td className='p-2'>
                {`${row.status_en} / ${row.status_ar}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex gap-2 justify-content-center mt-3">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          className="px-3 py-1 border rounded"
          disabled={page === 1}
        >
          Previous
        </button>

        {pageNumbers.map(p => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1 border rounded ${page === p ? "bg-primary text-white" : "bg-light"}`}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          className="px-3 py-1 border rounded"
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TadawiTable;


