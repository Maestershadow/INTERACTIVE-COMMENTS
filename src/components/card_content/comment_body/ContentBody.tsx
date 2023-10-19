import { SetStateAction } from 'react';
import './ContentBody.css'


export default function ContentBody(props: {setTextAreaValue:(value: SetStateAction<string>) => void; textareaValue:string; content: string;replyingTo:string; isEditing: boolean; })
{
    

    const handleTextAreaChange = (event: { target: { value: SetStateAction<string>; }; }) =>{
        props.setTextAreaValue(event.target.value);
    }
    return (
            <div className="comment-content">
                {props.isEditing ? <textarea onChange={handleTextAreaChange}  className="content-comment-box" name="comment" placeholder="Add a comment..." value={props.textareaValue}  ></textarea> :  
                <p>{props.replyingTo !== "" && <span className="blue-txt bold">{props.replyingTo}</span>} {props.content}</p> }
               
            </div>
        );
}