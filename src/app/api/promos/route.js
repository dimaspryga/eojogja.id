import { NextResponse } from "next/server";
import promosData from "@/lib/local_data/promos.json";

export async function GET() {
  try {
    return NextResponse.json(promosData);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch promos" },
      { status: 500 }
    );
    return NextResponse.json({ message }, { status });
  }
}
