import api from "./api"

export const GetHomepage = async () => {

    try {
        const response = await api.get('homepage');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error;
    }


}
export const GetCategories = async () => {

    try {
        const response = await api.get('categories');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error;
    }


}
export const GetProductsById = async (product_id) => {

    try {
        const response = await api.get(`products/${product_id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error;
    }


}
export const GetProductsByCategory = async (category_id) => {

    try {
        const response = await api.get(`categories/${category_id}/products_category`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error;
    }


}
export const GetFavorites = async () => {

    try {
        const response = await api.get('favorites');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error;
    }


}
