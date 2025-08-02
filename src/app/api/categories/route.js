import { NextResponse } from "next/server";
import categoriesData from "@/lib/local_data/categories.json";

export async function GET() {
  try {
    return NextResponse.json(categoriesData);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch categories" },
      { status: 500 }
    );
    return NextResponse.json({ message }, { status });
  }
}
