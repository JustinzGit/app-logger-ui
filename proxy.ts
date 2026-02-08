import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
    const { pathname, search } = request.nextUrl;

    if (pathname === '/' || (pathname === '/app-logger' && search === '')) {
        const today = new Date();
        const day = today.getDate().toString();
        const date = today.toLocaleDateString("en-CA");

        const url = request.nextUrl.clone();
        url.pathname = '/app-logger'; 
        url.searchParams.set('sortAscending', 'true');
        url.searchParams.set('startDateTime', date);
        url.searchParams.set('logDay', day);
        url.searchParams.set('limit', '50');

        return NextResponse.redirect(url);
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/app-logger'],
};