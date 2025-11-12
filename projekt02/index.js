import express from "express";
import morgan from "morgan";
import flashcards from "./models/lessons_platform.js";

const port = 8000;



const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded());
app.use(morgan("dev"));


function log_request(req, res, next) {
  console.log(`Request ${req.method} ${req.path}`);
  next();
}
app.use(log_request);


app.get("/lessons", (req, res) => {
  res.render("lessons", {
    lessons: flashcards.getLessons(),
  });
});

app.get("/lesson/:lesson_id", (req, res) => {
  const lesson = flashcards.getLesson(req.params.lesson_id);
  if (lesson != null) {
    res.render("lesson", {
      lesson
    });
  } else {
    res.sendStatus(404);
  }
});

app.get("/lesson", (req, res) => {
  const lesson = flashcards.getLesson(req.params.lesson_id);
  if (lesson != null) {
    res.render("lesson", {
      lesson
    });
  } else {
    res.sendStatus(404);
  }
});


app.get("/new-lesson", (req, res) => {
    res.render("new_lesson", )
});


app.post("/new-lesson", (req, res) => {

    let lesson_data = {
      name: req.body.name,
      description: req.body.description,
      video_url: req.body.video_url
    };
    var errors = flashcards.validateLesson(lesson_data);
    if (errors.length == 0) {
      flashcards.addLesson(lesson_data);
      res.redirect(`/lessons/`);
    } else {
      res.status(400);
      res.render("new_lesson", {
        errors,
        name: req.body.name,
        description: req.body.description,
        video_url:  req.body.video_url
      });
    }

});



app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

