import { NextResponse } from "next/server";

export function middleware(request) {
	// Set a new request header here
	const requestHeaders = new Headers(request.headers);

	const response = NextResponse.next({
		request: {
			// New request headers
			headers: requestHeaders,
		},
	});

	// Set a new response header here
	response.headers.set(
		"Cache-Control",
		`stale-while-revalidate=${process.env.INVALIDATE_CACHE_TIMEOUT ?? 0}`
	);

	return response;
}

export const config = {
	matcher: "/:path*",
};
