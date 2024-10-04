import axios from "axios";


const currency_api_key = import.meta.env.VITE_CURRECY_API_KEY;

export const fetchData = async (url: string) => {
    let response = await axios.get(url);
    return response.data;
};


export const trimText=(text: string)=>{
    return text.split(" ").slice(0,4).join("")

}

export const fetchConversionRate = async (currency: string,totalCostInUSD: number) => {
    try {
      const response = await axios.get("https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert", {
        params: {
          from: "USD", 
          to: currency,
          amount: totalCostInUSD,
        },
        headers: {
          "X-RapidAPI-Key": currency_api_key, 
          "X-RapidAPI-Host": "currency-conversion-and-exchange-rates.p.rapidapi.com",
        },
      });

      return response.data.info.rate
    } catch (error) {
      return "Something went wrong!"
    }
  };