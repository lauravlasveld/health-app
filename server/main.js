console.log("Server is running");

// Importa el módulo Express
import express from 'express';
import cors from "cors";

const students = ["Alicia", "Anouk", "Edward"];
const song = ["Get me started"];

// Crea una instancia de Express
const app = express();

app.use(cors());
app.use(express.json());

// GET:/api/students
app.get("/api/students", (req, res) => {
    res.json(students);
});

// POST:/api/students
app.post("/api/students", (req, res) => {
    // Agrega el nombre del estudiante a los datos
    students.push(req.body.name);

    // Retorna la nueva colección
    res.json(students);
});

// Escucha en el puerto 3000
app.listen(3000, () => {
    console.log('Server is running on localhost 3000');
});
