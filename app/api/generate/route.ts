import { redisClient as client } from "@/utils/redis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { link } = await req.json();

  if (!link) {
    return NextResponse.json(
      {
        message: "Please provide a URL",
      },
      {
        status: 400,
      }
    );
  }

  const key = generateKey();

  await client.set(key, link);

  const newLink = `${process.env.PUBLIC_DOMAIN ?? "localhost:3000"}/${key}`;

  return NextResponse.json(
    {
      link: newLink,
    },
    {
      status: 200,
    }
  );
}

function generateKey(length: number = 5) {
  let key = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i <= length; i++) {
    key += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return key;
}
