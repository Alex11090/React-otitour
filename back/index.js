const express = require('express');
const app = express();
const config = require('./config');
const http = require('http');
const server = http.createServer(app);
const mongoose = require('mongoose');
const parserTango = require('./parse');
const vidvParser = require('./vidvAPI');
const itravelParser = require('./parserItravel');
const adriaticParser = require('./parserAdriatic');
const adriaticNoNight = require('./parserAdriaticNoNight');
const adriaticNYearparser = require('./parserAdriaticNYear');
const bodyParser = require('body-parser');
const cors = require('cors');
// const CronJob = require('cron').CronJob;
const toursRouter = require('./Routes/tours');

mongoose.connect(config.mongoKey)
    .then(() => console.log('Connected to mongo successfully'))
    .catch(err => console.error(err))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(config.corsOptions))

app.use('/api/tours', toursRouter)
// parserTango();
// vidvParser();
// itravelParser();
// adriaticParser();
// adriaticNoNight();  
// adriaticNYearparser();
// ---------------------------------------------------------
// Создайю новую задачу cron для запуска парсера каждые 24 часа.
// const jobVidv = new CronJob('0 8,15 * * *', function () {
// Этот код будет выполняться каждый день в 00:00.
// vidvParser();
// }, null, true, 'Europe/Kiev');

// Запустите cron-задачу.
// jobVidv.start();
// --------------------------------------------------
// const jobTango = new CronJob('0 0 * * *', function () {
// Этот код будет выполняться каждый день в 00:00.
// parserTango();
// }, null, true, 'Europe/Kiev');

// Запустите cron-задачу.
// jobTango.start();
// ------------------------------------------------------
// const jobItravel = new CronJob('0 3 * * *', function () {
// Этот код будет выполняться каждый день в 00:00.
//     itravelParser();
// }, null, true, 'Europe/Kiev');

// Запустите cron-задачу.
// jobItravel.start();
// -------------------------------------------------------------------
const WebSocket = require('ws');
// Создание WebSocket-сервера
const wss = new WebSocket.Server({ server });
let onlineUsers = 0; // Счётчик активных пользователей

wss.on('connection', (ws) => {
    onlineUsers++; // Увеличиваем при подключении
    // console.log(`Новый пользователь подключился. Всего онлайн: ${onlineUsers}`);

    // Отправляем количество пользователей всем клиентам
    broadcastOnlineUsers();

    // Обработчик отключения
    ws.on('close', () => {
        onlineUsers--; // Уменьшаем при отключении
        // console.log(`Пользователь отключился. Всего онлайн: ${onlineUsers}`);
        broadcastOnlineUsers();
    });
});

// Функция для отправки данных всем подключённым клиентам
function broadcastOnlineUsers() {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ onlineUsers }));
        }
    });
}

server.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`)
})