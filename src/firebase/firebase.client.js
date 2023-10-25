import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
   apiKey: "AIzaSyBHiAkVnjPO_17EUPKKoYfie0leCFHLvBM",
   authDomain: "ecommerce-flipkart-clone.firebaseapp.com",
   projectId: "ecommerce-flipkart-clone",
   storageBucket: "ecommerce-flipkart-clone.appspot.com",
   messagingSenderId: "467485500356",
   appId: "1:467485500356:web:50cf3cf846341408337a91",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const uploadImage = (file) => {
   const imgRef = ref(storage, `images/${file.name}`);
   const imgURL = uploadBytes(imgRef, file).then((res) => {
      console.log("Imagen subida", res);
      return getDownloadURL(imgRef);
   });

   return imgURL;
};
