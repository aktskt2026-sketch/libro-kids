"use client";
import { useEffect } from "react";
import { flushSync } from "react-dom";
import { books, categories } from "@/data/books";
import type { Language } from "@/types";

interface FilterInput {
  query?: string;
  age?: string;
  category?: string;
}
interface ModelContext {
  registerTool(
    tool: {
      name: string;
      title: string;
      description: string;
      inputSchema: object;
      annotations: object;
      execute(input: unknown): unknown;
    },
    options: { signal: AbortSignal },
  ): void | Promise<void>;
}
export function useLibraryTools(
  language: Language,
  setQuery: (s: string) => void,
  setAge: (s: string) => void,
  setCategory: (s: string) => void,
) {
  useEffect(() => {
    const context = (document as Document & { modelContext?: ModelContext })
      .modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const tool = {
      name: "filter_library",
      title: "Filter Libro-Kids library",
      description:
        "Search and filter the visible mock book library. Updates on-screen filters and returns matching titles.",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", maxLength: 100 },
          age: { type: "string", enum: ["all", "6–7", "7–8", "8–9", "9–10"] },
          category: { type: "string", enum: ["all", ...categories] },
        },
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input: unknown) {
        if (!input || typeof input !== "object" || Array.isArray(input))
          throw new Error("Expected filter object");
        const args = input as FilterInput;
        if (
          Object.keys(args).some(
            (k) => !["query", "age", "category"].includes(k),
          )
        )
          throw new Error("Unknown filter");
        const query = args.query ?? "",
          age = args.age ?? "all",
          category = args.category ?? "all";
        if (
          typeof query !== "string" ||
          query.length > 100 ||
          !["all", "6–7", "7–8", "8–9", "9–10"].includes(age) ||
          !["all", ...categories].includes(
            category as (typeof categories)[number],
          )
        )
          throw new Error("Invalid library filter");
        flushSync(() => {
          setQuery(query);
          setAge(age);
          setCategory(category);
        });
        const normalize = (s: string) =>
          s.toLocaleLowerCase().replace(/[‘’ʻʼ']/g, "");
        return {
          filters: { query, age, category },
          books: books
            .filter(
              (b) =>
                (age === "all" || b.age === age) &&
                (category === "all" || b.category === category) &&
                normalize(
                  b.title[language] + " " + b.subtitle[language],
                ).includes(normalize(query.trim())),
            )
            .map((b) => ({
              id: b.id,
              title: b.title[language],
              age: b.age,
              category: b.category,
            })),
        };
      },
    };
    try {
      void Promise.resolve(
        context.registerTool(tool, { signal: lifecycle.signal }),
      ).catch(() => {});
    } catch {}
    return () => lifecycle.abort();
  }, [language, setQuery, setAge, setCategory]);
}
