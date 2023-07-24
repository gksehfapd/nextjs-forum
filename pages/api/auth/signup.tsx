import { connectDB } from '@/util/database'
import bcrypt from 'bcrypt'

export default async function handler(req: any, res: any) {
	if (req.method === 'POST') {
		if (req.body.name === '' || req.body.email === '' || req.body.password === '')
			return res.status(400).json('빈칸있다')
	}
	let db = (await connectDB).db('forum')
	let result = await db.collection('user_cred').findOne({ email: req.body.email })

	if (result == null) {
		let hash = await bcrypt.hash(req.body.password, 10)
		req.body.password = hash

		await db.collection('user_cred').insertOne(req.body)
		return res.status(200).json('가입성공')
	} else {
		return res.status(409).json('메일 중복')
	}
}
