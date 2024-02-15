const { pool } = require("../helper/dbHelper");
const { customerinfoService } = require("../services/diagnosticGetService");

const checkCustomerInfo = async(userName, phoneNumber) => {
    try {
        const query = `SELECT * FROM BaseTable WHERE username = '${userName}' AND phone_number = '${phoneNumber}'`;
        const result = await pool.query(query);
        return result[0].length == 0 ? false : true;
    } 
    catch (error) {
        return (`${error.message}`);
    }
};

const insertCustomerInfo = async(userName, phoneNumber) => {
    try {
        const sql = `INSERT INTO BaseTable (username, phone_number) VALUES (?,?)`;
        const result = await pool.execute(sql, [userName, phoneNumber]);
        return result;
    } 
    catch (error) {
        return (`${error.message}`);
    }
};

const messageConsume = async (consumerRequest) => {
    try {
        const { username } = consumerRequest;
        var info = await customerinfoService(username);

        const primaryPhoneNumberExists = await checkCustomerInfo(username, info.primary_mobile_number);        
        if (!primaryPhoneNumberExists) {
            await insertCustomerInfo(username, info.primary_mobile_number);
        }

        if (info.secondary_mobile_number) {
            const secondaryPhoneNumberExists = await checkCustomerInfo(username, info.secondary_mobile_number);
            if (!secondaryPhoneNumberExists) {
                await insertCustomerInfo(username, info.secondary_mobile_number);
            }
        }

        return "Processed customer information successfully.";
        
    } 
    catch (error) {
        return (`${error.message}`);
    }    
}

module.exports = { messageConsume };
