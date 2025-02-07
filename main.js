const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const size = 4;
const tileSize = 100; // 타일 크기 유지
const boardSize = tileSize * size; // 400x400
const offsetX = (canvas.width - boardSize) / 2;
const offsetY = (canvas.height - boardSize) / 2;

let board = Array.from({ length: size }, () => Array(size).fill(0));

function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 보드 배경
    ctx.fillStyle = "#bbada0";
    ctx.fillRect(offsetX, offsetY, boardSize, boardSize);

    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            drawTile(r, c, board[r][c]);
        }
    }
}
function getTileColor(value) {
    switch (value) {
        case 2: return "#eee4da";
        case 4: return "#ede0c8";
        case 8: return "#f2b179";
        case 16: return "#f59563";
        case 32: return "#f67c5f";
        case 64: return "#f65e3b";
        case 128: return "#edcf72";
        case 256: return "#edcc61";
        case 512: return "#edc850";
        case 1024: return "#edc53f";
        case 2048: return "#edc22e";
        case 4096: return "#3c3a32";
        case 8192: return "#3c3a32";
        case 16384: return "#3c3a32";
        case 32768: return "#3c3a32";
        case 65536: return "#3c3a32";
        default: return "#cdc1b4";
    }
}
function getPrimenumber(value) {
    switch (value) {
        case 2: return 2;
        case 4: return 3;
        case 8: return 5;
        case 16: return 7;
        case 32: return 11;
        case 64: return 13;
        case 128: return 17;
        case 256: return 19;
        case 512: return 23;
        case 1024: return 29;
        case 2048: return 31;
        case 4096: return 37;
        case 8192: return 41;
        case 16384: return 43;
        case 32768: return 47;
        case 65536: return 53;
        default: return 59;
    }
}
function drawTile(row, col, value) {
    const x = offsetX + col * tileSize;
    const y = offsetY + row * tileSize;

    ctx.fillStyle = getTileColor(value);
    ctx.fillRect(x, y, tileSize, tileSize);
    ctx.strokeStyle = "#bbada0";
    ctx.strokeRect(x, y, tileSize, tileSize);

    if (value) {
        ctx.fillStyle = value > 4 ? "#f9f6f2" : "#776e65";
        ctx.font = "bold 30px Arial";
        ctx.textAlign = "center";
        ctx.fillText(getPrimenumber(value), x + tileSize / 2, y + tileSize / 2 + 10);
    }
}


canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);

let startX, startY;
function onMouseDown(event) {
    startX = event.clientX;
    startY = event.clientY;
}

function onMouseUp(event) {
    let dx = event.clientX - startX;
    let dy = event.clientY - startY;

    if (dx * dx > dy * dy) {
        if (dx > 0) move("right");
        else move("left");
    } else {
        if (dy > 0) move("down");
        else move("up");
    }
}

function checkGameOver() {
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if (board[r][c] === 0) return false; // 빈 공간이 있으면 아직 게임 진행 가능
            if (c < size - 1 && board[r][c] === board[r][c + 1]) return false; // 오른쪽과 합칠 수 있음
            if (r < size - 1 && board[r][c] === board[r + 1][c]) return false; // 아래와 합칠 수 있음
        }
    }
    return true; // 이동할 곳이 없으면 게임 오버
}

function checkWin() {
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if (board[r][c] === 2048) {
                setTimeout(() => alert("Congratulations!"), 100);
                return;
            }
        }
    }
}

function move(direction) {
    let moved = false;

    if (direction === "left") {
        for (let r = 0; r < size; r++) {
            let newRow = board[r].filter(v => v);
            for (let i = 0; i < newRow.length - 1; i++) {
                if (newRow[i] === newRow[i + 1]) {
                    newRow[i] *= 2;
                    newRow.splice(i + 1, 1);
                }
            }
            while (newRow.length < size) newRow.push(0);
            if (board[r].join() !== newRow.join()) moved = true;
            board[r] = newRow;
        }
    }
    if (direction === "right") {
        for (let r = 0; r < size; r++) {
            let newRow = board[r].filter(v => v);
            for (let i = newRow.length - 1; i > 0; i--) {
                if (newRow[i] === newRow[i - 1]) {
                    newRow[i] *= 2;
                    newRow.splice(i - 1, 1);
                }
            }
            while (newRow.length < size) newRow.unshift(0);
            if (board[r].join() !== newRow.join()) moved = true;
            board[r] = newRow;
        }
    }
    if (direction === "up") {
        for (let c = 0; c < size; c++) {
            let newCol = board.map(row => row[c]).filter(v => v);
            for (let i = 0; i < newCol.length - 1; i++) {
                if (newCol[i] === newCol[i + 1]) {
                    newCol[i] *= 2;
                    newCol.splice(i + 1, 1);
                }
            }
            while (newCol.length < size) newCol.push(0);
            for (let r = 0; r < size; r++) {
                if (board[r][c] !== newCol[r]) moved = true;
                board[r][c] = newCol[r];
            }
        }
    }
    if (direction === "down") {
        for (let c = 0; c < size; c++) {
            let newCol = board.map(row => row[c]).filter(v => v);
            for (let i = newCol.length - 1; i > 0; i--) {
                if (newCol[i] === newCol[i - 1]) {
                    newCol[i] *= 2;
                    newCol.splice(i - 1, 1);
                }
            }
            while (newCol.length < size) newCol.unshift(0);
            for (let r = 0; r < size; r++) {
                if (board[r][c] !== newCol[r]) moved = true;
                board[r][c] = newCol[r];
            }
        }
    }

    if (moved) {
        addRandomTile();
        drawBoard();
        checkWin();
        if (checkGameOver()) {
            setTimeout(() => alert("Game Over!"), 100);
        }
    }
}


function addRandomTile() {
    let emptyCells = [];
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if (board[r][c] === 0) emptyCells.push({ r, c });
        }
    }
    if (emptyCells.length > 0) {
        let { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[r][c] = Math.random() < 0.9 ? 2 : 4;
    }
}

addRandomTile();
addRandomTile();
drawBoard();
