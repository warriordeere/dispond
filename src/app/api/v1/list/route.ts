import { NextRequest } from "next/server";

import * as fs from "node:fs";
import * as path from "node:path";

export const dynamic = 'force-static'

export async function GET(req: NextRequest) {

    const base_dir = req.nextUrl.searchParams.get('dir');
    const file_type = req.nextUrl.searchParams.get('type');

    if (!base_dir || !file_type) {
        return Response.json(
            { message: `[Error] 400 Unexpected Parameter Value. Valid Parameters are: 'dir': '${base_dir}' or 'type': '${file_type}'` },
            { status: 400 }
        );
    }

    const bdir = path.resolve('./src-tauri/data');
    const dir = path.resolve(bdir, base_dir);

    if (!dir.startsWith(bdir)) {
        return Response.json(
            { message: `[Error] 403 Access Denied` },
            { status: 403 }
        );
    }

    const buf: String[] = new Array();

    if (!fs.existsSync(dir)) {
        return Response.json(
            { message: `[Error] 404 Path Not Found. Requested Path: ${dir}` },
            { status: 404 }
        );
    }

    fs.readdir(dir, { recursive: true, withFileTypes: true }, (e, files) => {
        if (e) {
            return Response.json(
                { message: `[Error] 500 Internal Server Error. Error: ${e}` },
                { status: 500 }
            );
        }

        return files.forEach((r) => {
            const pth = `${r.path}/${r.name}`;
            const pth_nrm = path.normalize(pth);
            if (pth_nrm.endsWith(`.${file_type}`)) {
                buf.push(pth_nrm);
            }
        });
    });

    if (!buf.length) {
        return Response.json(
            { message: `[Error] 404 No Files With Given Parameters Found. Parameters: dir: '${base_dir}'; type: '${file_type}'` },
            { status: 404 }
        );
    }

    return Response.json(buf);
}