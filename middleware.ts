import { NextResponse } from 'next/server'

export function middleware(req) {
	if (req.nextUrl.pathname === '/list') {
		console.log(new Date())
		console.log(req.headers.get('sec-ch-ua-platform'))
		return NextResponse.next()
	}
}
