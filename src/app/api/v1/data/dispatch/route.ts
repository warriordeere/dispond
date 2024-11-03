import { DispatchFileObject } from "@/app/shared/types/dispatches.types";
import { NextRequest, NextResponse } from "next/server";

import * as fs from "node:fs";
import * as path from "node:path";

export const dynamic = 'force-static'

export function GET(req: NextRequest) {
    const prms = req.nextUrl.searchParams.get('id');

    if (!prms) {
        return NextResponse.json({ message: '400 Bad Request', status: 400 });
    }

    const idSubStr = prms.split(' ');
    const idAry = idSubStr.map(str => `${str}.json`);

    const tmpBuf: string[] = new Array();

    idAry.forEach((id) => {
        const rgx = new RegExp(`\\\\${id}$`);
        const list = fetchList();
        const rslt = list.find((d => rgx.test(d)));

        if (!rslt) {
            return;
        }

        tmpBuf.push(rslt);
    });

    const buf: DispatchFileObject[] = new Array();

    tmpBuf.forEach((p) => {
        if (!fs.existsSync(p)) {
            return;
        }

        const dispatch: DispatchFileObject = JSON.parse(fs.readFileSync(path.resolve(p), 'utf8'));

        buf.push(dispatch);
    });

    if (!buf.length) {
        return NextResponse.json({ message: '404 Data Not Found', status: 404 });
    }

    return NextResponse.json(buf);
}

function fetchList(): string[] {
    const dir = path.resolve('./src-tauri/data/missions');
    const buf: string[] = new Array();

    fs.readdir(dir, { recursive: true, withFileTypes: true }, (e, files) => {
        if (e) {
            return;
        }

        return files.forEach((r) => {
            const pth = `${r.path}/${r.name}`;
            const pth_nrm = path.normalize(pth);

            if (pth_nrm.endsWith('.json')) {
                return buf.push(pth_nrm);
            }
        });
    });

    return buf;
}