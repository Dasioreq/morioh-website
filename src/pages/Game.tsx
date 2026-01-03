import { useState } from "react";
import { Chessboard } from "../components/Chessboard";
import { initialBoard } from "../data/Board"

export default function Game() {
    const [board, updateBoard] = useState(initialBoard);

    return <>
        <Chessboard board = {board} update = {updateBoard}/>
    </>
}