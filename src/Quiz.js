import { useState } from "react";
import "./quiz.scss";

export default function () {
    // for amount and preferred note
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState(0);
    const [indexForArr, setIndexForArr] = useState(0);

    // for modal
    const [modal, setModal] = useState(false);
    const [modalText, setModalText] = useState("");

    // for setting notes
    const [note1, setNote1] = useState(0);
    const [note5, setNote5] = useState(0);
    const [note10, setNote10] = useState(0);
    const [note20, setNote20] = useState(0);
    const [note50, setNote50] = useState(0);
    const [note100, setNote100] = useState(0);
    const [note500, setNote500] = useState(0);

    // for toggling preferred note
    const arr = [setNote1, setNote5, setNote10, setNote20, setNote50, setNote100, setNote500];

    // for showing preferred notes style
    const CurrencyNotes = ({ no, forArr }) => (
        <span style={{ backgroundColor: note === no && "#B9B9B9" }} onClick={() => {
            setNote(no);
            setIndexForArr(forArr);
        }}>{no}</span>
    );

    // for distribution of notes 
    const noteDistribute = (note, amount) => {
        for (let i = 1; i <= 200; i++) {
            if ((note * i) >= amount) {
                return (note * i) > amount ? i - 1 : i;
            }
        }
    };


    // for calculation and distribution of preferred notes and other notes
    const calcPreferredNotes = () => {
        const preferredNotes = noteDistribute(note, amount);
        const leftAmountAfterPrefNote = !preferredNotes ? amount - (note * 200) : amount - (preferredNotes * note);
        preferredNotes && arr[indexForArr](preferredNotes);
        preferredNotes === undefined && arr[indexForArr](200);
        let leftAmount = Math.floor(leftAmountAfterPrefNote);

        if (!leftAmountAfterPrefNote) return setAmount(leftAmount);
        const distributeLeftAmount = (currency, setFunc) => {
            if (note === currency) return;
            const notesLength = noteDistribute(currency, leftAmount);
            setFunc(notesLength);
            leftAmount = !notesLength ? leftAmount : leftAmount - (notesLength * currency);
            console.log(`amount left after ${currency} : ` + leftAmount);
        };

        distributeLeftAmount(500, setNote500);
        distributeLeftAmount(100, setNote100);
        distributeLeftAmount(50, setNote50);
        distributeLeftAmount(20, setNote20);
        distributeLeftAmount(10, setNote10);
        distributeLeftAmount(5, setNote5);
        distributeLeftAmount(1, setNote1);
        setAmount((leftAmount));
    };

    // for showing modal
    const showModal = (text) => {
        setModalText(text);
        setModal(true);
    };

    // for clearing fields
    const clearFields = () => {
        setNote500(0);
        setNote100(0);
        setNote50(0);
        setNote20(0);
        setNote10(0);
        setNote1(0);
        setNote5(0);
    };

    //onclick for show result's button
    const resultOnclick = () => {
        clearFields();
        if (!note) showModal("please select preferred currency note");
        else if (amount < note) showModal("please enter amount more than your preferred currency note");
        else if (amount < 100 || amount > 100000) showModal("please enter amount within Range from 100 to 100000");
        else calcPreferredNotes();
    };

    return (
        <>
            <Modal boolean={modal} setBoolean={setModal} text={modalText} />
            <div className="atm">
                <h1>ATM</h1>
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
                    placeholder="enter amount within 100 to 100000" />
                <div className="atm__preferred--notes">
                    <h3>select your preferred currency note</h3>
                    <div>
                        <CurrencyNotes no={1} forArr={0} />
                        <CurrencyNotes no={5} forArr={1} />
                        <CurrencyNotes no={10} forArr={2} />
                        <CurrencyNotes no={20} forArr={3} />
                        <CurrencyNotes no={50} forArr={4} />
                        <CurrencyNotes no={100} forArr={5} />
                        <CurrencyNotes no={500} forArr={6} />
                    </div>
                </div>
                <button onClick={resultOnclick}>Show Result</button>
                <div className="result">
                    <div>1: <span >{note1}</span></div>
                    <div>5: <span >{note5}</span></div>
                    <div>10: <span >{note10}</span></div>
                    <div>20: <span >{note20}</span></div>
                    <div>50: <span >{note50}</span></div>
                    <div>100: <span >{note100}</span></div>
                    <div>500: <span >{note500}</span></div>
                </div>
            </div>
        </>
    );
};


const Modal = ({ boolean, text, setBoolean }) => {
    if (!boolean) return null;

    return (
        <>
            <div className="overlay"></div>
            <div className="modal">
                <div>{text}</div>
                <button onClick={() => setBoolean(false)}>ok</button>
            </div>
        </>
    );
};