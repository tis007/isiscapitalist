import {Injectable, Logger} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import {World} from "./graphql";
import {origworld} from "./origworld";
import {AppController} from "./app.controller";

@Injectable()
export class AppService {
    private readonly logger = new Logger(AppController.name);

    readUserWorld(user: string): World {
        try {
            const data = fs.readFileSync(
                path.join(process.cwd(), 'userworlds/', user + '-world.json'),
            );
            return JSON.parse(data.toString());
        } catch (e: unknown) {
            console.log((e as Error).message);
            return <World>origworld;
        }
    }


     saveWorld(user: string, world: World) {
        fs.writeFile(
            path.join(process.cwd(), 'userworlds/', user + '-world.json'),
            JSON.stringify(world),
            (err) => {
                if (err) {
                    console.error(err);
                    throw new Error(`Erreur d'écriture du monde coté serveur`);
                }
            },
        );
    }
}