import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDepartment, saveDepartment } from "../services/departments.service";

const DepartmentForm = () => {
    const [form, setForm] = useState({name: ""});
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        if(id) loadDepartment(id);
    }, [id]);

    const loadDepartment = async(id) =>{
        const res = await getDepartment(id);
        setForm({name: res.dep_name});
    }

    const submit = async (e) => {
        e.preventDefault();
        await saveDepartment(form, id);
        navigate("/departments");
    }
    return(
        <>
            <h1>{id ? "Edit" : "Add"} Dep.</h1>
            <form onSubmit={submit}>
                <input 
                placeholder="Dep. name"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                />
                <button>Save</button>
            </form>
        </>
    )
}

export default DepartmentForm;
