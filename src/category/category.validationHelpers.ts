import { ValidationErrorMessage, fetchUtils } from "react-admin";
import { CATEGORY_ROUTE } from "./category.constants";

const categoryApiUrl = `http://localhost:3000/${CATEGORY_ROUTE}`;

export const validateCategoryUpdatedNameUnicity = (id: number) => async (name: string) => {

    const httpClient = fetchUtils.fetchJson;
    
    const apiUrl = `${categoryApiUrl}/${id}/validate-name-duplication`;

    const categoryDto = {
        name: name
    };

    const { json: isUpdatedNameDuplicated } = await httpClient(apiUrl, {
        method: 'POST',
        body: JSON.stringify(categoryDto)
    });

    if(isUpdatedNameDuplicated) {
        return {
            message: 'Name is already taken',
            args: {}
        }
    }

    return undefined;
};

export const validateCategoryCreatedNameUnicity = async (name: string):
        Promise<ValidationErrorMessage | null | undefined> => {

    const httpClient = fetchUtils.fetchJson;
    
    const apiUrl = `${categoryApiUrl}/validate-name-duplication`;

    const categoryDto = {
        name: name
    };

    const { json: isCCategoryreateddNameDuplicated } = await httpClient(apiUrl, {
        method: 'POST',
        body: JSON.stringify(categoryDto)
    });

    if(isCCategoryreateddNameDuplicated) {
        return {
            message: 'dName is already taken',
            args: {}
        }
    }

    return undefined;
}