import { generateMissionData } from "@/app/script/gen/mission";
import { NextRequest, NextResponse } from "next/server";
import { DEBUG_ONLY_fc } from "../../../tests";

export async function GET(req: NextRequest) {
    try {
        const d = await generateMissionData(DEBUG_ONLY_fc).catch((e) => {
            console.log(e);
        })

        console.log(d);

        return new NextResponse("[DEBUG] Placeholder Data");
    } catch (err: any) {
        return new NextResponse(err);
    }
}