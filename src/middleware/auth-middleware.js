const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your-secret-key';

exports.authMiddleware = (req, res, next) => {
    const token = jwt.sign(
        { id: user._id, username: user.username, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' }
    );
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};