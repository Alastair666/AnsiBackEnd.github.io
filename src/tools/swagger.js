import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    definition:{
        openapi: '3.0.0',
        info: {
            title: 'Sistema de Gestión y Seguimiento Scouts (SIGESS)',
            version: '1.0.0',
            description: 'Asociación Nacional de Scouts Independientes (ANSI)',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT||8080}`,
            }
        ]
    },
    apis: ['./src/routes/*.router.js'] //Lee todas las rutas definidas
}
const swaggerDocs = swaggerJSDoc(swaggerOptions);

export function serve() { 
    return swaggerUi.serve
};
export function setup() { 
    return swaggerUi.setup(swaggerDocs)
};