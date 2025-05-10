import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axios.config";
import type { AxiosRequestConfig } from "axios";


interface IAuthQuery {
    queryKey:string[],
    url:string,
    config?: AxiosRequestConfig
    
}

{/**
    
 * Hook to make a query to the backend, using the provided URL and Axios config,
 * and store the result in the query cache. The hook will automatically re-run
 * the query if the user logs out or their access token is refreshed.
 *
 * @param {IAuthQuery} options Options for the hook
 * @param {string[]} options.queryKey The key to store the query result in the cache
 * @param {string} options.url The URL to query
 * @param {AxiosRequestConfig} [options.config] The Axios config for the request
 * @returns {UseQueryResult} The result of the query
*/}

const useAuthQuery = ({queryKey, url, config }: IAuthQuery)=>{
    return useQuery({
        queryKey,
        
        queryFn:async ()=>{
           const {data}= await axiosInstance.get(url,config);
                
            return data.todos;
        }
    });
}

export default useAuthQuery;