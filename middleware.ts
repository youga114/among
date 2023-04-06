import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: "/",
};

export function middleware(req: NextRequest) {
    console.log(req.cookies);
    const access_token = req.cookies.get("access_token")?.value || "";
    if (!access_token) return NextResponse.next();

    const response = NextResponse.next();
    response.cookies.set("access_token", access_token);
    return response;
}
