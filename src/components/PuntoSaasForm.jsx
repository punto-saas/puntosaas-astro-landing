import React, { useState } from "react";
import "../styles/input.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  startupName: z.string().min(3, "Mínimo 3 caracteres").max(50, "Máximo 50 caracteres"),
  websiteOrDeck: z.string().url("Debe ser una URL válida").or(z.literal("")).optional(),
  problemSolution: z.string().min(1, "Requerido").max(140, "Máximo 140 caracteres"),
  icpSector: z.string().min(1, "Requerido"),
  icpRole: z.string().min(1, "Requerido"),
  icpSize: z.enum(["50-500", "500-1000", "1000-5000", ">5000"]),
  ticketAvg: z.coerce.number().min(1000, { message: "Mínimo $1,000" }),
  traction: z.enum(["Sin ventas aún", "1-5 clientes pagos", ">5 clientes pagos"]),
  mrr: z.coerce.number().min(0, { message: "No puede ser negativo" }),
  expectations: z.string().max(100, "Máximo 100 caracteres").optional(),
  contactName: z.string().min(1, "Requerido"),
  contactEmail: z.string().email("Email inválido"),
  contactWhats: z.string().regex(/^\+?\d{9,15}$/, "Debe ser un número válido (9-15 dígitos)"),
});

const TICKET_MIN = 1000;

const initialState = {
  startupName: "",
  websiteOrDeck: "",
  problemSolution: "",
  icpSector: "",
  icpRole: "",
  icpSize: "50-500",
  ticketAvg: "",
  traction: "Sin ventas aún",
  mrr: "",
  expectations: "",
  contactName: "",
  contactEmail: "",
  contactWhats: "",
};

export default function PuntoSaasForm() {
  const [status, setStatus] = useState(null);
  const [alert, setAlert] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialState,
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    if (Number(data.ticketAvg) < TICKET_MIN) {
      setAlert("Por ahora trabajamos con tickets desde US $1,000. Suscríbete a nuestra newsletter y te avisamos…");
      setStatus(null);
      return;
    }
    setAlert("");
    setStatus("loading");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        window.dataLayer?.push?.({ event: "puntosaas_application_sent" });
        reset();
      } else {
        setStatus("error");
      }
    } catch (e) {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white/90 border border-[var(--color-border)] rounded-2xl shadow-lg px-4 md:px-10 py-8 md:py-12 relative overflow-hidden" noValidate>
      <div className="absolute left-0 top-0 w-full h-2 bg-[var(--color-accent)] rounded-t-2xl" />
      {alert && (
        <div className="mb-4 text-[var(--color-accent)] bg-[var(--color-accent)]/10 rounded p-3 text-center font-semibold">
          {alert}
        </div>
      )}
      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[var(--color-primary)]">Aplica a los Desayunos con ICPs</h2>
      <p className="mb-8 text-[var(--color-text)]/80 text-lg">Completa este formulario para postular tu startup B2B SaaS.</p>
      {status === "success" && (
        <div className="bg-green-100 text-green-900 px-4 py-2 rounded mb-2 text-sm">¡Gracias! Revisaremos tu info y te contactaremos.</div>
      )}
      {status === "error" && (
        <div className="bg-red-100 text-red-900 px-4 py-2 rounded mb-2 text-sm">Hubo un error al enviar tu aplicación. Intenta de nuevo.</div>
      )}
      <div className="flex flex-col gap-2">
        <label htmlFor="startupName" className="font-semibold text-[var(--color-primary)]">Nombre de la startup *</label>
        <input {...register("startupName")}
          id="startupName"
          type="text"
          placeholder="Ej.: Acme Cloud"
          aria-description="Nombre de la startup"
          className="input mb-6"
        />
        {errors.startupName && <span className="text-[var(--color-accent)] text-xs">{errors.startupName.message}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="websiteOrDeck" className="font-semibold text-[var(--color-primary)]">Web o enlace al deck</label>
        <input {...register("websiteOrDeck")}
          id="websiteOrDeck"
          type="url"
          placeholder="https://…"
          aria-description="Web o enlace al deck"
          className="input mb-6"
        />
        {errors.websiteOrDeck && <span className="text-[var(--color-accent)] text-xs">{errors.websiteOrDeck.message}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="problemSolution" className="font-semibold text-[var(--color-primary)]">¿Qué problema resuelven y para quién? *</label>
        <textarea {...register("problemSolution")}
          id="problemSolution"
          maxLength={140}
          placeholder="Breve y directo"
          aria-description="¿Qué problema resuelven y para quién?"
          className="input mb-6"
        />
        <span className="text-xs text-gray-400">Máx. 140 caracteres</span>
        {errors.problemSolution && <span className="text-[var(--color-accent)] text-xs">{errors.problemSolution.message}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="icpSector" className="font-semibold text-[var(--color-primary)]">Sector de tu cliente ideal *</label>
        <input {...register("icpSector")}
          id="icpSector"
          type="text"
          placeholder="Banca, Retail, Logística…"
          aria-description="Sector de tu cliente ideal"
          className="input mb-6"
        />
        {errors.icpSector && <span className="text-[var(--color-accent)] text-xs">{errors.icpSector.message}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="icpRole" className="font-semibold text-[var(--color-primary)]">Cargo/área de decisión *</label>
        <input {...register("icpRole")}
          id="icpRole"
          type="text"
          placeholder="Gerente de Innovación"
          aria-description="Cargo/área de decisión"
          className="input mb-6"
        />
        {errors.icpRole && <span className="text-[var(--color-accent)] text-xs">{errors.icpRole.message}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="icpSize" className="font-semibold text-[var(--color-primary)]">Tamaño empresa (empleados) *</label>
        <select {...register("icpSize")}
          id="icpSize"
          aria-description="Tamaño empresa (empleados)"
          className="input mb-6"
        >
          <option value="50-500">50-500</option>
          <option value="500-1000">500-1000</option>
          <option value="1000-5000">1000-5000</option>
          <option value=">5000">&gt;5000</option>
        </select>
        {errors.icpSize && <span className="text-[var(--color-accent)] text-xs">{errors.icpSize.message}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="ticketAvg" className="font-semibold text-[var(--color-primary)]">Ticket promedio mensual (USD) *</label>
        <input {...register("ticketAvg")}
          id="ticketAvg"
          type="number"
          min={1000}
          placeholder="1200"
          aria-description="Ticket promedio mensual"
          className="input mb-6"
        />
        {errors.ticketAvg && <span className="text-[var(--color-accent)] text-xs">{errors.ticketAvg.message}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="traction" className="font-semibold text-[var(--color-primary)]">Tracción actual *</label>
        <select {...register("traction")}
          id="traction"
          aria-description="Tracción actual"
          className="input mb-6"
        >
          <option value="Sin ventas aún">Sin ventas aún</option>
          <option value="1-5 clientes pagos">1-5 clientes pagos</option>
          <option value=">5 clientes pagos">&gt;5 clientes pagos</option>
        </select>
        {errors.traction && <span className="text-[var(--color-accent)] text-xs">{errors.traction.message}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="mrr" className="font-semibold text-[var(--color-primary)]">MRR actual (USD) *</label>
        <input {...register("mrr")}
          id="mrr"
          type="number"
          min={0}
          placeholder="8000"
          aria-description="MRR actual"
          className="input mb-6"
        />
        {errors.mrr && <span className="text-[var(--color-accent)] text-xs">{errors.mrr.message}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="expectations" className="font-semibold text-[var(--color-primary)]">¿Qué esperas lograr en el desayuno?</label>
        <textarea {...register("expectations")}
          id="expectations"
          maxLength={100}
          placeholder="Conseguir 3 intros a bancos medianos"
          aria-description="¿Qué esperas lograr en el desayuno?"
          className="input mb-6"
        />
        <span className="text-xs text-gray-400">Máx. 100 caracteres</span>
        {errors.expectations && <span className="text-[var(--color-accent)] text-xs">{errors.expectations.message}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="contactName" className="font-semibold text-[var(--color-primary)]">Nombre de la persona de contacto *</label>
        <input {...register("contactName")}
          id="contactName"
          type="text"
          placeholder="Ana Torres"
          aria-description="Nombre de la persona de contacto"
          className="input mb-6"
        />
        {errors.contactName && <span className="text-[var(--color-accent)] text-xs">{errors.contactName.message}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="contactEmail" className="font-semibold text-[var(--color-primary)]">Email *</label>
        <input {...register("contactEmail")}
          id="contactEmail"
          type="email"
          placeholder="ana@startup.com"
          aria-description="Email"
          className="input mb-6"
        />
        {errors.contactEmail && <span className="text-[var(--color-accent)] text-xs">{errors.contactEmail.message}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="contactWhats" className="font-semibold text-[var(--color-primary)]">WhatsApp *</label>
        <input {...register("contactWhats")}
          id="contactWhats"
          type="tel"
          placeholder="+51 987 654 321"
          aria-description="WhatsApp"
          className="input mb-6"
        />
        {errors.contactWhats && <span className="text-[var(--color-accent)] text-xs">{errors.contactWhats.message}</span>}
      </div>
      <button
        type="submit"
        className="mt-4 bg-[var(--color-primary)] text-white font-semibold py-2 px-6 rounded-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow hover:bg-[var(--color-primary-dark)] transition"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting && (
          <svg className="animate-spin h-4 w-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
        )}
        Enviar
      </button>
    </form>
  );
}

// Tailwind input style helper (global or module CSS can be used instead)
// .input { @apply border border-[var(--color-border)] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white text-[var(--color-text)] placeholder-gray-400; transition-all; }
