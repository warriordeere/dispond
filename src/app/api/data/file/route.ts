import fs, { readFileSync } from 'fs'
import path from "path";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {

        const fp = req.nextUrl.searchParams.get('path');

        if (typeof fp !== 'string') {
            return NextResponse.json(
                { message: "[Error] 400 Invalid File Path" },
                { status: 400 }
            );
        }

        const bdir = path.resolve('./src-tauri/data');
        const abspath = path.resolve(bdir, fp);

        if (!abspath.startsWith(bdir)) {
            return NextResponse.json(
                { message: "[Error] 403 Access Denied" },
                { status: 403 }
            );
        }

        console.log(abspath);

        if (!fs.existsSync(abspath)) {
            return NextResponse.json(
                { message: "[Error] 404 File Not Found" },
                { status: 404 }
            );
        }

        const cnt = readFileSync(abspath, 'utf-8');

        return new NextResponse(cnt)
    } catch (err: any) {
        return new NextResponse(err);
    }
}