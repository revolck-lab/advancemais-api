const authorization = {
    checkRole: (role) => {
        return (req, res, next) => {
            console.log(role)
            if (!req.user || req.user.role_id !== role) {
                return res.status(403).json({ error: `Access denied: This resource is for ${role}s only` });
            }
            next();
        };
    },

    admin: (req, res, next) => authorization.checkRole(4)(req, res, next),
    company: (req, res, next) => authorization.checkRole(3)(req, res, next),
    student: (req, res, next) => authorization.checkRole(2)(req, res, next),
    teacher: (req, res, next) => authorization.checkRole(1)(req, res, next),

    accessLevel: (requiredLevel) => {
        return (req, res, next) => {
            const level = req.user.role_id;
            console.log(level)
            if (level < requiredLevel) {
                return res.status(403).json({ error: `Access denied: You need level ${requiredLevel} or higher to access this resource.` });
            }
            next();
        }
    }
};

module.exports = authorization;
