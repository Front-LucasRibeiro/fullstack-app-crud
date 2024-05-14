const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
   devServer: {
    host: '0.0.0.0', // Acesse de qualquer lugar
    port: 8080, // Porta mapeada no docker-compose
  },
}) 
