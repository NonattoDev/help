// app/api/cron/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  console.log("rodou o CRON");
  const result = await fetch("http://worldtimeapi.org/api/timezone/America/Chicago", {
    cache: "no-store",
  });
  const data = await result.json();

  console.log(data);

  return NextResponse.json({ datetime: data.datetime });
}