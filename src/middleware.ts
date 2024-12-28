import {NextResponse} from "next/server"
import type { NextRequest } from "next/server"


export function middleware(request: NextRequest) {
    const path = request.headers.get("function");
    return NextResponse.json({message: `Hello from ${path}`})
}

export const config = {
    matcher: '/about'
}
