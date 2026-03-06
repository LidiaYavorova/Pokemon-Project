import { BASE_URL } from "../utils/constants";

interface TypeAdvantage {
  name: string;
  url: string;
}

export const getTypeAdvantage = async (type: string) => {
  try {
    const response = await fetch(`${BASE_URL}/type/${type}`);
    if (!response.ok) {
      throw new Error("Failed to load type advantage");
    }
    const data = await response.json();
    return data.damage_relations.double_damage_to.map(
      (t: TypeAdvantage) => t.name,
    );
  } catch (error) {
    console.error(error);
    return [];
  }
};
