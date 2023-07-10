import { ValidationErrorMessage, fetchUtils } from "react-admin";

const userApiUrl = 'http://localhost:3000/app-user';

export const validateUpdateUsernameUnicity = (id: number) => async (name: string) => {

    const httpClient = fetchUtils.fetchJson;
    
    const apiUrl = `${userApiUrl}/${id}/validate-userName-duplication`;

    const usernameDto = {
        userName: name
    };

    const { json: isUpdatedUsernameDuplicated } = await httpClient(apiUrl, {
        method: 'POST',
        body: JSON.stringify(usernameDto)
    });

    if(isUpdatedUsernameDuplicated) {
        return {
            message: 'Username is already taken',
            args: {}
        }
    }

    return undefined;
};

export const validateCreatedUsernameUnicity = async (name: string):
        Promise<ValidationErrorMessage | null | undefined> => {

    const httpClient = fetchUtils.fetchJson;
    
    const apiUrl = `${userApiUrl}/validate-userName-duplication`;

    const usernameDto = {
        userName: name
    };

    const { json: isCreatedUsernameDuplicated } = await httpClient(apiUrl, {
        method: 'POST',
        body: JSON.stringify(usernameDto)
    });

    if(isCreatedUsernameDuplicated) {
        return {
            message: 'Username is already taken',
            args: {}
        }
    }

    return undefined;
}