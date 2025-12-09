import lessons_platform from "../models/lessons_platform.js";

const lessons = [
	{
		name: "Introduction to JavaScript",
		description:
			"Learn the basics of JavaScript, the programming language of the web.",
		video_url: "https://www.youtube.com/watch?v=GTUxhtXhZiw",
	},
	{
		name: "Advanced CSS Techniques",
		description: "Explore advanced CSS techniques for modern web design.",
		video_url: "https://www.youtube.com/watch?v=ZNVOXG6b7wc",
	},
	{
		name: "Building RESTful APIs with Node.js",
		description: "Create scalable RESTful APIs using Node.js and Express.",
		video_url: "https://www.youtube.com/watch?v=YPNtouPtkJYs",
	},
];

for (let lesson of lessons) {
	const errors = lessons_platform.validateLesson(lesson);
	if (errors.length === 0) {
		lessons_platform.addLesson(lesson);
	} else {
		console.error(`Failed to add lesson "${lesson.name}":`, errors);
	}
}
