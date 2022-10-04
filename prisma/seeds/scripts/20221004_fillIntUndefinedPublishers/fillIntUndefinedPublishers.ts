import { fetchDocumentReference } from "../../utils";
import mapJson from "./game-publisher.map.prd.json";

type GamePublisherMap = {
  [key: string]: { title: string; publisher: string };
};

export const fillIntUndefinedPublishers = async () => {
  const map: GamePublisherMap = mapJson;

  for await (const [id, data] of Object.entries(map)) {
    const ref = await fetchDocumentReference("games", id);

    if (ref === undefined) throw new Error(`Document not found. id: ${id}`);
    console.log(`Updating ${data.title}'s publisher as ${data.publisher}...`);

    await ref.update({ publisher: data.publisher });
    console.log(`Updated ${data.title}'s publisher as ${data.publisher}...`);
  }
};
