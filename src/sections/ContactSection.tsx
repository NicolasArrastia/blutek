"use client";
import React, { useState } from "react";
import Button from "../components/Form/Button";
import { Section } from "../components/Section";
import { Input } from "../components/Form/Input";
import { TextArea } from "../components/Form/TextArea";
import { toast } from "react-toastify";
import { BreakLine } from "@/components/ui/BreakLine";

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const INITIAL_FORM_DATA: FormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const ContactSection = () => {
  const [form, setForm] = useState<FormData>(INITIAL_FORM_DATA);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loadingToastId = toast.loading("Enviando mensaje...");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      toast.dismiss(loadingToastId);

      const data = await res.json();

      if (data.success) {
        toast.success("Mensaje enviado con éxito!");
        setForm(INITIAL_FORM_DATA);
      } else {
        toast.error("Hubo un error al enviar el mensaje.");
      }
    } catch (error) {
      toast.dismiss(loadingToastId);
      console.error(error);
      toast.error("No se pudo enviar el mensaje.");
    }
  };

  return (
    <Section id="contact" title={["Hablemos de tu", "Proyecto"]}>
      <p className="text-center text-neutral-700 max-w-2xl mx-auto mb-6 text-base sm:text-lg">
        ¿Tenés una idea? Nos encantaría escucharla y ayudarte a hacerla
        realidad.
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex flex-col gap-4 p-6 rounded-md mx-auto bg-white shadow-md border border-neutral-200"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            label="Nombre:"
            placeholder="Tu nombre"
            name="name"
            value={form.name}
            handleChange={handleChange}
          />
          <Input
            label="Email:"
            name="email"
            placeholder="tu@email.com"
            value={form.email}
            handleChange={handleChange}
            type="email"
          />
        </div>

        <Input
          label="Teléfono:"
          name="phone"
          placeholder="(011) 1234-5678"
          value={form.phone}
          handleChange={handleChange}
        />

        <TextArea
          name="message"
          value={form.message}
          label="Mensaje:"
          placeholder="Escribinos tu mensaje"
          handleChange={handleChange}
        />

        <Button type="submit">Enviar mensaje</Button>

        <BreakLine />

        <footer className="flex flex-col items-center gap-2 text-neutral-500">
          <span>O contáctanos directamente:</span>
          <span className="font-bold text-neutral-900">hello@bluttek.com</span>
          <span>Respondemos en menos de 24hs</span>
        </footer>
      </form>
    </Section>
  );
};

export default ContactSection;
