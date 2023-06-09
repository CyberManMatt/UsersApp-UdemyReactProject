import Card from "./Card";
import Button from "./Button";
import classes from "./ErrorModal.module.css";
import ReactDOM from "react-dom";

function Backdrop(props) {
  // If the user clicks outside the Error Modal, it clears the error.
  return <div className={classes.backdrop} onClick={props.onClear} />
}

function ModalOverlay(props) {
  return (
    <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <p>{props.message}</p>
        </div>
        <footer className={classes.actions}>
          <Button onClick={props.onClear}>Okay</Button>
        </footer>
      </Card>
  )
}

export function ErrorModal(props) {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClear={props.onClear}/>, document.getElementById("backdrop-root"))}
      {ReactDOM.createPortal(<ModalOverlay title={props.title} message={props.message} onClear={props.onClear} />, document.getElementById("overlay-root"))}
    </>
  );
}
