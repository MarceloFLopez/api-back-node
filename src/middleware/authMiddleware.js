const jwt = require("jsonwebtoken");
module.exports = (requiredRoles) => {
  return (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // "Bearer <token>"

    if (!token) {
      return res.status(403).json({ error: "Token não fornecido." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Token inválido." });
      }

      // Armazene as informações do usuário no `req.user` para que elas possam ser acessadas nos controladores
      req.user = decoded;

      // Verifique se a role do usuário está dentro das roles permitidas
      if (requiredRoles && !requiredRoles.includes(req.user.role)) {
        return res.status(403).json({ error: "Permissão negada." });
      }

      next(); // Permita o acesso ao próximo middleware ou controlador
    });
  };
};
