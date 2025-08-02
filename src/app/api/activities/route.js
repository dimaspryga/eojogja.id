import { NextResponse } from "next/server";
import activitiesData from "@/lib/local_data/activities.json";

export async function GET() {
  try {
    return NextResponse.json(activitiesData);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch activities" },
      { status: 500 }
    );
    return NextResponse.json({ message }, { status });
  }
}
