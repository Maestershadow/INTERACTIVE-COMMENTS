import Card from "./components/Card";
import Comment from "./components/Comment";
import SubCard from "./components/SubCard";
import cardData from './data.json';
import './Body.css'
import { useState } from "react";

export default function Body() {
    const [replyUsername, setReplyUsername] = useState("");
    const [topNodeUsername, setTopNodeUsername] = useState("");
    const [userCardData, setUserCardData] = useState(cardData.comments);
    const [editingId, setEditingId] = useState(-1);

   
    function modifyScore(userScore: number, userId: number,) {
        setUserCardData(userCardData.map((comment) => comment.id === userId ? { ...comment, score: userScore } : comment));
    }

    function deleteComment(userId:number, isSub:boolean)
    {
        if(isSub)
            setUserCardData(userCardData.map((comment) =>  {return { ...comment, replies: comment.replies.filter((reply)=> reply.id !== userId ) }}));
        else
            setUserCardData(userCardData.filter((comment)=> comment.id !== userId));
    }

    function setUsernames(replyName: string, topNodeUser: string) {
        setReplyUsername(replyName);
        setTopNodeUsername(topNodeUser);
    }

    function resetNames()
    {
        setReplyUsername("");
        setTopNodeUsername("");
    }

    function updateComment(passedComment:string,commentId:number)
    {
        setUserCardData(userCardData.map((com)=>com.id === commentId ? {...com, content:passedComment}:com))
    }

    function updateReply(passedComment:string,commentId:number)
    {
        setUserCardData(userCardData.map((comment) => {
            return {
                ...comment,
                replies: comment.replies.map((reply) =>
                    reply.id === commentId ?
                        { ...reply, content:passedComment } : reply)
            }
        }));
    }

    

    function modifyReplyScore(userScore: number, userId: number,) {
        setUserCardData(userCardData.map((comment) => {
            return {
                ...comment,
                replies: comment.replies.map((reply) =>
                    reply.id === userId ?
                        { ...reply, score: userScore } : reply)
            }
        }));
    }

    function addReply(reply: string) {
        let totalIds: number = userCardData.length;
        for (let i = 0; i < userCardData.length; ++i) {
            totalIds += userCardData[i].replies.length;
        }

        const userData = {
            "id": totalIds + 1,
            "content": reply,
            "createdAt": "a moment ago",
            "score": 0,
            "replyingTo": replyUsername,
            "user": {
                "image": {
                    "png": "./images/avatars/image-juliusomo.png",
                    "webp": "./images/avatars/image-juliusomo.webp"
                },
                "username": cardData.currentUser.username
            },
           
        };
        if(topNodeUsername === "")
        {
            const userData = {
                "id": totalIds + 1,
                "content": reply,
                "createdAt": "a moment ago",
                "score": 0,
                "replyingTo": replyUsername,
                "user": {
                    "image": {
                        "png": "./images/avatars/image-juliusomo.png",
                        "webp": "./images/avatars/image-juliusomo.webp"
                    },
                    "username": cardData.currentUser.username
                },
                "replies": []
            };
            setUserCardData([...userCardData,userData]);
        }
        else
        {
            setUserCardData(userCardData.map((comment) => { return comment.user.username === topNodeUsername ? { ...comment, replies: [...comment.replies, userData] } : comment }));
        }
    }



    return (
        <main className="main-body">
            {
                userCardData.map((comment) => {
                    if (comment.replies.length === 0)
                        return <>
                            <Card
                                deleteComment={()=>deleteComment(comment.id,false)}
                                updateValue={(value,id)=> updateComment(value,id)}
                                key={comment.id}
                                setEditId={(editId)=> setEditingId(editId)}
                                isEditing={comment.id === editingId}
                                callback={() => setUsernames(comment.user.username, comment.user.username)}
                                comment={comment}
                                isUser={cardData.currentUser.username === comment.user.username}
                                modifyScore={(userScore: number, userId: number) => modifyScore(userScore, userId)}
                            />
                            {replyUsername === comment.user.username
                                && <Comment 
                                key={`${comment.id+comment.user.username}` }
                                addUserReply={(reply) => addReply(reply)} 
                                isSub={false} 
                                replyingTo={`@${replyUsername}`} 
                                resetNamesCallback={()=>resetNames()}
                                />}
                        </>
                    else {
                        return <>
                            <Card
                                deleteComment={()=>deleteComment(comment.id,false)}
                                updateValue={(value,id)=> updateComment(value,id)}
                                key={comment.id}
                                setEditId={(editId)=> setEditingId(editId)}
                                isEditing={comment.id === editingId}
                                callback={() => setUsernames(comment.user.username, comment.user.username)}
                                modifyScore={(userScore: number, userId: number) => modifyScore(userScore, userId)}
                                comment={comment}
                                isUser={cardData.currentUser.username === comment.user.username} />
                            {replyUsername === comment.user.username && <Comment    key={`${comment.id+comment.user.username}` } resetNamesCallback={()=>resetNames()} addUserReply={(reply) => addReply(reply)} isSub={false} replyingTo={`@${replyUsername}`} />}
                            <div className="subs">
                                <div className="vertical-line">
                                </div>
                                <div>
                                    {comment.replies.map((sub_comment) => {
                                        return <>
                                            <SubCard
                                                updateValue={(value,id)=> updateReply(value,id)}
                                                key={sub_comment.id}
                                                setEditId={(editId)=> setEditingId(editId)}
                                                isEditing ={sub_comment.id === editingId}
                                                modifyScore={(userScore: number, userId: number) => modifyReplyScore(userScore, userId)}
                                                callback={() => setUsernames(sub_comment.user.username, comment.user.username)}
                                                comment={sub_comment}
                                                deleteComment={()=>deleteComment(sub_comment.id,true)}
                                                isUser={cardData.currentUser.username === sub_comment.user.username} />
                                            {replyUsername === sub_comment.user.username && <Comment key={`${sub_comment.id+sub_comment.user.username}` } resetNamesCallback={()=>resetNames()} addUserReply={(reply) => addReply(reply)} isSub={true} replyingTo={`@${replyUsername}`} />}
                                        </>
                                    })}
                                </div>

                            </div>

                        </>
                    }
                })
            }
            <Comment resetNamesCallback={()=>resetNames()} isSub={false} replyingTo={""} addUserReply={(reply) => addReply(reply)} />
           
        </main>
    );
}

