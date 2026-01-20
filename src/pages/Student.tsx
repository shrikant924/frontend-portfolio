import axios from "axios";
import { useEffect, useState } from "react";

interface Student {
    rollNo: number;
    name: string;
    marks: number;
}

const ShowStudent = () => {

    const [students, setStudents] = useState<Student[]>([]);

    useEffect(() => {
        axios.get<Student[]>("http://localhost:8080/api/getStudents")
            .then(res => {
                setStudents(res.data);
            });
    }, []);

    return (
        <>
            <h2>Student List</h2>

            <table border={1} cellPadding={10}>
                <thead>
                    <tr>
                        <th>Roll No</th>
                        <th>Name</th>
                        <th>Marks</th>
                    </tr>
                </thead>

                <tbody>
                    {students.map(student => (
                        <tr key={student.rollNo}>
                            <td>{student.rollNo}</td>
                            <td>{student.name}</td>
                            <td>{student.marks}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
};

export default ShowStudent;
