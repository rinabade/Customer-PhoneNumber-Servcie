const axios = require("axios");
require("dotenv").config();

const customerinfoService = async(username) => {
    let data;
    var config = {
        method: "get",
        url: `https://services.wlink.com.np/customers/customerinfos/${username}`,
        headers: {
            "Content-Type": "application/json",
            "AUthorization": process.env.TOKEN
        },
        data: username,
    };
    
    await axios(config)
    .then(async (response) => {
        data = response.data;
        return data;
        })
        .catch(function (error) {
        data=false
        console.log(error)
        return data;
    });
    return data;  
}

module.exports = {customerinfoService};