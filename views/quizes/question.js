<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"><title>Quiz</title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <h2>Quiz: el juego de las preguntas</h2>

    <form method="get" action="/quizes/answer">        
    Pregunta: <%= pregunta %> <p>
    <input type="text" name="respuesta" value="Responda aqu�"/>
    <input type="submit" value="Enviar">
  </form>
</body>
</html>