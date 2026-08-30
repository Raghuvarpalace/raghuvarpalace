import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminSupabase } from "@/lib/admin-api-helpers";
import type { Attraction } from "@/lib/types";

function revalidateAttractionPages() {
  revalidatePath("/");
  revalidatePath("/location");
}

export async function GET() {
  const { supabase, errorResponse } = requireAdminSupabase();
  if (!supabase) return errorResponse;

  const { data, error } = await supabase
    .from("attractions")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ items: data as Attraction[] });
}

export async function POST(request: Request) {
  const { supabase, errorResponse } = requireAdminSupabase();
  if (!supabase) return errorResponse;

  let body: Partial<Attraction>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = String(body.name || "").trim();
  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("attractions")
    .insert({
      name,
      description: String(body.description || ""),
      image_url: body.image_url ? String(body.image_url) : null,
      sort_order: Number(body.sort_order) || 0,
      is_active: body.is_active ?? true,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidateAttractionPages();
  return NextResponse.json({ item: data as Attraction }, { status: 201 });
}

