import {pool} from "../config/db.js";

export const getMyOrders = async (req, res) => {
    try{
        const result = await pool.query(
            'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
            [req.user.id]
        );

        res.json(result.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};