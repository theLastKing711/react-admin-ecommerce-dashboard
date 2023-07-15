import { ValidationErrorMessage, fetchUtils } from "react-admin";
import { APP_USER_ROUTE } from "./appUser.constants";

const userApiUrl = `http://localhost:3000/${APP_USER_ROUTE}`;

export const validateAppUserUpdatedUserNameUnicity = (id: number) => async (name: string) => {

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

export const validateAppUserCreatedUserNameUnicity = async (name: string):
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