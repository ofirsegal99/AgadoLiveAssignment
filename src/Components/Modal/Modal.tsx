import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import "Components/Modal/Modal.css"
import Title from "Common/Title/Title";

export default function Modal({
  open,
  onOpenChange,
  children,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  );
}

function ModalContent({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {

    const exitSvg = <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 0.666748C6.62666 0.666748 0.666656 6.62675 0.666656 14.0001C0.666656 21.3734 6.62666 27.3334 14 27.3334C21.3733 27.3334 27.3333 21.3734 27.3333 14.0001C27.3333 6.62675 21.3733 0.666748 14 0.666748ZM20.6667 18.7867L18.7867 20.6667L14 15.8801L9.21332 20.6667L7.33332 18.7867L12.12 14.0001L7.33332 9.21342L9.21332 7.33342L14 12.1201L18.7867 7.33342L20.6667 9.21342L15.88 14.0001L20.6667 18.7867Z" fill="black"/>
    </svg>
    

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="modal--overlay" />
      <Dialog.Content className="modal--content">
        <div style={{display:"flex",width:'100%',justifyContent:'flex-start'}}>
          <Dialog.Title className="modal--title">
            <Title value={title} size={"H6"} color={"dark"}/>
            </Dialog.Title>
          <Dialog.Close className="modal--close--button">
            {exitSvg}
          </Dialog.Close>
        </div>
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
}

Modal.Button = Dialog.Trigger;
Modal.Close = Dialog.Close;
Modal.Content = ModalContent;