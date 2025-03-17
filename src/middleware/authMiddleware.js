const verificarTokenRevogado = require('../middleware/tokenMiddleware'); // Importa a função que verifica no banco
const jwt = require("jsonwebtoken");

module.exports = (requiredRoles) => {
  return async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // "Bearer <token>"

    if (!token) {
      return res.status(403).json({ error: "Token não fornecido." });
    }

    // Verifique se o token foi revogado
    const tokenRevogado = await verificarTokenRevogado(token);
    if (tokenRevogado) {
      return res.status(403).json({ error: "Token revogado. Faça login novamente." });
    }

    // Verifica e decodifica o token JWT
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Token inválido." });
      }

      req.user = decoded;

      // Verifique se a role do usuário está dentro das roles permitidas
      if (requiredRoles && !requiredRoles.includes(req.user.role)) {
        return res.status(403).json({ error: "Permissão negada." });
      }

      next(); // Permite o acesso ao próximo middleware ou controlador
    });
  };
};
