import { Piece, rook, knight, bishop, queen, king, pawn } from "./Pieces";
import { samePosition, type Position } from "./Position";

export class Board {
    pieces: Piece[] = [];

    constructor(pieces: Piece[]) {
        this.pieces = pieces;
    }

    public pieceAt(position: Position): Piece | undefined {
        for(let i = 0; i < this.pieces.length; i++) {
            if(samePosition(position, this.pieces[i].position)) {
                return this.pieces[i];
            }
        }
    }

    public indexAt(position: Position): number | undefined {
        for(let i = 0; i < this.pieces.length; i++) {
            if(samePosition(position, this.pieces[i].position)) {
                return i;
            }
        }
    }

    public playMove(pieceIndex: number, position: Position): boolean {
        console.log(pieceIndex, position);
        const movingPiece = this.pieces[pieceIndex];

        if(!movingPiece || !movingPiece.canMove(position, this)) 
            return false;

        let result = this.pieceAt(position);
        if(result)
            this.pieces = this.pieces.filter(function(piece) { return piece != result });

        movingPiece.hasMoved = true;
        movingPiece.position = position;

        console.log(this.pieces[pieceIndex].hasMoved);

        return true;
    }

    public clone() {
        return new Board (
            this.pieces.map((piece) => {return piece.clone()})
        )
    }
}

export const initialBoard = new Board([
    rook([0, 0], true),
    knight([1, 0], true),
    bishop([2, 0], true),
    queen([3, 0], true),
    king([4, 0], true),
    bishop([5, 0], true),
    knight([6, 0], true),
    rook([7, 0], true),
    pawn([0, 1], true),
    pawn([1, 1], true),
    pawn([2, 1], true),
    pawn([3, 1], true),
    pawn([4, 1], true),
    pawn([5, 1], true),
    pawn([6, 1], true),
    pawn([7, 1], true),

    pawn([0, 6], false),
    pawn([1, 6], false),
    pawn([2, 6], false),
    pawn([3, 6], false),
    pawn([4, 6], false),
    pawn([5, 6], false),
    pawn([6, 6], false),
    pawn([7, 6], false),
    rook([0, 7], false),
    knight([1, 7], false),
    bishop([2, 7], false),
    king([4, 7], false),
    queen([3, 7], false),
    bishop([5, 7], false),
    knight([6, 7], false),
    rook([7, 7], false),
]);

export var selectedPieceId = -1;
export var isPlayerWhite = true;

export function selectPiece(piece?: Piece, pieceId?: number) {
    if(piece && typeof pieceId !== 'undefined') {
        if(selectedPieceId == pieceId)
            return;

        if(piece.isWhite == isPlayerWhite) {
            selectedPieceId = pieceId;
        }
    }
}

export function deselectPiece() {
    selectedPieceId = -1;
}

export function isPlayersTeam(piece: Piece) {
    return piece.isWhite == isPlayerWhite;
}