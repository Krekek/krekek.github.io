let tiles = [];
let freeCell = {y: 3, x: 3};
let shuffled = false;

function createCellNull () {
    let cell = document.createElement("div"); 
    cell.classList.add("field-cell", "field-cell-null");
    return cell;
}
function setCellOffset (cell) {
        cell.style.left = (15 +(15 + 81.25) * cell.x) + "px";
        cell.style.top = (15 +(15 + 81.25) * cell.y) + "px";   
}
function appendCell (cell) {
    let pole = document.getElementById("pole");
    pole.append(cell);
}
function createField(){
    for (let y = 0; y < 4; y++){
        for (let x = 0; x < 4; x++){
            let cell = createCellNull();
            cell.y = y;
            cell.x = x;
            setCellOffset(cell);
            appendCell(cell);
        }
    }
}

function createCellTiles() {
    let cell = document.createElement("div");
    cell.classList.add("field-cell", "field-cell-tile");
    return cell;
}

function createTiles () {
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            let n = y * 4 + x + 1;
            if (n < 16) {
                let cell = createCellTiles();
                cell.y = y;
                cell.x = x;
                cell.innerHTML = n;
                setCellOffset(cell);
                appendCell(cell);
                tiles.push(cell);
            }
        }
    }
}

function between (a, b, t) {
    return a <= t && t <= b || b <= t && t <= a;
}

function tileClick (event) {
    let bar = event.target;
    let oldX = bar.x;
    let oldY = bar.y;
    let tile;
    if (bar.y == freeCell.y) {
        for (let i = 0; i < tiles.length; i++){
            tile = tiles[i];
            if (tile.y == bar.y && between(bar.x, freeCell.x, tile.x)){
                if (bar.x < freeCell.x) tile.x++;
                else tile.x--;
                setCellOffset(tile);
            }
        }
        freeCell = {y: oldY, x: oldX};
    } else if (bar.x == freeCell.x) {
        for (let i = 0; i < tiles.length; i++){
            tile = tiles[i];
            if (tile.x == bar.x && between(bar.y, freeCell.y, tile.y)){
                if (bar.y < freeCell.y) tile.y++;
                else tile.y--;
                setCellOffset(tile);
            }
        }
        freeCell = {y: oldY, x: oldX};
    }
    if (shuffled) {
        checkVictory();
    }
}
function animateTiles(){
    for (let i = 0; i < tiles.length; i++){
        tiles[i].addEventListener("click", tileClick);
    }
}

function shuffleTiles(){
    for (let i = 0; i < 1000; i ++) {
        let index = Math.floor(Math.random() * tiles.length);
        tiles[index].click();
    }
    shuffled = true;
}

function checkVictory(){
    for (let i = 0; tiles.length; i++){
        let n = tiles[i].y * 4 + tiles[i].x + 1;
        if (tiles[i].innerHTML != n) return;
    }
    document.getElementById("modal").classList.add("modal-visible");
}


createField();
createTiles();
animateTiles();
shuffleTiles();