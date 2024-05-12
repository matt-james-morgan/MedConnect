import axios from "axios";
import { useEffect, useState } from "react";

// Domain URL, pull from .env when not local
const API_BASE_URL = "http://localhost:8080/";

/**
 * Usage:
 * 
 * const {getLoading, getData} = useGet(
 *  @param query a string, do not use slashes at beginning or end
 *  @param id dynamically pass in the id of record you want to get
 * );
 * 
 * EXAMPLE:
 * const {getLoading, getData} = useGet(
 *  'clinics',
 *  clinic_id
 * );
 */
export const useGet = (query, id) => {
  const [getLoading, setGetLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setGetLoading(true);

        const response = await axios.get(`${API_BASE_URL}${query}/${id ? id : ""}`);

        setData(response.data);

        setGetLoading(false);
      } catch (error) {
        console.error("Error getting", error);
        throw error;
      }

    }

    fetchData();
  }, [query, id]);

  return { getLoading, data };
}

/**
 * Usage:
 * 
 * @post is a callback that accepts two arguments
 *  @param query a string, do not use slashes at beginning or end
 *  @param payload an object that correlates to the record you want to post
 * 
 * EXAMPLE:
 * const {postLoading, postData, post} = usePost();
 * ...some code
 * post(
 *  'doctors',
 *  doctor_object
 * );
 */
export const usePost = () => {
  const [postLoading, setPostLoading] = useState(false);
  const [postData, setPostData] = useState(null);

  const post = async (query, payload) => {
    try {
      setPostLoading(true);

      const response = await axios.post(`${API_BASE_URL}${query}/${payload.id ? payload.id : ""}`, payload);

      setPostData(response.data);

      setPostLoading(false);
    } catch (error) {
      console.error("Error posting", error);
      throw error;
    }

  }

  return { postLoading, postData, post };
}

/**
 * Usage:
 * 
 * @put is a callback that accepts two arguments
 *  @param query a string, do not use slashes at beginning or end
 *  @param payload an object that correlates to the record you want to put
 * 
 * EXAMPLE:
 * const {putLoading, putData, put} = usePut();
 * ...some code
 * put(
 *  'doctors',
 *  doctor_object
 * );
 */
export const usePut = () => {
  const [putLoading, setPutLoading] = useState(false);
  const [putData, setPutData] = useState(null);

  const put = async (query, payload) => {
    try {
      setPutLoading(true);

      const response = await axios.put(`${API_BASE_URL}${query}/${payload.id ? payload.id : ""}`, payload);

      setPutData(response.data);

      setPutLoading(false);
    } catch (error) {
      console.error("Error editing", error);
      throw error;
    }

  }


  return { putLoading, putData, put };
}

/**
 * Usage:
 * 
 * @deleteRecord is a callback that accepts two arguments
 *  @param query a string, do not use slashes at beginning or end
 *  @param id dynamically pass in the id of record you want to delete
 * 
 * EXAMPLE:
 * const {deleteLoading, deleteData, deleteRecord} = usedelete();
 * ...some code
 * deleteRecord(
 *  'doctors',
 *  doctor_id
 * );
 */
export const useDelete = () => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteData, setDeleteData] = useState(null);

  const deleteRecord = async (query, id) => {
    try {
      setDeleteLoading(true);

      const response = await axios.get(`${API_BASE_URL}${query}/${id}`);

      setDeleteData(response.deleteData);

      setDeleteLoading(false);
    } catch (error) {
      console.error("Error deleting", error);
      throw error;
    }
  }

  return { deleteLoading, deleteData, deleteRecord };
}