class SessionController {

  index(req, res) {
    
    res.render('pages/login', { erro: '' });
  
  }

  logar(req, res) {

    let users = [
      { email: 'teste1@gmail.com', senha: 'aeiou' },
      { email: 'teste2@gmail.com', senha: 'abcde' },
    ];

    const { email, senha } = req.body;

    const user = users.find((user) => user.email === email && user.senha === senha);

    if (!user) {
      
      return res.render('pages/login', { erro: 'Credenciais inválidas' });
    
    }

    return res.redirect('/home');
  }

  logout(req, res) {

    return res.redirect('/login');
  
  }

}

module.exports = new SessionController();