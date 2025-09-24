import { readdirSync } from "node:fs";
import path from "node:path";

const projectRoot = path.join(process.cwd(), "static");


export function handlePath(pathParam, req, res) {
    const getDirectories = (source) =>
        readdirSync(source, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name)
            .join("\n"); // Join directory names as a newline-separated string

    try {
        const directories = getDirectories(projectRoot); // Call getDirectories with the pathParam

        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(directories); // Send directories as plain text
    } catch (error) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error reading directories or path not found.");
    }
}
