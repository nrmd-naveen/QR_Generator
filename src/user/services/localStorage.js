
export const setIdToken = (id) =>{
    localStorage.setItem('idToken',id);
}

export const getIdToken = () =>{
    return localStorage.getItem('idToken')?localStorage.getItem('idToken'):null;
}