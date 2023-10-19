
import React, { LegacyRef } from "react";
import "./DeleteModal.css";

const Modal = React.forwardRef((passedRef:LegacyRef<HTMLDialogElement>)=> {
    return (
        <>
            <dialog ref={passedRef} className="modal" id="modal">
                <h2 className="modal-heading">Delete Comment</h2>
                <p className="modal-content">Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                <div className="modal-actions">
                    <button className="delete-btn">NO,CANCEL</button>
                    <button className="cancel-btn">YES,DELETE</button>
                </div>
            </dialog>
        </>
    );
});

export default Modal;