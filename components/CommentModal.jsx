import { useRecoilState } from "recoil"
import { modalState, postIdState } from "../atom/modalAtom"
import Modal from "react-modal";
import { EmojiHappyIcon, PhotographIcon, XIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import Moment from "react-moment";
import { useSession } from "next-auth/react";

export default function CommentModal() {
    const {data:session} = useSession();
    const [open, setOpen] = useRecoilState(modalState);
    const [postId, setPostId] = useRecoilState(postIdState);
    const [post,setPost] = useState({});
    const [input,setInput] = useState("");
    const sendComment = () => {
        
    }
    
    

    useEffect(() => {
        onSnapshot(doc(db,"posts", postId), (snapshot) => {
            setPost(snapshot);
        })
    },[postId,db])
  return (
    <div>
        {open && (
            <Modal isOpen={open}
            onRequestClose={() => setOpen(false)}
            className="max-w-xl w-[80%]  absolute top-24 left-[50%] translate-x-[-50%] border-2  border-gray-400  bg-white  rounded-xl shadow-md ">
                <div className="p-1">
                    <div className="border-b border-gray-200 py-2 px-1.5">
                        <div onClick={() => setOpen(false)} className="hoverEffect w-9 h-9 flex items-center justify-center">
                            <XIcon className="h-[22px] text-gray-400 p-0"></XIcon>
                        </div>
                    </div>

                    <div className="p-2 flex items-center space-x-1 relative">
                        <span className="w-0.5 h-full z-[-1] left-8 top-11 absolute space-x-1 bg-gray-500" />
                    <img
                        className="h-11 w-11 rounded-full mr-4"
                        src={post?.data()?.userImg}
                        alt="user-img"
                    />
                     <h4 className="font-bold text-[15px] md:text-sm sm:text-[16px] hover:underline">
              {post?.data()?.name}
            </h4>
            
            <span className="text-sm sm:text-[15px] hover:underline">
              <Moment fromNow>

              {post?.data()?.timestamp?.toDate()}
              </Moment>
            </span>
            <span className="text-sm sm:text-[15px] col">@{post?.data()?.username} - </span>
        </div>
        <p className="text-gray-500 text-[15px] sm:text-[16px] ml-14 mb-5">{post?.data()?.text}</p>
            

                    
      <div className="flex   border-gray-200 p-3 space-x-3">
      <img
        src={session?.user?.image}
        alt={`Foto profile ${session?.user?.name}`}
        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
      />
      <div className="w-full divide-y divide-gray-200">
        <div className="">
          <textarea className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700" rows="2" placeholder="Tweet your reply?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          ></textarea>
        </div>
       
        <div className="flex items-center justify-between pt-2.5">
          
           
            <div className="flex">
              <div onClick={() => filePickerRef.current.click()}>
                <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"/>
                {/* <input type="file" hidden ref={filePickerRef} onChange={addImageToPost}/> */}
              </div>
                <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"/>
            </div>
            <button onClick={sendComment} disabled={!input.trim()} className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">Reply</button>
          
        
            
        </div>
      </div>
    </div>
   

                </div>
            </Modal>
        )}
    </div>
  )
}
