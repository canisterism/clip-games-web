import { dir } from "console";
import { firestore } from "../firebaseAdmin";

// 指定したコレクションを読み込む関数。{id: document1, id: document2... } の形式で返る。
export const fetchDocumentData = async (
  collectionPath: string
): Promise<{
  [key: string]: FirebaseFirestore.DocumentData;
}> => {
  const snapshots = await firestore.collection(collectionPath).get();
  const documentMap: { [key: string]: FirebaseFirestore.DocumentData } = {};

  for (const document of snapshots.docs.map((d) => d.data())) {
    dir(document);
    documentMap[document.id] = document;
  }
  return documentMap;
};
