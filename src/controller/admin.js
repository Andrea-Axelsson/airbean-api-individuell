
import db from "../database/database.js";
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key';

const logInAdmin = async (adminEmail, adminPassword) => {
    try {
        const adminUser = await db.admin.findOne({ email: adminEmail, password: adminPassword });
        if (!adminUser) {
            throw new Error("Admin user does not exist");
        }
        
        const token = jwt.sign({ id: adminUser._id, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
        return { adminUser, token };
    } catch (error) {
        console.error("Error finding admin user", error);
        throw error;
    }
};

export { logInAdmin };