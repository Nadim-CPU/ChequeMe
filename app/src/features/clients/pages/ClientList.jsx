import { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { deleteUser, getClient, getClients } from "../services/client.service";
const ClientList = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        loadClients();
    }, []);

    const loadClients = async () => {
        const data = await getClients();
        setClients(data)
    }

    return (
        <>
            <h3> Client List</h3>
            <Link to="/clients/new">Create</Link>
            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>DOB</th>
                        <th colSpan={2}>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        clients.map(client => (
                            <tr key={client.client_id}>
                                <td>{client.client_id}</td>
                                <td>{client.client_name}</td>
                                <td>{client.client_email}</td>
                                <td>{moment(client.client_dob).format("YYYY-MM-DD")}</td>
                                <td><Link to={`/clients/${client.client_id}/edit`}>Edit</Link></td>
                                <td><button onClick={() => deleteUser(client.client_id)}>Del.</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}
export default ClientList;