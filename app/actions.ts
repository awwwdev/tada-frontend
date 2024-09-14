'use server'
 
import { cookies } from 'next/headers'
 
export async function setThemeCookie({theme}) {
cookies().set('theme', theme);

const th = cookies().get('theme');
  console.log("🚀 ~ th:", th);
  // or
}