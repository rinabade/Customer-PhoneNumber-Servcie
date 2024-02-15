const { pool } = require("../helper/dbHelper");

const getCustomerInfo = async(req,res)=>{
    const phoneNumber = req.params.phone_number;
    try {        
        const sql = `SELECT * FROM BaseTable WHERE phone_number=?`;
        const result = await pool.execute(sql, [phoneNumber]);
        if(result.length > 0){
            return res.status(200).json({
                "status": 200,
                "error": false,
                "response": { 
                    "message" : "Customer Information fetched successfully", 
                    data: result[0] 
                }
            })
        }
        return res.status(404).json({
            "status": 404,
            "error": false,
            "response": { "message" : "Data Not Found" }
        })
        
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

module.exports={getCustomerInfo};