import { api } from "../../../services/api";

export const login = ({ user_email, password }) => {
    return api("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_email, password }),
        includeMeta: true,
    });
};

export const register = ({ user_first_name, user_last_name, user_email, user_dob, password}) => {
    return api("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_first_name, user_last_name,  user_email, user_dob, password}),
        includeMeta: true,
    });
};