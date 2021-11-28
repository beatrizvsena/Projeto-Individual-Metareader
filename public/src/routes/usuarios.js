var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function(req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function(req, res) {
    usuarioController.listar(req, res);
});

router.post("/cadastrar", function(req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function(req, res) {
    usuarioController.entrar(req, res);
});
  
router.post("/analisar" , function(req, res) {
    usuarioController.analisar(req, res);
});

router.get("/resultado" , function(req, res) {
    usuarioController.resultado(req, res);
});


module.exports = router;

