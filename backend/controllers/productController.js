import { pool } from '../config/db.js';
export const getProducts = async (req, res) => {
    try {

        const { keyword } = req.query;

        let query = 'SELECT * FROM products';
        let params = [];

        if (keyword) {
            query += ' WHERE name ILIKE $1';
            params.push(`%${keyword}%`);
        } else {
            console.log("No keyword provided, returning all.");
        }

        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};