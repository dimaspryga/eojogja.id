import { NextResponse } from "next/server";
import activitiesData from "@/lib/local_data/activities.json";

export async function GET(request, { params }) {
  const { id } = params;
  try {
    const activity = activitiesData.data.find(
      (item) => item.id === parseInt(id)
    );
    if (!activity) {
      return NextResponse.json(
        { message: `Activity with id ${id} not found` },
        { status: 404 }
      );
    }
    return NextResponse.json({ data: activity });
  } catch (error) {
    return NextResponse.json(
      { message: `Failed to fetch activity with id: ${id}` },
      { status: 500 }
    );
    return NextResponse.json({ message }, { status });
  }
}
