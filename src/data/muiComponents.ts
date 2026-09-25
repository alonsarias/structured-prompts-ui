import type { MuiComponentDefinition } from "../types";

// Import all component category JSON files
import inputsData from "./components/inputs.json";
import dataDisplayData from "./components/dataDisplay.json";
import feedbackData from "./components/feedback.json";
import surfacesData from "./components/surfaces.json";
import navigationData from "./components/navigation.json";
import layoutData from "./components/layout.json";
import utilsData from "./components/utils.json";
import labData from "./components/lab.json";

// Combine all components from all categories
export const muiComponents: MuiComponentDefinition[] = [
  ...inputsData.components,
  ...dataDisplayData.components,
  ...feedbackData.components,
  ...surfacesData.components,
  ...navigationData.components,
  ...layoutData.components,
  ...utilsData.components,
  ...labData.components,
] as MuiComponentDefinition[];

const muiComponentsByName = new Map(
  muiComponents.map((comp) => [comp.name, comp]),
);

export const getMuiComponentByName = (
  name: string,
): MuiComponentDefinition | undefined => {
  return muiComponentsByName.get(name);
};

export const getAllCategories = (): string[] => {
  const categorySet = new Set<string>();
  for (const comp of muiComponents) {
    categorySet.add(comp.category);
  }
  return [...categorySet].sort();
};

/** Case, spaces, and punctuation folded so TextField matches Text Field. */
export const normalizeComponentQuery = (value: string): string =>
  value.toLowerCase().replace(/[^a-z0-9]/g, "");

export const searchComponents = (query: string): MuiComponentDefinition[] => {
  const trimmed = query.trim();
  if (!trimmed) return muiComponents;

  const normalizedQuery = normalizeComponentQuery(trimmed);
  const lowerQuery = trimmed.toLowerCase();

  return muiComponents.filter((comp) => {
    const nameMatch =
      normalizedQuery.length > 0 &&
      [comp.name, comp.displayName, comp.description].some((value) =>
        normalizeComponentQuery(value).includes(normalizedQuery),
      );
    const rawMatch =
      comp.name.toLowerCase().includes(lowerQuery) ||
      comp.displayName.toLowerCase().includes(lowerQuery) ||
      comp.description.toLowerCase().includes(lowerQuery);
    return nameMatch || rawMatch;
  });
};
