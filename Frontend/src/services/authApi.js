const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (email,password) =>{
    const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    }
    const res = await fetch(`${API_URL}/auth/login`,config);
    const data = await res.json();
    return data;
}

export const registerUser = async(name,email,password) =>{
    const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name,email,password }),
    }
    const res = await fetch(`${API_URL}/auth/register`,config);
    const data = await res.json();
    return data;
}