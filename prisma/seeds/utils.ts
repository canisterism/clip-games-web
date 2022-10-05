import { firestore } from "../firebaseAdmin";

// 指定したコレクションを読み込む関数。{id: document1, id: document2... } の形式で返る。
export const fetchDocumentDataList = async (
  collectionPath: string,
  limit?: number
): Promise<{
  [key: string]: FirebaseFirestore.DocumentData;
}> => {
  let snapshots: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>;

  if (limit) {
    snapshots = await firestore.collection(collectionPath).limit(limit).get();
  } else {
    snapshots = await firestore.collection(collectionPath).get();
  }
  const documentMap: { [key: string]: FirebaseFirestore.DocumentData } = {};

  for (const snapshot of snapshots.docs) {
    documentMap[snapshot.id] = snapshot.data();
  }
  return documentMap;
};

export const fetchSubCollection = async (
  collectionId: string
): Promise<FirebaseFirestore.DocumentData[]> =>
  await (
    await firestore.collectionGroup(collectionId).get()
  ).docs.map((doc) => doc.data());

export const fetchDocumentReference = async (
  collectionPath: string,
  id: string
): Promise<FirebaseFirestore.DocumentReference | undefined> => {
  return await firestore.collection(collectionPath).doc(id);
};
