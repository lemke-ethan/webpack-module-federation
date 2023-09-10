import { BehaviorSubject } from "rxjs"

const API_SERVER = "http://localhost:8080"

export const jwt = new BehaviorSubject(null)

/** Login to the server API. */
export async function login(args: { username: string, password: string }): Promise<string> {
    const response = await fetch(
        `${API_SERVER}/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(args)
        }
    )
    const jsonResponse = await response.json()
    jwt.next(jsonResponse.access_token)
    return jsonResponse.access_token
}