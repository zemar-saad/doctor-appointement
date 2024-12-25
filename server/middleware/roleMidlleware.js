// middleware/roleMiddleware.js

function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
      // Check if the session exists and the user is authenticated
      if (!req.session || !req.session.user) {
        return res.status(401).json({ msg: "User not authenticated", status: false });
      }
  
      const userRole = req.session.user.role; // Extract the role from the session
  
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ msg: "Access denied: Insufficient permissions", status: false });
      }
  
      next(); // User has the required role, proceed to the next middleware or route handler
    };
  }
  
  module.exports = authorizeRoles;
  