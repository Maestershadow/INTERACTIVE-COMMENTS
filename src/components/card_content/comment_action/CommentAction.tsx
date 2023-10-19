

import './CommentAction.css'
import  '../delete_modal/DeleteModal.css';
import {  useRef } from 'react';

export default function CommentAction( props: {updateValue:()=>void; isEditing: boolean;id:number; setEditId: (id:number)=>void; deleteComment: () => void; isUser: boolean; callback: () => void }) {
  const passedRef = useRef(null);
  
  function openModal()
  {
    passedRef.current?.showModal();
  }

  function closeModal()
  {
    passedRef.current?.close();
  }

  function deleteComment()
  {
    passedRef.current?.close();
    props.deleteComment();
  }
  const addUpdate = ()=>{
    props.setEditId(-1)
    props.updateValue()
  };

 

  return (
    <>
      {props.isEditing ?
        <div onClick={()=>addUpdate()}  className="comment-action update-btn">
         <p >UPDATE</p>
      </div>
        :(props.isUser ?
        <div className="comment-action">
          <button onClick={() =>openModal()} className="centered-row-2 act-btn">
            <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368" /></svg>
            <p className="blue-txt bold">Delete</p>
          </button>
          <button onClick={()=>props.setEditId(props.id)} className="centered-row-2 act-btn">
            <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6" /></svg>
            <p className="blue-txt bold">Edit</p>
          </button>
        </div>

        : <button className="comment-action act-btn" onClick={() => props.callback()}>
          <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6" /></svg>
          <p className="blue-txt bold">Reply</p>
        </button>)
        
        }
        <dialog ref={passedRef} className="modal" id="modal">
                <h2 className="modal-heading">Delete Comment</h2>
                <p className="modal-content">Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                <div className="modal-actions">
                    <button onClick={()=>closeModal()} className="cancel-btn">NO,CANCEL</button>
                    <button onClick={()=>deleteComment()}  className="delete-btn">YES,DELETE</button>
                </div>
            </dialog>
         </>
  );
}