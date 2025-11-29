import { NextRequest, NextResponse } from "next/server";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const bodyData = await req.json();
    const { name, email, password } = bodyData;
    if (!email || !name || !password) {
      return new NextResponse("Missing info", { status: 400 })
    }

    const existingUser = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists!" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const tokenData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    const token = jwt.sign(tokenData, process.env.NEXTAUTH_SECRET!, {
      expiresIn: "30 days",
    });

    const options = {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    };

    const response = NextResponse.json(
      {
        success: true,
        message: "Account created successfully",
      },
      { status: 200 }
    );
    response.cookies.set("token", token, options);

    return response;
  } catch (error) {
    console.log("Error signing up:", JSON.stringify(error));
    return NextResponse.json({ error: "Failed to sign up" }, { status: 500 });
  }
}
