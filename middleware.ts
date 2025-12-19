import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {

    // Handle /app-logger route with no search params
    if (request.nextUrl.pathname === '/app-logger' && request.nextUrl.search === '') {
        const today = new Date();
        const day = today.getDate().toString();
        const date = today.toLocaleDateString("en-CA");

        const url = request.nextUrl.clone();
        url.searchParams.set('pageNumber', '1');
        url.searchParams.set('pageSize', '100');
        url.searchParams.set('logDay', day);
        url.searchParams.set('startDateTime', date);
        url.searchParams.set('orderDescending', 'true');

        return NextResponse.redirect(url);
    }
    return NextResponse.next();
}

export const config = {
    matcher: '/app-logger',
};
