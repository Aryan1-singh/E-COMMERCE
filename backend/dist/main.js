"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn'],
    });
    app.enableCors({
        origin: ['http://localhost:3000'],
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
    });
    const port = process.env.PORT || 8000;
    await app.listen(port);
    console.log(`Backend runs on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map