import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parseSetCookie } from "cookie";
import { checkSession } from "./lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isPrivateRoute = privateRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  if (!accessToken) {
    if (refreshToken) {
      try {
        const data = await checkSession();
        const setCookie = data.headers["set-cookie"];

        if (setCookie) {
          const cookieArray = Array.isArray(setCookie)
            ? setCookie
            : [setCookie];

          const response = isPublicRoute
            ? NextResponse.redirect(new URL("/", request.url))
            : NextResponse.next();

          for (const cookieStr of cookieArray) {
            const parsed = parseSetCookie(cookieStr);

            if (parsed && parsed.value !== undefined) {
              response.cookies.set(parsed.name, parsed.value, {
                httpOnly: parsed.httpOnly,
                secure: parsed.secure,
                path: parsed.path,
                domain: parsed.domain,
                expires: parsed.expires,
                sameSite:
                  parsed.sameSite === true
                    ? "strict"
                    : parsed.sameSite === false
                      ? undefined
                      : parsed.sameSite,
              });
            }
          }

          return response;
        }
      } catch {
        // Сесію не вдалося оновити.
      }
    }

    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
  }

  if (isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
