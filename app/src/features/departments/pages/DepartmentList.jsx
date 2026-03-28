import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { getDepartments, deleteDepartment } from "../services/departments.service";

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);

    useEffect(()=>{
        loadDep();
    }, []);

    const loadDep = async () =>{
        const deps = await getDepartments();
        console.log(deps);
        setDepartments(deps);
    }

    const remove = async (id) =>{
        await deleteDepartment(id);
        //setDepartments(departments.filter(d => d.dep_id !== id));
        loadDep();
    }
    return(
        <>
        <h1>Departments</h1>
        <Link className="btn btn-sm btn-secondary" to="/departments/new">Add Dep.</Link>
        <hr />
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {departments.map(d =>{
                    return(
                    <tr key={d.dep_id}>
                        <td>{d.dep_name}</td>
                        <td colSpan={2}>
                            <Link className="btn btn-sm btn-primary" to={`/departments/${d.dep_id}/edit`}>Edit</Link>
                            -
                            <button className="btn btn-sm btn-danger" onClick={()=>remove(d.dep_id)}>Del.</button>
                        </td>
                    </tr>
                    )
                })}
            </tbody>
        </table>
        </>
    )
}
export default DepartmentList;