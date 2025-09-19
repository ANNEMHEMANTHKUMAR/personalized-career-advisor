const adminMiddleware = (req, res, next) => {
    try {
      if (req.user && req.user.role === 'admin') {
        next();
      } else {
        return res.status(403).json({
          message: 'Access denied. Admin privileges required.'
        });
      }
    } catch (error) {
      console.error('Admin middleware error:', error);
      res.status(500).json({
        message: 'Internal server error'
      });
    }
  };
  
  module.exports = adminMiddleware;