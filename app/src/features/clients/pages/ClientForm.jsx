import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getClient, saveClient } from "../services/client.service";
const ClientForm = () => {
    const [form, setForm] = useState({name: "", email: ""});
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        if(id){
            getClient(id).then(setForm);
        }
    }, [id]);

    /*const loadClientById = async() => {
        const res = await fetch(`${API}/${id}`);
        const data = await res.json();
        console.log(data)
        setForm({name: data.client_name, email: data.client_email});
    }*/

    const handleSubmit = async (e) => {
        e.preventDefault();
        await saveClient(form, id);
        navigate("/clients");
    }


    return(
        <>
            <h3>{id ? "Edit" : "Add"} Client</h3>

            <form className="w-75" onSubmit={handleSubmit} style={{ marginBottom: 20}}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                    className="form-control"
                    placeholder="Name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                    className="form-control"
                    placeholder="Email"
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    required />
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <button type="submit" className="btn btn-primary">
                    {id ? "Update" : "Add"}
                </button>
            </form>
        </>
    )
}

export default ClientForm;