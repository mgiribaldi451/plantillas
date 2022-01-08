const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bp = require('body-parser')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

/* --------------------------HBS---------------------------- */
app.set('views', './views');
app.set('view engine', 'hbs');
//establecemos la configuración de handlebars
app.engine(
    'hbs', handlebars.engine({
        extname: ".hbs",
        defaultLayout: 'index.hbs'
    })
);


let productos = [

    {
        "id": 1,
        "Nombre": "inter",
        "Url": "https://i.ibb.co/dgjzjvK/images-q-tbn-ANd9-Gc-TUtrjy-hxo-S7itymm994-PWb1-o-SLUZMo38-Fg-usqp-CAU.jpg",
        "Precio": 2000
    },
    {
        "id": 2,
        "Nombre": "defensa y justicia",
        "Url": "https://i.ibb.co/WBzHNLv/images-q-tbn-ANd9-Gc-Rxu-I5t-AXdtt-Izamd-RH9-AMzkt-WTbk-Opk-TRk-Jg-usqp-CAU.jpg",
        "Precio": 1500

    },
    {
        "id": 3,
        "Nombre": "atletico madrid",
        "Url": "https://i.ibb.co/Z2zDQ6y/images-q-tbn-ANd9-Gc-Re-FPQu-FEjev-D6-YS2-NTIug-Fx-X-fsjkr-Jucp-BQ-usqp-CAU.jpg",
        "Precio": 2500
    }
]
/* --------------------------HBS---------------------------- */
app.get("/productos", (req, res) => {
    res.render("datos", { productos: productos, listExists: true });
});


const nom = null;
app.get('/', (req, res) => {
    res.render("form")
})

app.post('/productos', (req, res) => {

    const valor = Math.max(...productos.map(o => o.id), 0);
    console.log(req.body);
    req.body.id = valor + 1
    productos = [...productos, req.body]
    res.render("datos", { productos: productos, listExists: true });
})

/* ----------------------EJS-------------------------------- */

/*app.set('view engine', 'ejs');
app.get('/ejs', (req, res) => {
    res.render("pages/indexEjs")
})

app.post('/productosejs', (req, res) => {
    
    const valor = Math.max(...productos.map(o => o.id), 0);
    console.log(req.body);
    req.body.id = valor + 1
    productos = [...productos, req.body]
    console.log(productos);
    res.redirect('/productosejs');
})

app.get('/productosejs',(req,res)=>{
    console.log(productos);
    res.render("pages/datosEjs", {productos});

})*/

/* ----------------------PUG-------------------------------- */

/*app.set('view engine', 'pug');
app.get('/pug', (req, res) => {
    res.render('index.pug')
})

app.post('/productospug', (req, res) => {
    
    const valor = Math.max(...productos.map(o => o.id), 0);
    console.log(req.body);
    req.body.id = valor + 1
    productos = [...productos, req.body]
    console.log(productos);
    //res.redirect('/productospug');
})

app.get('/productospug',(req,res)=>{
    console.log(productos);
    res.render("datosPug.pug", {productos});

})*/



/* Server Listen */
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))