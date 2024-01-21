import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";

export const AuthContext = createContext({});

function AuthProvider({children}) {

    const [data, setData] = useState({})

   async function SignIn({ email, password }){
    try{
        const response = await api.post("/sessions", {email, password})
        const { user, token } = response.data

        api.defaults.headers.common['authorization'] = `Bearer ${token}`;
        setData({ user, token })

        //Transformando o user e texto, porque o localStorage só trabalha com texto
        localStorage.setItem("@rocketnotes:user", JSON.stringify(user))
        //O token ja é um texto
        localStorage.setItem("@rocketnotes:token", token)

 }catch(error) {
     if(error.response) {
         alert(error.response.data.message)
     }else{
         alert("Não foi possivel fazer o login.")
     };
 };
   };

   function SignOut () {
    localStorage.removeItem("@rocketnotes:token")
    localStorage.removeItem("@rocketnotes:user")

    setData({})
   }

   //é acionado toda vez que a aplicação é recarregada
   useEffect(() => {
    const token =  localStorage.getItem("@rocketnotes:token")
    const user =  localStorage.getItem("@rocketnotes:user")

    if(user && token) {
        api.defaults.headers.common['authorization'] = `Bearer ${token}`;

        setData({
            token,
            user: JSON.parse(user)
        })
    }
   }, [])

    async function updatedProfile({user, avatarFile}) {
        try {

            if(avatarFile){
                const fileUploadForm = new FormData()
                fileUploadForm.append("avatar", avatarFile);

                const response = await api.patch("/users/avatar", fileUploadForm);
                user.avatar = response.data.avatar
            }

            await api.put("/users", user);
            localStorage.setItem("@rocketnotes:user", JSON.stringify(user));
            
            setData({user, token: data.token});
            alert("Perfil atualizado")
            
        } catch (error) {
            if(error.response) {
                alert(error.response.data.message)
            }else{
                alert("Não foi possivel atualizar.")
            };
        }
    }

    async function sendNewNote(title, description, tags, links){
        
        try{          
            await api.post("/notes", {
                title,
                description,
                tags,
                links
            })
            alert("Nota criada com sucesso")
            

        } catch(error) {
            if(error.response){
                alert(error.response.data.message)
            } else {
                alert("Nota não cadastrada")
            }
        }
    }

    return (
        <AuthContext.Provider value={{
         SignIn,
         SignOut,
         updatedProfile,
         sendNewNote,
         user: data.user
        }}>
            {children}
        </AuthContext.Provider>
    )
};

 function useAuth() {
    const context = useContext(AuthContext);

    return context;
};

export {AuthProvider, useAuth};