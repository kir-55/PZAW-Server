import express from "express";
import morgan from "morgan";
import lessons_platform from "./models/lessons_platform.js";

const port = 8000;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded());
app.use(morgan("dev"));

app.get("/lessons", (req, res) => {
	res.render("lessons", {
		lessons: lessons_platform.getLessons(),
	});
});

app.get("/lesson/:lesson_id", (req, res) => {
	const lesson = lessons_platform.getLesson(req.params.lesson_id);
	if (lesson != null) {
		res.render("lesson", {
			errors: [],
			lesson,
		});
	} else {
		res.sendStatus(404);
	}
});

app.post("/lesson/edit/:lesson_id", (req, res) => {
	const lesson = lessons_platform.getLesson(req.params.lesson_id);
	if (lesson != null) {
		let lesson_data = {
			name: req.body.name,
			description: req.body.description,
			video_url: req.body.video_url,
		};

		var errors = lessons_platform.validateLesson(lesson_data);
		if (errors.length == 0) {
			lessons_platform.updateLesson(req.params.lesson_id, lesson_data);
			res.redirect(`/lesson/${req.params.lesson_id}`);
		} else {
			res.status(400);
			res.render("lesson", {
				errors,
				lesson: { id: req.params.lesson_id, ...lesson_data },
			});
		}
	} else {
		res.sendStatus(404);
	}
});

app.post("/lesson/delete/:lesson_id", (req, res) => {
	const lesson = lessons_platform.getLesson(req.params.lesson_id);
	if (lesson != null) {
		lessons_platform.deleteLesson(req.params.lesson_id);
		res.redirect("/lessons");
	} else {
		res.sendStatus(404);
	}
});

app.get("/new-lesson", (req, res) => {
	res.render("new_lesson");
});

app.post("/new-lesson", (req, res) => {
	let lesson_data = {
		name: req.body.name,
		description: req.body.description,
		video_url: req.body.video_url,
	};
	var errors = lessons_platform.validateLesson(lesson_data);
	if (errors.length == 0) {
		lessons_platform.addLesson(lesson_data);
		res.redirect(`/lessons/`);
	} else {
		res.status(400);
		res.render("new_lesson", {
			errors,
			name: req.body.name,
			description: req.body.description,
			video_url: req.body.video_url,
		});
	}
});

app.listen(port, () => {
	console.log(`Server listening on http://localhost:${port}`);
});
