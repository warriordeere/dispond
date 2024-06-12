import fs from 'fs'
import path from "path";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const ddir = path.join(process.cwd(), 'src-tauri/data/missions');
        const params = req.nextUrl.searchParams;
        const fl = params.get('file') as string;
        const flep = path.join(ddir, fl);
        const cnt = fs.readFileSync(flep, 'utf-8');

        return new NextResponse(cnt);
    } catch (err: any) {
        return new NextResponse(err);
    }
}