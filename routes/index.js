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

// Definici�n de rutas de /quizes
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

module.exports = router;