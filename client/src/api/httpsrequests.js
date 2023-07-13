import { BASE_URL } from "./baseURL";
import axios from "axios";

//GET DATAS

export const getAlldatas = async()=>{
    let globalData;
    await axios.get(`${BASE_URL}/form`).then((res)=>{
        globalData = res.data
    })
    return globalData
}

//GET DATAS BY ID

export const getdatasbyID = async(id)=>{
    let globalData
    await axios.get(`${BASE_URL}/form/${id}`).then((res)=>{
        globalData = res.data
    })
    return globalData
}

//Delete Datas

export const deleteDatas = async(id)=>{
    await axios.delete(`${BASE_URL}/form/${id}`)
}

//Post Data

export const postDatas = async(payload)=>{
    await axios.post(`${BASE_URL}/form`,payload)
}

//Update data

export const putDataByID = async(update,id)=>{
    await axios.put(`${BASE_URL}/form/${id}`,update)
}