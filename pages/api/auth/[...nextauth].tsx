import { connectDB } from '@/util/database'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const authOptions = {
	providers: [
		GithubProvider({
			clientId: '007c24982ddb1a720d3c',
			clientSecret: '0ef86ac8d2f12265583a7d998e7ca8e409bb413c'
		})
	],
	secret: 'dkssudgktpdygksehdauddlqslek.',
	adapter: MongoDBAdapter(connectDB)
}
export default NextAuth(authOptions)
