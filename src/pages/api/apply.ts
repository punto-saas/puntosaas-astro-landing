import type { APIRoute } from "astro";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export const POST: APIRoute = async ({ request }) => {
  console.log("API apply.ts called");
  try {
    const data = await request.json();
    // Map frontend keys to DB columns
    const insertData = {
      startup_name: data.startupName,
      website_or_deck: data.websiteOrDeck,
      problem_solution: data.problemSolution,
      icp_sector: data.icpSector,
      icp_role: data.icpRole,
      icp_size: data.icpSize,
      ticket_avg: data.ticketAvg,
      traction: data.traction,
      mrr: data.mrr,
      expectations: data.expectations,
      contact_name: data.contactName,
      contact_email: data.contactEmail,
      contact_whats: data.contactWhats,
    };
    const { error } = await supabase.from("puntosaas_applications").insert([insertData]);
    if (error) {
      console.error('Supabase error:', error); // <-- LOG SUPABASE ERROR
      return new Response(JSON.stringify({ message: error.message, details: error.details, hint: error.hint, code: error.code }), { status: 500 });
    }
    return new Response(JSON.stringify({ message: "¡Aplicación recibida!" }), { status: 200 });
  } catch (e) {
    console.error('Catch error:', e); // <-- LOG CATCH ERROR
    return new Response(JSON.stringify({ message: "Error procesando la solicitud", error: String(e) }), { status: 400 });
  }
};
