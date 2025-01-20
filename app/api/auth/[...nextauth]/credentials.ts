import { db } from "@/lib/db";
import bcrypt from "bcrypt";

const credentials = {
  email: { label: 'email', type: 'text' },
  password: { label: 'password', type: 'password' }
}

async function authorize(credentials: Record<"email" | "password", string> | undefined) {
  const error = Error('Invalid credentials');
  if (!credentials?.email || !credentials?.password) {
    throw error
  }

  const user = await db.user.findUnique({
    where: {
      email: credentials.email
    }
  });

  if (!user || !user?.password) {
    throw error
  }

  const isCorrectPassword = await bcrypt.compare(
    credentials.password,
    user.password
  );

  if (!isCorrectPassword) {
    throw error
  }

  return user;
}

export const credentialsOptions = {
  name: 'credentials',
  credentials,
  authorize,
}
