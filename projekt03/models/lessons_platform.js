import { DatabaseSync } from "node:sqlite";

const db_path = "./db.sqlite";
const db = new DatabaseSync(db_path);

db.exec(
	`CREATE TABLE IF NOT EXISTS lessons (
    id   INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    video_url TEXT NOT NULL
  );`
);

export function getLessons() {
	const stmt = db.prepare("SELECT id, name FROM lessons;");
	return stmt.all();
}

export function addLesson(lesson) {
	const stmt = db.prepare(`
		INSERT INTO lessons (name, description, video_url)
		VALUES (?, ?, ?)
		RETURNING name, description, video_url;
	`);
	return stmt.get(lesson.name, lesson.description, lesson.video_url);
}

export function updateLesson(id, lesson) {
	const stmt = db.prepare(`
    UPDATE lessons SET name = ?, description = ?, video_url = ?
    WHERE id = ?
    RETURNING id, name, description, video_url;
  `);
	return stmt.get(lesson.name, lesson.description, lesson.video_url, id);
}

export function deleteLesson(id) {
	const stmt = db.prepare(`
    DELETE FROM lessons
    WHERE id = ?;
  `);
	return stmt.run(id);
}

export function getLesson(id) {
	const stmt = db.prepare(`
		SELECT id, name, description, video_url FROM lessons
    WHERE id = ?;
	`);
	return stmt.get(id);
}

export function validateLesson(lesson) {
	var errors = [];
	var fields = ["name", "description", "video_url"];
	for (let field of fields) {
		if (!lesson.hasOwnProperty(field))
			errors.push(`Missing field '${field}'`);
		else {
			if (typeof lesson[field] != "string")
				errors.push(`'${field}' expected to be string`);
			else {
				if (lesson[field].length < 1 || lesson[field].length > 500)
					errors.push(`'${field}' expected length: 1-500`);
			}
		}
	}
	return errors;
}

export default {
	getLessons,
	addLesson,
	updateLesson,
	deleteLesson,
	getLesson,
	validateLesson,
};
