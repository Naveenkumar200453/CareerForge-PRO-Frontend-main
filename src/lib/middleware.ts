import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"






export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  const { pathname } = req.nextUrl

  if (!pathname.startsWith("/admin")) return NextResponse.next()

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

 

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
    if (decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url))
    }
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL("/login", req.url))
  }
}

export const config = {
  matcher: ["/admin/:path*"],
}
