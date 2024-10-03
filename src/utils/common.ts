import axios from "axios";

export const fetchData = async (url: string) => {
    let response = await axios.get(url);
    return response.data;
};


export const trimText=(text: string)=>{
    return text.split(" ").slice(0,4).join("")

}