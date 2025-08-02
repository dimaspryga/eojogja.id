import { NextResponse } from "next/server";
import bannersData from "@/lib/local_data/banners.json";

export async function GET() {
  try {
    return NextResponse.json(bannersData);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch banners" },
      { status: 500 }
    );
    return NextResponse.json({ message }, { status });
  }
}
