const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
//rutas
const data = require('./db');
//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//configuraciones
app.set('port', process.env.PORT || 8000);

//servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor en el puerto ${app.get('port')}`);
})

//CRUD LIBROS

app.get("/books/", (req, res) => {
    res.json(data.libro)
})

app.get("/books/:id", (req, res) => {
    const id = req.params.id;
    const book = data.libro.find((book) => book.id === parseInt(id));
    if (!book) {
        return res.status(404).json({ message: "Libro no encontrado" });
    }
    res.json(book);
})


app.post("/books/", (req, res) => {
    const { id, libro, autor, fecha } = req.body;
    const existingBook = data.libro.find((book) => book.id === id || book.libro.toLowerCase() === libro.toLowerCase());
    if (existingBook) {
        return res.status(400).json({ message: "El libro ya existe." });
    }
    const newBook = { id, libro, autor, fecha };
    data.libro.push(newBook);
    res.status(201).json(newBook);
});

app.put("/books/:id", (req, res) => {
    const id = req.params.id;
    const { libro, autor, fecha } = req.body;
    const book = data.libro.find((book) => book.id === parseInt(id));
    if (!book) {
        return res.status(404).json({ message: "Libro no encontrado" });
    }
    book.libro = libro;
    book.autor = autor;
    book.fecha = fecha;
    res.json(book);
});

app.delete("/books/:id", (req, res) => {
    const id = req.params.id;
    const book = data.libro.find((book) => book.id === parseInt(id));
    if (!book) {
        return res.status(404).json({ message: "Libro no encontrado" });
    }
    const index = data.libro.indexOf(book);
    data.libro.splice(index, 1);
    res.json(book);
});