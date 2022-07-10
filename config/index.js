module.exports = {
    port: 3000,
    db: {
        port: 27017,
        host: 'localhost',
        dbName:'dbblog'
    },
    security: {
        secretKey: 'this is my secret',
        expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) * 4,
    }
}