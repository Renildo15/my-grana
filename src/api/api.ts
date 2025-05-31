import { uri } from "./uri"

export async function fetchWithToken(url: string) {
    const token = localStorage.getItem('accessToken')
    if (!token) throw new Error("Sem token");

    const res = await fetch(`${uri}${url}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (res.status === 401) {
        const refresh = localStorage.getItem("refreshToken")
        if(!refresh) throw new Error("Sem refresh token");

        const refreshRes = await fetch(`${uri}$/token/refresh/`, {
            method: "POST",
            headers: {'Content-Type':  'application/json'},
            body: JSON.stringify({refresh})
        })

        if (!refreshRes.ok) throw new Error('Erro ao renovar token');
        const { access } = await refreshRes.json()
        localStorage.setItem("accessToken", access)

        const retry = await fetch(`${uri}${url}`, {
            headers: {
                Authorization: `Bearer ${access}`,
            },
        })

        if (!retry.ok) throw new Error('Erro ao buscar dados com token novo');
        return retry.json();
    
    }

    if (!res.ok) throw new Error("Erro na API")
    return res.json()
}

export async function fetcherSimple(url: string, token: string){
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        }
    })

    if (!res.ok) {
        throw new Error('Failed to fetch');
    }

    return res.json();
}