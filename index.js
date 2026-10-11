const bedrock = require('bedrock-protocol');

function startBot() {
    console.log('--- Попытка подключения AFK-бота к Aternos... ---');
    
    const bot = bedrock.createClient({
        host: 'artratsmp.aternos.me', 
        port: 60321, 
        username: 'Art_Bot_247',
        version: '1.26.30',
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
