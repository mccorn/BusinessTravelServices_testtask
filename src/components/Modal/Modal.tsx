import { ReactNode } from 'react'
import './Modal.css'
import classNames from 'classnames'

type ModalProps = {
  onClose: () => void,
  isOpen: boolean,
  children: ReactNode
}

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  return (
    <div
      className={classNames("modal", {"hidden": !isOpen})}
      onClick={onClose}
    >
      {children}
    </div>
  )
}

export default Modal
