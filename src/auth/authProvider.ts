import { SignInAppUserDto } from "./auth.type";

const authProvider = {
    login: ({ userName, password }: SignInAppUserDto) =>  {
        const request = new Request('http://localhost:3000/auth/login', {
            method: 'POST',
            body: JSON.stringify({ userName, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(auth => {
                localStorage.setItem('auth', JSON.stringify(auth));
            })
            .catch(() => {
                throw new Error('Network error')
            });
    },
    checkAuth: () => {
        // Required for the authentication to work
        const signedInUser = localStorage.getItem('auth');
        
        if(! signedInUser) {
            throw new Error('User not authenticated');
        }

        const parsedSignedInUser = JSON.parse(signedInUser) 
        
        return Promise.resolve(parsedSignedInUser);
    },
    getPermissions: () => {
        // Required for the authentication to work
        return Promise.resolve();
    },
    // ...
};

export default authProvider;
