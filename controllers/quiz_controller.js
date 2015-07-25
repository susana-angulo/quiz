var models = require('../models/models.js');

// Autoload :id
exports.load = function (req, res, next, quizId) {
    models.Quiz.find(quizId).then(
      function (quiz) {
          if (quiz) {
              req.quiz = quiz;
              next();
          } else { next(new Error('No existe quizId=' + quizId)) }
      }
    ).catch(function (error) { next(error) });
};

// GET /quizes
exports.index = function (req, res) {
    models.Quiz.findAll().then(
      function (quizes) {
          res.render('quizes/index.ejs', { quizes: quizes, errors: [] });
      }
    ).catch(function (error) { next(error) });
};

// GET /quizes/:id
exports.show = function (req, res) {
    res.render('quizes/show', { quiz: req.quiz, errors: [] });
};

// GET /quizes/:id/answer
exports.answer = function (req, res) {
    var resultado = 'Incorrecto';
    if (req.query.respuesta === req.quiz.respuesta) {
        resultado = 'Correcto';
    }
    res.render(
      'quizes/answer',
      {
          quiz: req.quiz,
          respuesta: resultado,
          errors: []
      }
    );
};

// GET /quizes/new
exports.new = function (req, res) {
    var quiz = models.Quiz.build( // crea objeto quiz
      { pregunta: "Pregunta", respuesta: "Respuesta", tema: "otro" }
    );

    res.render('quizes/new', { quiz: quiz, errors: [] });
};

// POST /quizes/create
exports.create = function (req, res) {
    var quiz = models.Quiz.build(req.body.quiz);

    //No funciona porque el m�todo validate()  no tiene .then
    //quiz.validate().then(
    //  function(err){
    //    if (err) {
    //      res.render('quizes/new', {quiz: quiz, errors: err.errors});
    //    } else {
    //      quiz // save: guarda en DB campos pregunta y respuesta de quiz
    //      .save({fields: ["pregunta", "respuesta"]})
    //      .then( function(){ res.redirect('/quizes')})
    //    }      // res.redirect: Redirecci�n HTTP a lista de preguntas
    //  }
    //);

    var errors = quiz.validate();
    if (errors) {
        //Creamos un array con la con la propiedad message por compatibilida con layout
        var i = 0;
        var errores = new Array();
        for (var prop in errors) {
            errores[i++] = { message: errors[prop] };
        }
        res.render('quizes/new', { quiz: quiz, errors: errores });
    }
    else {
        // save: guarda en DB campos pregunta y respuesta de quiz
        quiz
        .save({ fields: ["pregunta", "respuesta", "tema"] })
        .then(function () { res.redirect('/quizes') });
    }
};
// GET /quizes/:id/edit
exports.edit = function (req, res) {
    var quiz = req.quiz;  // req.quiz: autoload de instancia de quiz

    res.render('quizes/edit', { quiz: quiz, errors: [] });
};

// PUT /quizes/:id
exports.update = function (req, res) {
    req.quiz.pregunta = req.body.quiz.pregunta;
    req.quiz.respuesta = req.body.quiz.respuesta;
    req.quiz.tema = req.body.quiz.tema;

    //req.quiz
    //.validate()
    //.then(
    //  function(err){
    //    if (err) {
    //      res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
    //    } else {
    //      req.quiz     // save: guarda campos pregunta y respuesta en DB
    //      .save( {fields: ["pregunta", "respuesta"]})
    //      .then( function(){ res.redirect('/quizes');});
    //    }     // Redirecci�n HTTP a lista de preguntas (URL relativo)
    //  }
    //);

    var errors = req.quiz.validate();
    if (errors) {
        //Creamos un array con la con la propiedad message por compatibilida con layout
        var i = 0;
        var errores = new Array();
        for (var prop in errors) {
            errores[i++] = { message: errors[prop] };
        }

        req.errors = errores;
        res.render('quizes/edit', { quiz: req.quiz, errors: req.errors });
    }
    else {
        // save: guarda en DB campos pregunta y respuesta de quiz
        req.quiz
        .save({ fields: ["pregunta", "respuesta", "tema"] })
        .then(function () { res.redirect('/quizes') });
    }
};

// DELETE /quizes/:id
exports.destroy = function (req, res) {
    req.quiz.destroy().then(function () {
        res.redirect('/quizes');
    }).catch(function (error) { next(error) });
};