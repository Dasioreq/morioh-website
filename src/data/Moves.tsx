import type { Board } from "./Board";
import type { Piece } from "./Pieces";
import type { Position } from "./Position";
import { type RuleCallback } from "./Rules";

export type MoveCallback = (board: Board, movingPiece: Piece, position: Position) => boolean;

export class Move {
    static basicMove(board: Board, movingPiece: Piece, position: Position): boolean {
        board.lastPlayedMove = movingPiece.moveRules.find(function(rule: RuleCallback) { return rule(movingPiece, position, board) })

        let result = board.pieceAt(position);
        if(result)
            board.pieces = board.pieces.filter(function(piece) { return piece != result });

        movingPiece.hasMoved = true;
        movingPiece.position = position;

        return true;
    }

    static enPassant(board: Board, movingPiece: Piece, position: Position): boolean {
        board.lastPlayedMove = movingPiece.moveRules.find(function(rule: RuleCallback) { return rule(movingPiece, position, board) })

        let direction = movingPiece.isWhite
            ? 1
            : -1
        let result = board.pieceAt([position[0], position[1] - direction]);
        if(result)
            board.pieces = board.pieces.filter(function(piece) { return piece != result });

        movingPiece.hasMoved = true;
        movingPiece.position = position;

        return true;
    }
}