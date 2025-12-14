export type Position = [x: number, y: number];

export function samePosition(pos1: Position, pos2: Position): boolean {
    return pos1[0] == pos2[0] && pos1[1] == pos2[1];
}