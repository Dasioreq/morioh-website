import type { Position } from "./Position";
import { Rule, type RuleCallback } from "./Rules";
import { Board } from "./Board";
import type { MoveCallback } from "./Moves";

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
    moveRules: RuleCallback[];
    hasMoved: boolean;

    constructor(type: PieceType, imgPath: string, position: Position, isWhite: boolean, moveRules: RuleCallback[], hasMoved = false) {
        this.pieceType = type;
        this.imgPath = imgPath;
        this.position = position;
        this.isWhite = isWhite;
        this.moveRules = moveRules;
        this.hasMoved = hasMoved;
    }

    public possibleMove(position: Position, board: Board): MoveCallback | undefined {
        let self = this;
        const result = this.moveRules.map(function(rule: RuleCallback) {
            return rule(self, position, board);
        }).filter(function( element ) { 
            return element !== undefined; 
        });

        if(result.length > 0)
            return result[0];
        else
            return undefined;
    }

    public clone() {
        return new Piece(
            this.pieceType,
            this.imgPath,
            this.position,
            this.isWhite,
            this.moveRules,
            this.hasMoved
        );
    }
}

export function pawn(position: Position, isWhite: boolean): Piece {
    return new Piece(PieceType.Pawn, `/assets/pieces/pawn_${isWhite? 1 : 0}.svg`, position, isWhite, [Rule.pawnMove, Rule.pawnDouble, Rule.pawnCapture, Rule.enPassant]);
}

export function rook(position: Position, isWhite: boolean): Piece {
    return new Piece(PieceType.Rook, `/assets/pieces/rook_${isWhite? 1 : 0}.svg`, position, isWhite, [Rule.verticalHorizontalMove]);
}

export function knight(position: Position, isWhite: boolean): Piece {
    return new Piece(PieceType.Knight, `/assets/pieces/knight_${isWhite? 1 : 0}.svg`, position, isWhite, [Rule.knightMove]);
}

export function bishop(position: Position, isWhite: boolean): Piece {
    return new Piece(PieceType.Bishop, `/assets/pieces/bishop_${isWhite? 1 : 0}.svg`, position, isWhite, [Rule.diagonalMove]);
}

export function queen(position: Position, isWhite: boolean): Piece {
    return new Piece(PieceType.Queen, `/assets/pieces/queen_${isWhite? 1 : 0}.svg`, position, isWhite, [Rule.verticalHorizontalMove, Rule.diagonalMove]);
}

export function king(position: Position, isWhite: boolean): Piece {
    return new Piece(PieceType.King, `/assets/pieces/king_${isWhite? 1 : 0}.svg`, position, isWhite, [Rule.kingMove]);
}