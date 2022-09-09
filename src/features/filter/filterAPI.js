import axiosInstance from '../../utils/axios';

export const getFilteredTransactions = async ({ type, inputText }) => {
    let queryString;
    if (inputText !== '') {
        queryString += `&q=${inputText}`;
    }
    if (type !== '') {
        queryString += `&type=${type}`;
    }

    const response = await axiosInstance.get(`/transactions/?${queryString}`);
    return response.data;
};
