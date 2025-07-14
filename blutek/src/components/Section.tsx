"use client"
import { motion } from "framer-motion";
import type { LandingSectionIds } from "../types";

type Props = {
  title: string[];
  children?: React.ReactNode;
  id?: LandingSectionIds; // TODO: Add type for id sections
};

export const Section = ({ children, title, id }: Props) => {
  return (
    <section
      id={id}
      className="flex flex-col items-center py-25 px-3 md:px-[10%] lg:px-[20%] even:bg-neutral-100"
    >
    <motion.h2
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className="flex flex-wrap justify-center text-3xl md:text-4xl text-neutral-950 mb-8 text-center md:text-left leading-tight"
>
  {title.map((str, index) => (
    <span
      key={index}
      className={index === 1
        ? "font-semibold text-blue-900 ml-2"
        : ""}
    >
      {str}
    </span>
  ))}
</motion.h2>

      {children}
    </section>
  );
};
