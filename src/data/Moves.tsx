import type { Board } from "./Board";
import { PieceType, type Piece } from "./Pieces";
import type { Position } from "./Position"

export type MoveCallback = (self: Piece, newPos: Position, board: Board) => boolean;

export function verticalHorizontalMove(self: Piece, [xNew, yNew]: Position, board: Board): boolean {
    const [xPos, yPos] = self.position;

    if(xPos == xNew && yPos == yNew)
        return false;

    if(board.pieceAt([xNew, yNew])?.isWhite == self.isWhite) {
        return false;
    }

    if(xNew == xPos) {
        let direction: number = yNew > yPos
            ? -1
            : 1;

        for(let y = yNew + direction; y != yPos; y += direction) {
            if(board.pieceAt([xPos, y]))
                return false;
        }
        return true;
    }

    if(yNew == yPos) {
        let direction: number = xNew > xPos
            ? -1
            : 1;

        for(let x = xNew + direction; x != xPos; x += direction) {
            if(board.pieceAt([x, yPos]))
            {
                console.log("AAA");
                return false;
            }
        }
        return true;
    }

    return false;
}

export function pawnMove(self: Piece, [xNew, yNew]: Position, board: Board): boolean {
    const [xPos, yPos] = self.position;

    if(xPos == xNew && yPos == yNew)
        return false;

    if(board.pieceAt([xNew, yNew]))
        return false;

    const direction = self.isWhite
        ? 1
        : -1;

    if(xNew != xPos)
        return false;

    if(yPos + direction != yNew)
        return false;

    return true;
}

export function pawnDouble(self: Piece, [xNew, yNew]: Position, board: Board): boolean {
    const [xPos, yPos] = self.position;

    if(xPos == xNew && yPos == yNew)
        return false;

    if(board.pieceAt([xNew, yNew]))
        return false;

    const direction = self.isWhite
        ? 1
        : -1;

    if(self.hasMoved)
        return false;

    if(xNew != xPos)
        return false;

    if(yPos + direction != yNew && yPos + 2 * direction != yNew)
        return false;

    return true;
}

export function pawnCapture(self: Piece, [xNew, yNew]: Position, board: Board) {
    const [xPos, yPos] = self.position;

    if(yNew <= yPos)
        return false;

    if(xNew == xPos || yNew == yPos)
        return false;

    if(!board.pieceAt([xNew, yNew]))
        return false;

    if(board.pieceAt([xNew, yNew])?.isWhite == self.isWhite)
        return false;

    const xNewAbs = Math.abs(xNew - xPos);
    const yNewAbs = Math.abs(yNew - yPos);

    if(xNewAbs + yNewAbs != 2)
        return false;

    return true;
}

export function enPassant(self: Piece, [xNew, yNew]: Position, board: Board): boolean {
    console.log(board.lastPlayedMove);
    const [xPos, yPos] = self.position;

    if(xNew == xPos || yNew == yPos) 
        return false;

    if(board.lastPlayedMove != pawnDouble)
        return false;

    let direction = self.isWhite
        ? 1
        : -1

    const xNewAbs = Math.abs(xNew - xPos);
    const yNewAbs = Math.abs(yNew - yPos);

    if(xNewAbs + yNewAbs != 2)
        return false;

    const piece = board.pieceAt([xNew, yNew - direction]);

    if(!piece)
        return false;

    if(piece?.pieceType != PieceType.Pawn)
        return false;

    if(piece?.isWhite == self.isWhite)
        return false;

    return true;
}

export function knightMove(self: Piece, [xNew, yNew]: Position, board: Board): boolean {
    const [xPos, yPos] = self.position;

    if(xNew == xPos || yNew == yPos) 
        return false;

    if(board.pieceAt([xNew, yNew])?.isWhite == self.isWhite)
        return false;

    const xNewAbs = Math.abs(xNew - xPos);
    const yNewAbs = Math.abs(yNew - yPos);

    if(xNewAbs + yNewAbs == 3)
        return true;

    return false;
}

export function diagonalMove(self: Piece, [xNew, yNew]: Position, board: Board): boolean {
    const [xPos, yPos] = self.position;

    if(xNew == xPos && yNew == yPos)
        return false;

    if(board.pieceAt([xNew, yNew])?.isWhite == self.isWhite)
        return false;

    const xNewAbs = Math.abs(xNew - xPos);
    const yNewAbs = Math.abs(yNew - yPos);

    if(yNewAbs != xNewAbs && yNewAbs != -xNewAbs)
        return false;

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
                    return false;
            }
        }
    }

    return true;
}