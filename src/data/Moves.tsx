import type { Board } from "./Board";
import { PieceType, type Piece } from "./Pieces";
import type { Position } from "./Position";
import { type RuleCallback } from "./Rules";

export type MoveCallback = (board: Board, movingPiece: Piece, position: Position) => boolean;

export class Move {
    static basicMove(board: Board, movingPiece: Piece, position: Position): boolean {
        board.lastPlayedMove = movingPiece.moveRules.find(function(rule: RuleCallback) { return rule(movingPiece, position, board) })

        let capture = board.pieceAt(position);
        if(capture)
            board.pieces = board.pieces.filter(function(piece) { return piece != capture });

        movingPiece.hasMoved = true;
        movingPiece.position = position;

        return true;
    }

    static enPassant(board: Board, movingPiece: Piece, position: Position): boolean {
        board.lastPlayedMove = movingPiece.moveRules.find(function(rule: RuleCallback) { return rule(movingPiece, position, board) })

        let direction = movingPiece.isWhite
            ? 1
            : -1
        let capture = board.pieceAt([position[0], position[1] - direction]);
        if(capture)
            board.pieces = board.pieces.filter(function(piece) { return piece != capture });

        movingPiece.hasMoved = true;
        movingPiece.position = position;

        return true;
    }

    static castle(board: Board, movingPiece: Piece, position: Position): boolean {
        board.lastPlayedMove = movingPiece.moveRules.find(function(rule: RuleCallback) { return rule(movingPiece, position, board) })

        let direction = position[0] > movingPiece.position[0]
            ? 1
            : -1
        let rook: Piece | undefined = undefined;
        for(let xi = position[0] + direction; xi < 8 && xi >= 0; xi += direction) {
            let piece = board.pieceAt([xi, position[1]]);
            if(!piece)
                continue;
            if(piece.isWhite != movingPiece.isWhite || piece.hasMoved || piece.pieceType != PieceType.Rook)
                continue;
            rook = piece;
            break;
        }
        if(rook)
            rook.position = [position[0] - direction, position[1]];

        movingPiece.hasMoved = true;
        movingPiece.position = position;

        return true;
    }
}