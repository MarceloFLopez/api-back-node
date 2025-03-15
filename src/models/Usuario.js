class Usuario {
    constructor(id, email, senha, ativo = false, role = "user") {
      this.id = id;
      this.email = email;
      this.senha = senha;
      this.role = role; // user, manager, admin
      this.ativo = ativo;
    }
  }
  
  module.exports = Usuario;
  