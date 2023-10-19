import { SetStateAction, useState } from 'react';
import './Comment.css'


export default function Comment(props: {resetNamesCallback:() =>void; replyingTo: string; isSub: boolean; addUserReply: (reply: string)=>void} ) {
    const [textareaValue, setTextAreaValue] = useState('');

    const handleTextAreaChange = (event: { target: { value: SetStateAction<string>; }; }) =>{
        setTextAreaValue(event.target.value);
    }

    function addReply()
    {
        if(textareaValue.trim().length !== 0)
        {
             props.addUserReply(textareaValue)
        }
        props.resetNamesCallback();
        setTextAreaValue("");
    }

    return (
        <div className={props.isSub ? "sub-add-comment" : "add-comment"}>
            <img src="./images/avatars/image-juliusomo.webp" alt="avatar" className="comment-avatar" />
            <textarea onChange={handleTextAreaChange} className="comment-box" name="comment" placeholder="Add a comment..." value={textareaValue} ></textarea>
            <button onClick={()=>addReply()}  className="comment-button">{props.replyingTo === ""?"SEND" : "REPLY"}</button>
        </div>
    );
}