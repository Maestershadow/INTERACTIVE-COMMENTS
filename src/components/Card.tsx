import Score from './card_content/score/Score';
import UserDetails from './card_content/user_details/UserDetails';
import CommentAction from './card_content/comment_action/CommentAction';
import './Card.css'
import ContentBody from './card_content/comment_body/ContentBody';
import { useState } from 'react';



export default function Card(props: {deleteComment: ()=>void;updateValue:(value:string,id:number)=>void; setEditId:(editId:number) => void; isEditing: boolean; modifyScore: (userScore: number, userId: number) => void; callback: () => void ; comment: { score: number; user: { image: { webp: string; }; username: string; }; createdAt: string; content: string; id: number };  isUser: boolean}) {
    const [textareaValue, setTextAreaValue] = useState(props.comment.content);

    return (
        <div className="comment-card">
            <Score userId={props.comment.id} modifyScore={(userScore: number,userId: number)=> props.modifyScore(userScore,userId)} scoreNumber={props.comment.score} />
            <UserDetails image={props.comment.user.image.webp} username={props.comment.user.username} isUser={props.isUser} createdAt={props.comment.createdAt}/>
            <CommentAction updateValue={() =>props.updateValue(textareaValue,props.comment.id)} id={props.comment.id} isEditing={props.isEditing} setEditId={(editId)=>props.setEditId(editId)} deleteComment={()=>props.deleteComment()} isUser={props.isUser} callback={() => props.callback()}/>
            <ContentBody  textareaValue={textareaValue} setTextAreaValue={(value)=> setTextAreaValue(value)} isEditing={props.isEditing} replyingTo={""} content={props.comment.content}/>
       </div>
    );
}