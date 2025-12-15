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
    const piece = board.pieceAt(position);
    const pieceIndex = board.indexAt(position);

    const colorClass = index % 2
        ? "black"
        : "white";

    const tileHighlight = selectedPieceId > -1
        ? board.pieces[selectedPieceId].canMove(position, board)
            ? <img src = "src/assets/tile_highlight.svg" className = "tileHighlight"></img>
            : undefined
        : undefined

    if(!piece) {
        return <div className = {`chessboardTile ${colorClass}`} onClick={() => {
            update(() => {
                const cloned = board.clone();
                if(cloned.playMove(selectedPieceId, position)) 
                    deselectPiece();
                return cloned;
            });
        }}>{tileHighlight}</div>;
    }
    else if(piece !== undefined) {

        let pieceHighlight = pieceIndex == selectedPieceId
            ? "highlight"
            : tileHighlight
                ? "highlight"
                : "";

        let defPiece = piece;
        function onClick() {
            if(isPlayersTeam(defPiece)) {
                selectPiece(defPiece, pieceIndex);
                update(() => {return board.clone()});
            }
            else {
                update(() => {
                    const cloned = board.clone();
                    if(cloned.playMove(selectedPieceId, position)) 
                        deselectPiece();
                    return cloned;
                });
            }
        }

        return <div className = {`chessboardTile ${colorClass} ${tileHighlight}`} onClick={onClick}>
            <img className = {`chessPiece ${pieceHighlight}`} src = {piece? piece.imgPath : ""}></img>
        </div>;
    }
}