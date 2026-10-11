const bedrock = require('bedrock-protocol');
const http = require('http');

// Заглушка сайта для Render
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot Active\n');
}).listen(process.env.PORT || 10000);

function startBot() {
    console.log('--- Попытка подключения AFK-бота к Aternos... ---');
    
    const bot = bedrock.createClient({
        host: 'artratsmp.aternos.me', 
        port: 60321, 
        username: 'Art_Bot_247',
        version: '1.26.30',
        skipPing: true, // Пропускаем проверку пинга для обхода тайм-аута
        offline: true
    });

    bot.on('spawn', () => {
        console.log('Успех! Бот успешно зашел на server!');
        setInterval(() => {
            bot.queue('text', {
                type: 'chat', needs_translation: false, source_name: '', xuid: '', platform_chat_id: '',
                message: 'Anti-AFK Action'
            });
        }, 45000);
    });

    bot.on('error', (err) => {
        console.log('Ошибка:', err.message);
    });

    bot.on('close', () => {
        console.log('Переподключение через 15 секунд...');
        setTimeout(startBot, 15000);
    });
}

startBot();
