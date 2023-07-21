import axios from "axios";

interface Params {
  headers: any;
  method: string;
}

const config: Params = {
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  method: "post",
};

export const getProducts = async (data: any): Promise<any> => {
  return await axios({
    ...config,
    url:
      "https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI",
    data,
  })
    .then((response) => {
      console.log(response);
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        status: error.status,
        data: error.response,
      };
    });
};
