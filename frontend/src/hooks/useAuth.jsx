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
    }

    async function register(user) {

        let msgText = 'Cadastro realizado com sucesso!'
        let msgType = 'sucess'

        try {
            // registrando o user e mandando o token para setar no localStorage
            const data = await api.post('/users/register', user).then((response) => {
                return response.data
            })

            await authUser(data)

            toast.success(msgText, {
                position: "top-left",
                autoClose: 3500,
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
                position: "top-left",
                autoClose: 3500,
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
            const data = await api.post('/users/login', user).then((response) => {
                return response.data
            })

            await authUser(data)

            toast.success(msgText, {
                position: "top-left",
                autoClose: 3500,
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
                position: "top-left",
                autoClose: 3500,
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

        toast.success(msgText, {
            position: "top-left",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    }


    return { authenticated, register, login, logout }
}