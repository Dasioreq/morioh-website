import type { Position } from "./Position";
import { Move, type MoveCallback } from "./Moves";
import { Board } from "./Board";

export const PieceType =  {
    Pawn: 0,
    Rook: 1,
    Knight: 2,
    Bishop: 3,
    Queen: 4,
    King: 5
}

export type PieceType = (typeof PieceType)[keyof typeof PieceType]

export class Piece {
    pieceType: PieceType;
    imgPath: string;
    position: Position;
    isWhite: boolean;
    possibleMoves: MoveCallback[];
    hasMoved: boolean;

    constructor(type: PieceType, imgPath: string, position: Position, isWhite: boolean, possibleMoves: MoveCallback[], hasMoved = false) {
        this.pieceType = type;
        this.imgPath = imgPath;
        this.position = position;
        this.isWhite = isWhite;
        this.possibleMoves = possibleMoves;
        this.hasMoved = hasMoved;
    }

    public canMove(position: Position, board: Board) {
        let self = this;
        return this.possibleMoves.some(function(rule: MoveCallback) { return rule(self, position, board); });
    }

    public clone() {
        return new Piece(
            this.pieceType,
            this.imgPath,
            this.position,
            this.isWhite,
            this.possibleMoves,
            this.hasMoved
        );
    }
}

export function pawn(position: Position, isWhite: boolean): Piece {
    return new Piece(PieceType.Pawn, `/src/assets/pieces/pawn_${isWhite? 1 : 0}.svg`, position, isWhite, [Move.pawnMove, Move.pawnDouble, Move.pawnCapture, Move.enPassant]);
}

export function rook(position: Position, isWhite: boolean): Piece {
    return new Piece(PieceType.Rook, `/src/assets/pieces/rook_${isWhite? 1 : 0}.svg`, position, isWhite, [Move.verticalHorizontalMove]);
}

export function knight(position: Position, isWhite: boolean): Piece {
    return new Piece(PieceType.Knight, `/src/assets/pieces/knight_${isWhite? 1 : 0}.svg`, position, isWhite, [Move.knightMove]);
}

export function bishop(position: Position, isWhite: boolean): Piece {
    return new Piece(PieceType.Bishop, `/src/assets/pieces/bishop_${isWhite? 1 : 0}.svg`, position, isWhite, [Move.diagonalMove]);
}

export function queen(position: Position, isWhite: boolean): Piece {
    return new Piece(PieceType.Queen, `/src/assets/pieces/queen_${isWhite? 1 : 0}.svg`, position, isWhite, [Move.verticalHorizontalMove, Move.diagonalMove]);
}

export function king(position: Position, isWhite: boolean): Piece {
    return new Piece(PieceType.King, `/src/assets/pieces/king_${isWhite? 1 : 0}.svg`, position, isWhite, [Move.verticalHorizontalMove]);
}