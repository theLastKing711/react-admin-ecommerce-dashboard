import crudProvider from 'ra-data-nestjsx-crud';
import { fetchUtils, withLifecycleCallbacks } from "react-admin";
import { APP_USER_ROUTE } from '../appUser/appUser.constants';
import { CATEGORY_ROUTE } from '../category/category.constants';
import { PRODUCT_ROUTE } from '../product/product.constants';


const multipartFetch = (url: string, options: fetchUtils.Options = {}) => {
    // const customHeaders = (
    //     new Headers({
    //         // [`Content-Type`]: 'multipart/form-data',
    //         Accept: '*/*',
    //     }));
    // add your own headers here
    // customHeaders.set('Content-Type', 'multipart/form-data;boundary=<calculated when request is sent>');
    // console.log('options before', options);
    // console.log('options after', options)
    // console.log('options', options);
    // console.log('url', url);
    return fetchUtils.fetchJson(url, options);
}


export const customDataProvider = withLifecycleCallbacks(crudProvider('http://localhost:3000', multipartFetch), [
    // {
    //     resource: APP_USER_ROUTE,
    //     beforeCreate: async (params, dataProvider) => {

    //         const newParams = {
    //             ...params,
    //             data: {
    //                 ...params.data,
    //                 file: params.data.file.rawFile as File
    //             }
    //         }
    //         console.log('dataProvider', dataProvider);

    //         console.log('new data', params);

    //         const dataAsFormData = new FormData();

    //         dataAsFormData.append('userName', newParams.data.userName);
    //         dataAsFormData.append('password', newParams.data.password);
    //         dataAsFormData.append('file', newParams.data.file);

    //         console.log('data as form data', dataAsFormData);

    //         if(newParams.data.file instanceof File) {
    //             console.log('is file')
    //         }
            

    //     //   for (const [key, index] of newParams.data.file.entries()) {
    //     //     console.log(key, index)
    //     //   }

    //       console.log('file', newParams.data.file);

           
    //       console.log('file', newParams.data.file);

    //       first(dataAsFormData);

    //     //   return multipartFetch(`http://localhost:3000/app-user`, {
    //     //     method: 'POST',
    //     //     body: dataAsFormData,
    //     // }).then(({ json }) => ({
    //     //     data: { ...params.data, id: json.id },
    //     // }));

    //       return {
    //         data:  dataAsFormData,
    //        }

    //     }
    // }
]);

export const myDataProfider = {
    ...customDataProvider,
    create: (resource: any, params: any) => {

        if(resource === APP_USER_ROUTE)
        {
            console.log('resourse', resource);
            console.log('params', params);
            const formData = new FormData();

            formData.append('userName', params.data.userName);
            formData.append('password', params.data.password);
            formData.append('file', params.data.file.rawFile);

            return multipartFetch(`http://localhost:3000/${APP_USER_ROUTE}`, {
                method: 'POST',
                body: formData,
            }).then(({ json }) => ({
                data: { ...params.data, id: json.id },
            }));
        }
        

        if(resource === CATEGORY_ROUTE)
        {
            const formData = new FormData();

            formData.append('name', params.data.name);
            formData.append('file', params.data.file.rawFile);

            return multipartFetch(`http://localhost:3000/${CATEGORY_ROUTE}`, {
                method: 'POST',
                body: formData,
            }).then(({ json }) => ({
                data: { ...params.data, id: json.id },
            }));
        }

        if(resource === PRODUCT_ROUTE)
        {
            const formData = new FormData();

            formData.append('name', params.data.name);
            formData.append('categoryId', params.data.categoryId);
            formData.append('price', params.data.price);
            formData.append('file', params.data.file.rawFile);

            return multipartFetch(`http://localhost:3000/${PRODUCT_ROUTE}`, {
                method: 'POST',
                body: formData,
            }).then(({ json }) => ({
                data: { ...params.data, id: json.id },
            }));
        }

        return customDataProvider.create(resource, params);

    },
    update: (resource: any, params: any) => {

        console.log('params', params);

        if(resource === APP_USER_ROUTE)
        {
            console.log('resourse', resource);
            console.log('params', params);
            const formData = new FormData();

            formData.append('userName', params.data.userName);
            formData.append('password', params.data.password);
            if(params.data.file?.rawFile)
            {
                formData.append('file', params.data.file.rawFile);
            }

            return multipartFetch(`http://localhost:3000/${APP_USER_ROUTE}/${params.data.id}`, {
                method: 'PATCH',
                body: formData,
            }).then(({ json }) => ({
                data: { ...params.data, id: json.id },
            }));
        }
        
        if(resource === CATEGORY_ROUTE)
        {
            const formData = new FormData();

            formData.append('name', params.data.name);
            if(params.data.file?.rawFile)
            {
                formData.append('file', params.data.file.rawFile);
            }

            return multipartFetch(`http://localhost:3000/${CATEGORY_ROUTE}/${params.data.id}`, {
                method: 'PATCH',
                body: formData,
            }).then(({ json }) => ({
                data: { ...params.data, id: json.id },
            }));
        }

        if(resource === PRODUCT_ROUTE)
        {
            const formData = new FormData();

            formData.append('name', params.data.name);
            formData.append('categoryId', params.data.categoryId);
            formData.append('price', params.data.price);
            
            if(params.data.file?.rawFile)
            {
                formData.append('file', params.data.file.rawFile);
            }

            return multipartFetch(`http://localhost:3000/${PRODUCT_ROUTE}/${params.data.id}`, {
                method: 'PATCH',
                body: formData,
            }).then(({ json }) => ({
                data: { ...params.data, id: json.id },
            }));
        }

        return customDataProvider.create(resource, params);

    },
    getCategoriesDropdownList: () => {
        return fetch(`http://localhost:3000/${CATEGORY_ROUTE}/list`, { method: 'GET' })
            .then(response => response.json());
    },
    getProductsWithCategoryIdDropDownList: () => {
        return fetch(`http://localhost:3000/${PRODUCT_ROUTE}/list-with-category`, { method: 'GET' })
            .then(response => response.json());
    },

};