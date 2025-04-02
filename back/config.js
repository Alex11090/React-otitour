module.exports = {
    port: 5500,
    // // ----------основна база otitour---------------------
    // mongoKey: 'mongodb+srv://alex119dev:Alex,11090);@alltouts.c1spy4d.mongodb.net/?retryWrites=true&w=majority',
    // -------------------тестова база------------------------
    mongoKey: 'mongodb+srv://alex110dev:Aptem,11090);@cluster0.2xpsncj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    corsOptions: {
        // origin: 'http://s.otitour.com/',
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        optionsSuccessStatus: 200
    }
}