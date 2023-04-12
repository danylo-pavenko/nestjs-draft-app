import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function main() {
    const PORT = process.env.PORT || 5001;

    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('NestJS Dans App')
        .setDescription('This app for setup NestJS example for work work MVC and JS backend.')
        .setVersion('1.0.0')
        .addBearerAuth({
            type: "http",
            scheme: "bearer",
            bearerFormat: "jwt",
            name: "JWT",
            description: "Enter token from login method",
            in: "header"
        }, "User-auth-token")
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

main()
