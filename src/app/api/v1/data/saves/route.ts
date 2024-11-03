import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os"
import { NextRequest, NextResponse } from "next/server";
import { savegameInterface } from "@/app/shared/types/savegame.types";
import { ApiDataSavesFilter } from "@/app/shared/types/api.types";

export const dynamic = 'force-static'

export async function GET(req: NextRequest) {

    const paramStr = req.nextUrl.searchParams.get('filter');

    const docDir = path.join(os.homedir(), "documents");
    const savedGamesFile = path.join(docDir, 'Arcavigi Interactive', 'dispond', 'saves', 'saves.json');

    if (!fs.existsSync(savedGamesFile)) {
        return Response.json({ message: '[ERROR] module:setup.ts - File Not Found', status: 404 });
    }

    const savesObject = JSON.parse(fs.readFileSync(savedGamesFile, 'utf8')) as unknown as savegameInterface;

    if (!paramStr) {
        return Response.json(savesObject);
    }

    const paramAry = paramStr.split(' ');
    const buf = new Array();

    paramAry.forEach((d) => {
        switch (d.toString()) {
            case ApiDataSavesFilter.API_SAVES_FILTER_CREATED:
                return buf.push(savesObject.created);

            case ApiDataSavesFilter.API_SAVES_FILTER_MODIFED:
                return buf.push(savesObject.modified);

            case ApiDataSavesFilter.API_SAVES_FILTER_NAME:
                return buf.push(savesObject.game.name);

            case ApiDataSavesFilter.API_SAVES_FILTER_SPAWNPOINT:
                return buf.push(savesObject.game.spawn);

            default:
                return Response.json({ message: '[ERROR] module:setup.ts - Unexpected Filter Value', status: 400 });
        }
    });

    if (!buf.length) {
        return Response.json({ message: '[ERROR] module:setup.ts - Internal Server Error', status: 500 });
    }

    return Response.json(buf);
}