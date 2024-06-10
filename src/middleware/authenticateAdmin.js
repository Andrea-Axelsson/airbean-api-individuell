import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key';  // Samma hemliga nyckel som används i admin.js

const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Token required for authentication' });
  }
  
  const token = authHeader.split(' ')[1];
  
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err || decoded.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Unauthorized, admin access required' });
    }
    req.adminId = decoded.id; // Lagra admin ID i requestet för vidare användning
    next();
  })
}

export default authenticateAdmin;