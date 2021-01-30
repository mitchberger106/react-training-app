import { useEffect, useState } from 'react';
 
export const DEFAULT_OPTIONS = {};
export const baseURL = 'https://demomocktradingserver.azurewebsites.net/';
export const getUserId = () => localStorage['userId'] = 'mitchell'; //localStorage['userId'] || (localStorage['userId'] = 'Stelian' + new Date().getMilliseconds());
// for post {method: 'POST',  headers: { 'Content-Type': 'application/json' },  body: JSON.stringify(data)}
 
const useFetch = (url, options = DEFAULT_OPTIONS) => {
    const initialState = { list: null, isLoading: false, error: null };
    const [state, setState] = useState(initialState)
 
    useEffect(() => {
        const fetchData = async () => {
            setState(state => ({ ...state, isLoading: true }));
            try {
                const input = url.startsWith('http') ? url : `${baseURL}/${url}`;
                const init = { ...options, headers: { ...options.headers, userid: getUserId() } }
                const res = await fetch(input, init);
                const json = await res.json();
                setState(state => ({ ...state, list: json, isLoading: false }));
            } catch (error) {
                setState(state => ({ ...state, error, isLoading: false }));
            }
        };
        fetchData();
    }, [url, options]);
 
    const { list, isLoading, error } = state;
    return [list, isLoading, error];
};
 
export default useFetch;