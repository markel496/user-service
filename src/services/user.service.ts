import bcrypt from 'bcrypt'
import { User } from '../models/user.model'
import { ICreateUser, UserRole, IUser } from '../types/user'

export async function createUser(data: ICreateUser) {
  const hashed = await bcrypt.hash(data.password, 10)
  const user = new User({
    firstName: data.firstName,
    lastName: data.lastName,
    patronymic: data.patronymic,
    dob: new Date(data.dob),
    email: data.email,
    password: hashed,
    role: data.role ?? UserRole.USER
  })
  return user.save()
}

export async function findUserByEmail(email: string) {
  return User.findOne({ email })
}

export async function findUserById(id: string) {
  return User.findById(id)
}

export async function findAllUsers() {
  return User.find()
}

export async function validatePassword(user: IUser, plain: string) {
  return bcrypt.compare(plain, user.password)
}

export async function blockUser(id: string) {
  return User.findByIdAndUpdate(id, { isActive: false }, { new: true })
}
