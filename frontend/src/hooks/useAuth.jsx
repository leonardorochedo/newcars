import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../utils/api";

export function useAuth() {

    const [authenticated, setAuthenticate] = useState(false)
    const navigate = useNavigate()

    // manipulando o token
    useEffect(() => {
        const token = localStorage.getItem('token')

        // se tiver um token ja manda pro backend atraves da API
        if(token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticate(true)
        }
    }, [])

    async function authUser(data) {
        setAuthenticate(true)
        localStorage.setItem('token', JSON.stringify(data.token)) // setando no localStorage
        navigate('/')
        window.location.reload(true) // dar um refresh quando redirecionar
    }

    async function register(user) {

        let msgText = 'Cadastro realizado com sucesso!'

        try {
            // registrando o user e mandando o token para setar no localStorage
            const data = await api.post('/users/signout', user).then((response) => {
                return response.data
            })

            await authUser(data)

            toast.success(msgText, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        } catch (err) {
            msgText = err.response.data.message // pegando o error message mandado da API
            toast.error(msgText, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
    }

    async function login(user) {
        let msgText = 'Login realizado com sucesso!'

        try {
            const data = await api.post('/users/signin', user).then((response) => {
                return response.data
            })

            await authUser(data)
            
            toast.success(msgText, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        } catch (err) {
            msgText = err.response.data.message
            toast.error(msgText, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
    }

    async function deleteUser(id) {
        let msgText = 'Conta deletada com sucesso!'

        try {
            const data = await api.delete(`/users/delete/${id}`).then((response) => {
                return response.data
            })

            setAuthenticate(false)
            localStorage.removeItem('token')
            api.defaults.headers.Authorization = undefined
            navigate('/')

            window.location.reload(true) // dar um refresh quando redirecionar
            
            toast.success(msgText, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        } catch (err) {
            msgText = err.response.data.message
            toast.error(msgText, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
    }

    async function editUser(user, id) {
        let msgText = 'Usuário atualizado com sucesso!'

        try {
            const data = await api.patch(`/users/edit/${id}`, user, {
                headers: {
                    'Content-Type': 'multipart/form-data' // backend entender que esta indo uma imagem
                }
            }).then((response) => {
                return response.data
            })
            
            navigate('/')
            window.location.reload(true)

            toast.success(msgText, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        } catch (err) {
            msgText = err.response.data.message
            toast.error(msgText, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
    }

    function logout() {
        const msgText = 'Logout realizado com sucesso!'

        // logout geral
        setAuthenticate(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined
        navigate('/')

        window.location.reload(true) // dar um refresh quando redirecionar

        toast.success(msgText, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    }


    return { authenticated, register, login, deleteUser, editUser, logout }
}