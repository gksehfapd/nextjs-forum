import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import LoginBtn from './loginBtn'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import LogOutBtn from './logoutBtn'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	let session = await getServerSession(authOptions)

	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="navbar">
					<Link href="/" className="logo">
						Appleforum
					</Link>
					<Link href="/list">List</Link>
					<Link href="/write">Write</Link>
					{session ? (
						<span>
							{session.user?.name} <LogOutBtn />{' '}
						</span>
					) : (
						<LoginBtn></LoginBtn>
					)}
				</div>
				{children}
			</body>
		</html>
	)
}
