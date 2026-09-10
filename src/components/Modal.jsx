function Modal ({ isOpen, onClose, children }) {
    if(!isOpen) return null;

    return (
        <div>
            <div>
                <button onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    );

}

export default Modal;