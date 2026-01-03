import type { Board } from "./Board";
import { Move, type MoveCallback } from "./Moves";
import { PieceType, type Piece } from "./Pieces";
import type { Position } from "./Position"

export type RuleCallback = (self: Piece, newPos: Position, board: Board) => MoveCallback | undefined;

export class Rule {
    static verticalHorizontalMove(self: Piece, [xNew, yNew]: Position, board: Board): MoveCallback | undefined {
        const [xPos, yPos] = self.position;

        if(xPos == xNew && yPos == yNew)
            return undefined;

        if(board.pieceAt([xNew, yNew])?.isWhite == self.isWhite) {
            return undefined;
        }

        if(xNew == xPos) {
            let direction: number = yNew > yPos
                ? -1
                : 1;

            for(let y = yNew + direction; y != yPos; y += direction) {
                if(board.pieceAt([xPos, y]))
                    return undefined;
            }
            return Move.basicMove;
        }

        if(yNew == yPos) {
            let direction: number = xNew > xPos
                ? -1
                : 1;

            for(let x = xNew + direction; x != xPos; x += direction) {
                if(board.pieceAt([x, yPos]))
                {
                    return undefined;
                }
            }
            return Move.basicMove;
        }

        return undefined;
    }

    static pawnMove(self: Piece, [xNew, yNew]: Position, board: Board): MoveCallback | undefined {
        const [xPos, yPos] = self.position;

        if(xPos == xNew && yPos == yNew)
            return undefined;

        if(board.pieceAt([xNew, yNew]))
            return undefined;

        const direction = self.isWhite
            ? 1
            : -1;

        if(xNew != xPos)
            return undefined;

        if(yPos + direction != yNew)
            return undefined;

        return Move.basicMove;
    }

    static pawnDouble(self: Piece, [xNew, yNew]: Position, board: Board): MoveCallback | undefined {
        const [xPos, yPos] = self.position;

        if(xPos == xNew && yPos == yNew)
            return undefined;

        if(board.pieceAt([xNew, yNew]))
            return undefined;

        const direction = self.isWhite
            ? 1
            : -1;

        if(board.pieceAt([xNew, yNew - direction]))
            return undefined;

        if(self.hasMoved)
            return undefined;

        if(xNew != xPos)
            return undefined;

        if(yPos + direction != yNew && yPos + 2 * direction != yNew)
            return undefined;

        return Move.basicMove;
    }

    static pawnCapture(self: Piece, [xNew, yNew]: Position, board: Board): MoveCallback | undefined {
        const [xPos, yPos] = self.position;

        if(self.isWhite) {
            if(yNew <= yPos)
                return undefined;
        }
        else {
            if(yNew >= yPos)
                return undefined;
        }

        if(xNew == xPos || yNew == yPos)
            return undefined;

        if(!board.pieceAt([xNew, yNew]))
            return undefined;

        if(board.pieceAt([xNew, yNew])?.isWhite == self.isWhite)
            return undefined;

        const dxAbs = Math.abs(xNew - xPos);
        const dyAbs = Math.abs(yNew - yPos);

        if(dxAbs + dyAbs != 2)
            return undefined;

        return Move.basicMove;
    }

    static enPassant(self: Piece, [xNew, yNew]: Position, board: Board): MoveCallback | undefined {
        const [xPos, yPos] = self.position;

        if(xNew == xPos || yNew == yPos) 
            return undefined;

        if(board.lastPlayedMove != Rule.pawnDouble)
            return undefined;

        let direction = self.isWhite
            ? 1
            : -1

        const dxAbs = Math.abs(xNew - xPos);
        const dyAbs = Math.abs(yNew - yPos);

        if(dxAbs + dyAbs != 2)
            return undefined;

        const piece = board.pieceAt([xNew, yNew - direction]);

        if(!piece)
            return undefined;

        if(piece?.pieceType != PieceType.Pawn)
            return undefined;

        if(piece?.isWhite == self.isWhite)
            return undefined;

        return Move.enPassant;
    }

    static knightMove(self: Piece, [xNew, yNew]: Position, board: Board): MoveCallback | undefined {
        const [xPos, yPos] = self.position;

        if(xNew == xPos || yNew == yPos) 
            return undefined;

        if(board.pieceAt([xNew, yNew])?.isWhite == self.isWhite)
            return undefined;

        const dxAbs = Math.abs(xNew - xPos);
        const dyAbs = Math.abs(yNew - yPos);

        if(dxAbs + dyAbs == 3)
            return Move.basicMove;

        return undefined;
    }

    static diagonalMove(self: Piece, [xNew, yNew]: Position, board: Board): MoveCallback | undefined {
        const [xPos, yPos] = self.position;

        if(xNew == xPos && yNew == yPos)
            return undefined;

        if(board.pieceAt([xNew, yNew])?.isWhite == self.isWhite)
            return undefined;

        const dxAbs = Math.abs(xNew - xPos);
        const dyAbs = Math.abs(yNew - yPos);

        if(dyAbs != dxAbs && dyAbs != -dxAbs)
            return undefined;

        const xDir = xNew > xPos
            ? -1
            : 1

        const yDir = yNew > yPos
            ? -1
            : 1

        for(let x = xNew + xDir; x != xPos; x += xDir) {
            for(let y = yNew + yDir; y != yPos; y += yDir) {
                const xAbs = Math.abs(x - xPos);
                const yAbs = Math.abs(y - yPos);

                if(yAbs == xAbs || yAbs == -xAbs) {
                    if(board.pieceAt([x, y]))
                        return undefined;
                }
            }
        }

        return Move.basicMove;
    }

    static kingMove(self: Piece, [xNew, yNew]: Position, board: Board): MoveCallback | undefined {
        const [xPos, yPos] = self.position;

        if(xNew == xPos && yNew == yPos)
            return undefined;

        if(board.pieceAt([xNew, yNew])?.isWhite == self.isWhite)
            return undefined;

        const dxAbs = Math.abs(xNew - xPos);
        const dyAbs = Math.abs(yNew - yPos);

        if(dxAbs > 1 || dyAbs > 1)
            return undefined;

        return Move.basicMove;
    }

    static castle(self: Piece, [xNew, yNew]: Position, board: Board): MoveCallback | undefined {
        if(self.hasMoved)
            return undefined;

        const [xPos, yPos] = self.position;

        if(yNew != yPos)
            return undefined;

        if(xNew == xPos)
            return undefined;

        const dxAbs = Math.abs(xNew - xPos);

        if(dxAbs != 2)
            return undefined;

        const piece = board.pieceAt([xNew, yNew]);
        if(piece)
            return undefined;

        const direction = xNew > xPos
            ? 1
            : -1;

        let hasRook = false;
        for(let xi = xPos + direction; xi < 8 && xi >= 0; xi += direction) {
            let piece = board.pieceAt([xi, yPos]);

            if(!piece)
                continue;

            if(piece.pieceType != PieceType.Rook)
                break;

            if(piece.isWhite != self.isWhite || piece.hasMoved)
                continue;

            hasRook = true;
            break;
        }
        if(!hasRook)
            return undefined;

        return Move.castle;
    }
}