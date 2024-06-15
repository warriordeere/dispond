import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const genNewMission = (): string => {
            return "Test"
        }

        const cnt = genNewMission();

        return new NextResponse(cnt);
    } catch (err: any) {
        return new NextResponse(err);
    }
}