module.exports = {
    app: {
        prefix: '.',
        playing: 'Haiii'
    },
    opt: {
        DJ: {
            commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'seek', 'shuffle', 'skip', 'stop', 'volume']
        },
        maxVol: 200,
        loopMessage: false,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 50
            }
        }
    }
};
