import { ID } from "appwrite";
import { storage } from "./appwrite";
import { arrayRemove, deleteDoc, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import mammoth from "mammoth";



export const FileUpload = async (file: File) => {
     try {
        const promise = storage.createFile(
            process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID as string,
            ID.unique(),
            file
        );
        const result = await promise;
        return result;
     } catch (error) {
         console.log(error)
     }
}

export const addFile = async (fileId: string, fileName: string, fileType: string, fileSize: number) => {
    try {
     await setDoc(doc(db, "files", fileId ), {
            fileName,
            fileType,
            fileSize,
            createdAt: serverTimestamp(),
        })
    } catch (error) {
        console.log(error)
    }
}

export const UpdateUser = async (userId: string, field: any) => {
    try {
        const response = await updateDoc(doc(db, "users", userId),field)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const getFileView = async (fileId: string) => {
    try {
        const response = await getDoc(doc(db, "files", fileId))
        if (response.exists()) {
            return response.data()
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.log(error)
    }
}

export const delateFile = async (fileId: string,userId: string) => {
    try {
       await storage.deleteFile(
           process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID as string,
           fileId
       )
       
       await updateDoc(doc(db, "users", userId), {
           files: arrayRemove(fileId),
       })
       await deleteDoc(doc(db, "files", fileId))

    } catch (error) {
       console.log(error)
    }
}


if (typeof window !== 'undefined') {
    GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';  // points to the file in the public folder
  }

export const extractTextFromPDF = async (blob: Blob): Promise<string> => {
    const arrayBuffer = await blob.arrayBuffer();
    const typedArray = new Uint8Array(arrayBuffer);
    const pdf = await getDocument(typedArray).promise;
  
    let text = "";
  
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item: any) => item.str).join(" ") + "\n";
    }
  
    return text;
  };

  export const extractTextFromDOCX = async (blob: Blob): Promise<string> => {
    try {
      const arrayBuffer = await blob.arrayBuffer();
      const { value } = await mammoth.extractRawText({ arrayBuffer });
      return value;
    } catch (error) {
      throw new Error("Error extracting text from DOCX: " + error);
    }
  };