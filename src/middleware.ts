import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

export const middleware = async (req: NextRequest) => {
  if (req.cookies.get('user-token')) return;

  const random = nanoid();

  // Redirect (to apply cookie)
  const res = NextResponse.redirect(req.nextUrl);
  res.cookies.set('user-token', random, { sameSite: 'strict', expires: new Date('2038-01-19 04:14:07') });
  return res;
};

export const config = {
  matcher: '/'
};
