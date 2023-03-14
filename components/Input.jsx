import { EmojiHappyIcon, PhotographIcon, XIcon } from "@heroicons/react/outline";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { db, storage } from "../firebase";


export default function Input() {
  const {data : session} = useSession();
  const [input,setInput] = useState("");
  const [selectedFile,setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);
  const [loading,setLoading] = useState(false);

  const sendPost = async() => {

    if(loading) return

    setLoading(true)
    //input data ke database collection posts
    const docRef = await addDoc(collection(db,"posts"),{
      id: session?.user?.uid,
      text: input,
      userImg: session?.user?.image,
      timestamp: serverTimestamp(),
      name: session?.user?.name,
      username: session?.user?.username
    });

    //menyiapkan file untuk di upload
    const imageRef = ref(storage, `posts/${docRef.id}/image`)

    //jika user menginputkan file ke input type file upload
    if(selectedFile){
      //upload string
      await uploadString(imageRef,selectedFile,"data_url").then(async()=>{
        //dapatkan downloadurl
        const downloadURL = await getDownloadURL(imageRef);
        //update collection post dengan id tertentu dan tambahkan field image : download url
        await updateDoc(doc(db, "posts", docRef.id),{

          image: downloadURL
        }
        )
      })
    }

    reset();
    setSelectedFile(null);
    setLoading(false);
  }

  const reset = () => {
    setInput("");
  }
  
  const addImageToPost = (e) => {
    const reader =  new FileReader();
    if (e.target.files[0]){
       reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    }
  }

  return (
    <>
    {session && (
      <div className="flex  border-b border-gray-200 p-3 space-x-3">
      <img
        src={session?.user?.image}
        alt={`Foto profile ${session?.user?.name}`}
        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
      />
      <div className="w-full divide-y divide-gray-200">
        <div className="">
          <textarea className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700" rows="2" placeholder="Whats happening?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          ></textarea>
        </div>
        {selectedFile && (
          <div className="relative">
            <XIcon className="h-7 text-black cursor-pointer absolute bg-white opacity-70 rounded-full top-1 left-1 " onClick={() => setSelectedFile(null)}/>
              <img src={selectedFile} alt="" className={`${loading && "animate-pulse"}`} />
          </div>
        )}
        <div className="flex items-center justify-between pt-2.5">
          {!loading && (
            <>
            <div className="flex">
              <div onClick={() => filePickerRef.current.click()}>
                <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"/>
                <input type="file" hidden ref={filePickerRef} onChange={addImageToPost}/>
              </div>
                <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"/>
            </div>
            <button onClick={sendPost} disabled={!input.trim() && selectedFile === null} className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">Tweet</button>
            </>
          )}
            
        </div>
      </div>
    </div>
    )}
    
    </>
    
  );
}
