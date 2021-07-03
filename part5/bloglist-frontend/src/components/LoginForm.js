import React, { useState } from 'react'

const LoginForm = ({ submitLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleLogin = (event) => {
        event.preventDefault()
        submitLogin({ 
            username: username,
            password: password
        })
        setUsername('')
        setPassword('')
    } 
    return (
        <div>
            <h2>LOGIN</h2>

            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        value={username}
                        onChange={handleUsernameChange}
                    />  
                </div>
                <div>
                    password
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                </div>
                <button type="submit">login</button>
            </form>
       </div>
    )
}

export default LoginForm