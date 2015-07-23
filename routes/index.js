var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

// Pag�na inicial
router.get('/', function (req, res) {
    res.render('index', { title: 'Quiz' });
});

//Ruta para Cr�ditos
router.get('/author', function (req, res) {
    res.render('author', { title: 'Quiz' });
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load);  // autoload :quizId

// Definici�n de rutas de /quizes
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);

module.exports = router;