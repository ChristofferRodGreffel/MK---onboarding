import { onDocumentWritten } from "firebase-functions/v2/firestore";

exports.myfunction = onDocumentWritten("my-collection/{docId}", (event) => {
  /* ... */
});
