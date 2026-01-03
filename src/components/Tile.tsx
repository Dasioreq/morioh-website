import { Board, deselectPiece, isPlayersTeam, selectedPieceId, selectPiece } from "../data/Board";
import type { Position } from "../data/Position";
import "./Tile.css";

interface Props {
    index: number,
    position: Position,
    board: Board,
    update: React.Dispatch<React.SetStateAction<Board>>
}

export function Tile({ index, position, board, update }: Props) {
    const tileHighlight = selectedPieceId > -1
        ? board.pieces[selectedPieceId].possibleMove(position, board)
            ? <img src = "/assets/tile_highlight.svg" className = "tileHighlight"></img>
            : undefined
        : undefined

    function movePiece() {
        const cloned = board.clone();
        const selectedPiece = cloned.pieces[selectedPieceId];

        if(!selectedPiece)
            return cloned;

        const move = selectedPiece.possibleMove(position, cloned);

        if(!move)
            return cloned;

        move(cloned, selectedPiece, position)
        deselectPiece();
        // switchTeam();

        return cloned;
    }

    const piece = board.pieceAt(position);
    const colorClass = index % 2
            ? "black"
            : "white";

    if(!piece) {
        return <div className = {`chessboardTile ${colorClass}`} onClick={() => { update(movePiece); }}>{tileHighlight}</div>;
    }
    else {
        const pieceIndex = board.indexAt(position);
        const defPiece = piece; // Required because Typescript still marks piece as possibly undefined... unless it's assigned? If it works - don't touch it

        const pieceHighlight = pieceIndex == selectedPieceId
            ? "highlight"
            : tileHighlight
                ? "highlight"
                : "";

        function onClick() {
            if(selectedPieceId != -1) {
                if(board.pieces[selectedPieceId].possibleMove(defPiece.position, board)) {
                    update(movePiece);
                    return;
                }
            }
            
            if(isPlayersTeam(defPiece)) {
                selectPiece(defPiece, pieceIndex);
                update(() => {return board.clone()});
            }
            else {
                update(movePiece);
            }
        }

        return <div className = {`chessboardTile ${colorClass} ${tileHighlight}`} onClick={onClick}>
            <img className = {`chessPiece ${pieceHighlight}`} src = {piece? piece.imgPath : ""}></img>
        </div>;
    }
}