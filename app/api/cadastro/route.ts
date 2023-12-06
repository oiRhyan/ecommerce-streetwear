import prisma from "@/app/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body;

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return NextResponse.error();
  }
}
