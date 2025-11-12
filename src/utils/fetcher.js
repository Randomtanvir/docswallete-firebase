import {
  collection,
  getDocs,
  orderBy,
  limit,
  startAfter,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export const getSingleVerificationDataByURLLINK = async (urlLink) => {
  try {
    const q = query(
      collection(db, "verifications"),
      where("urlLink", "==", urlLink)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const result = querySnapshot.docs[0];
    return { id: result.id, ...result.data() };
  } catch (error) {
    console.error(error);
    return { error: true, message: "data fetch error" };
  }
};

// ⬇️ Utility function
export const getPaginatedVerificationData = async (
  pageSize = 10,
  lastDoc = null
) => {
  try {
    // 🔹 Build query with sort + pagination
    let q = query(
      collection(db, "verifications"),
      orderBy("transactionNumber", "desc"),
      limit(pageSize)
    );

    // 🔹 If not first page, start after the last fetched doc
    if (lastDoc) {
      q = query(
        collection(db, "verifications"),
        orderBy("transactionNumber", "desc"),
        startAfter(lastDoc),
        limit(pageSize)
      );
    }

    const snapshot = await getDocs(q);

    // 🔹 Map data
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // 🔹 Keep the last visible document for next pagination
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];

    return {
      data,
      lastVisible, // Pass this to next call for pagination
    };
  } catch (error) {
    console.error("Pagination fetch error:", error);
    return { data: [], lastVisible: null };
  }
};
export const getSingleVerificationData = async (id) => {
  const docRef = doc(db, "verifications", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    return { error: true, message: "No such document!" };
  }
};
