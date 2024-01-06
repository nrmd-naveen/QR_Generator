import { getIdToken } from "./localStorage"


export const isAuthenticated = () =>{
    let id = getIdToken();
    return (id == null || undefined ) ?false:true;
}