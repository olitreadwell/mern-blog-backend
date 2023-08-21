import express from 'express';


const app = express();
app.use(express.json());

app.post('/hello', (req, res) => { 
    res.send(`POST Hello! ${req.body.name}`); 
});

app.get('/hello/:name', (req, res) => {
    const { name } = req.params;
    res.send(`GET Hello! ${name}`);
});

app.listen(8888, () => console.log('Server is listening on port http://localhost:8888...'));

