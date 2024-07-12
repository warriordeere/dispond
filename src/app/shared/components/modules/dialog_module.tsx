import { useEffect, useRef } from "react";

console.log("dialog_module.tsx");

export default function DialogModule() {

    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (dialogRef.current) {
            dialogRef.current.open
        }
    }, []);

    return (
        <dialog ref={dialogRef}>
            <h2>Lorem ipsum dolor sit amet.</h2>
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Qui, eligendi voluptatum? Repellat, dolor autem magni esse nam reiciendis,
                sed necessitatibus et optio totam tempore beatae?
            </p>
        </dialog>
    );
}