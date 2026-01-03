import { Board } from "../data/Board";
import { Tile } from "./Tile";
import { HorizontalStack, VerticalStack } from "./Stacking";

type Props = {
    board: Board,
    update: React.Dispatch<React.SetStateAction<Board>>,
    style?: React.CSSProperties
};

export function Chessboard({ board, update, style }: Props) {
    let boardTiles = []
    for(let y = 7; y >= 0; y--) {
        let boardRow = []
        for(let x = 0; x < 8; x++) {
            boardRow.push(<Tile key = {x} index = {x + y + 1} position = {[x, y]} board = {board} update = {update}></Tile>)
        }
        boardTiles.push(<HorizontalStack key = {y}>{boardRow}</HorizontalStack>)
    }

    return <VerticalStack style={style}>{boardTiles}</VerticalStack>;
}