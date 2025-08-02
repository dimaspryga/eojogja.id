import { NextResponse } from "next/server";
import categoriesData from "@/lib/local_data/categories.json";

export async function GET(request, { params }) {
  const { id } = params;
  try {
    const category = categoriesData.data.find(
      (item) => item.id === parseInt(id)
    );
    if (!category) {
      return NextResponse.json(
        { message: `Category with id ${id} not found` },
        { status: 404 }
      );
    }
    return NextResponse.json({ data: category });
  } catch (error) {
    return NextResponse.json(
      { message: `Failed to fetch category with id: ${id}` },
      { status: 500 }
    );
    return NextResponse.json({ message }, { status });
  }
}
