import { firestore } from "../firebaseAdmin";

// 指定したコレクションを読み込む関数。{id: document1, id: document2... } の形式で返る。
export const fetchDocumentDataList = async (
  collectionPath: string
): Promise<{
  [key: string]: FirebaseFirestore.DocumentData;
}> => {
  const snapshots = await firestore.collection(collectionPath).limit(10).get();
  const documentMap: { [key: string]: FirebaseFirestore.DocumentData } = {};

  for (const snapshot of snapshots.docs) {
    documentMap[snapshot.id] = snapshot.data();
  }
  return documentMap;
};
