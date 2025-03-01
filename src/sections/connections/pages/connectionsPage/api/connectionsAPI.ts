import Cookies from "universal-cookie";

const cookie = new Cookies();
export const uploadCSVFile = async (file) => {
    const res = await fetch('/api/v1/Datasets/upload', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${cookie.get('token')}`,
            "Content-Type": "multipart/form-data"
        },
        body: file,
        credentials: 'include'
    });
    return res;
}

export const getDatasets = async () => {
    const res = await fetch('/api/v1/Datasets', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${cookie.get('token')}`,
        },
        credentials: 'include'
    });
    console.log(res);
}