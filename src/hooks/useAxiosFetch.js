import { useState, useEffect } from "react";
import axios from 'axios'

const useAxiosFetch = (dataurl) => {
    const [data, setData] = useState([])
    const [fetchError, setFetchError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        let isMounted = true
        const source = axios.CancelToken.source()

        const fetchData = async (url) => {
            setIsLoading(true)
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                })
                if (isMounted) {
                    setData(response.data)
                    setFetchError(null)
                }
            } catch (e) {
                if (isMounted) {
                    setFetchError(e.message)
                    setData([])
                }
            } finally {
                // isMounted && setTimeout(() => setIsLoading(false), 2000)
                isMounted && setIsLoading(false)
            }
        }

        fetchData(dataurl)

        const cleanUp = () => {
            isMounted = false
            source.cancel()
        }

        return cleanUp
    }, [dataurl])

    return { data, fetchError, isLoading }
}

export default useAxiosFetch