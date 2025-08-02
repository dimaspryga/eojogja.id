import { NextResponse } from "next/server";
import promosData from "@/lib/local_data/promos.json";

export async function GET(request, { params }) {
  const { id } = params;
  try {
    const promo = promosData.data.find((item) => item.id === parseInt(id));
    if (!promo) {
      return NextResponse.json(
        { message: `Promo with id ${id} not found` },
        { status: 404 }
      );
    }
    return NextResponse.json({ data: promo });
  } catch (error) {
    return NextResponse.json(
      { message: `Failed to fetch promo with id: ${id}` },
      { status: 500 }
    );
    return NextResponse.json({ message }, { status });
  }
}
