import Score from './card_content/score/Score'
import './Card.css'
import CommentAction from './card_content/comment_action/CommentAction';
import ContentBody from './card_content/comment_body/ContentBody';
import UserDetails from './card_content/user_details/UserDetails';
import { useState } from 'react';



export default function SubCard(props:  {updateValue:(value:string,id:number)=>void;setEditId: (id:number)=> void; isEditing:boolean; deleteComment: ()=>void; modifyScore: (userScore: number, userId: number) => void; callback: () => void; comment: { score: number; user: { image: { webp: string; }; username: string; }; createdAt: string; content: string;  id: number ; replyingTo: string};  isUser: boolean;}) {
    const [textareaValue, setTextAreaValue] = useState(props.comment.content);

    return (
        <div className="sub-card" >
            <Score modifyScore={(userScore: number,userId: number)=> props.modifyScore(userScore,userId)}  scoreNumber={props.comment.score} userId={props.comment.id} />
            <UserDetails image={props.comment.user.image.webp} username={props.comment.user.username} isUser={props.isUser} createdAt={props.comment.createdAt}/>
            <CommentAction updateValue={() =>props.updateValue(textareaValue,props.comment.id)} id={props.comment.id} isEditing={props.isEditing} setEditId={(editId)=>props.setEditId(editId)}  deleteComment={()=>props.deleteComment()} isUser={props.isUser} callback={() => props.callback()}/>
            <ContentBody textareaValue={textareaValue} setTextAreaValue={(value)=> setTextAreaValue(value)} isEditing={props.isEditing} replyingTo={`@${props.comment.replyingTo}`} content={props.comment.content}/>
       </div>
    );
}