const cenario = document.querySelector('#cenario');
const jogo = {
    status: true,
    velocidade: 700,
    ponto: 0
};
const key = {
    now: 'D',
    pass: 'D'
};
const snake = {
    x: 3,
    y: 1,
    corpo: [
        {
            x: 2,
            y: 1
        },
        {
            x: 1,
            y: 1
        }
    ],
    mover(direcao) {
        const anterior = {
            x: this.x,
            y: this.y
        };
        switch (direcao) {
            case 'direita':
                this.x++;
                this.moverCorpo(anterior);                
                break;
            case 'baixo':
                this.y++;
                this.moverCorpo(anterior);
                break;
            case 'esquerda':
                this.x--;
                this.moverCorpo(anterior);
                break;
            case 'cima':
                this.y--;
                this.moverCorpo(anterior);
                break;
            default:
                break;
        }
    },
    moverCorpo(anterior) {
        const aux = {
            x: anterior.x,
            y: anterior.y
        };
        const aux2 = {
            x: 0,
            y: 0
        };
        this.corpo.forEach(x => {
            aux2.x = x.x;
            aux2.y = x.y;

            x.x = aux.x;
            x.y = aux.y;

            aux.x = aux2.x;
            aux.y = aux2.y;
        });
    }
};
const comida = {
    x: 0,
    y: 0,
    nascer() {
        this.x = Math.floor(Math.random() * 10 + 1);
        this.y = Math.floor(Math.random() * 10 + 1);
        // if (snake.x == this.x && snake.y == this.y || function() {
        //     snake.corpo.forEach(x => {
        //         if (x.x == this.x && x.y == this.y) {
        //             return true;
        //         }
        //     });
        // }) {
        //     this.nascer();
        // }
    }
}

function criarCenario() {
    for (let i = 0; i < 10; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < 10; j++) {
            const td = document.createElement('td');
            tr.appendChild(td);
        }
        cenario.appendChild(tr);
    }
    document.addEventListener('keypress', (event) => {
        key.pass = key.now == event.key.toUpperCase()
            ? key.pass
            : key.now;
        key.now = event.key.toUpperCase();
    });
    renderizaSnake();
}

function iniciarJogo() {
    const interval = setInterval(() => {
        if (!jogo.status) return clearInterval(interval);

        limparSnake();
        mover();
        comida.nascer();
        renderizaSnake();
    }, jogo.velocidade);
}

function renderizaSnake() {
    addBackground(snake.x, snake.y, 'blue');
    snake.corpo.forEach((x, i) => {        
        if (i == snake.corpo.length - 1) {
            addBackground(x.x, x.y, 'black');
        } else {
            addBackground(x.x, x.y, '#27ae60');
        }
    });
}

function addBackground(x, y, cor) {
    const td = cenario.querySelector(`tr:nth-child(${y}) td:nth-child(${x})`);
    if (td) {
        td.style.background = cor;
    }
}

function limparSnake() {
    addBackground(snake.x, snake.y, '#FFF');
    snake.corpo.forEach(x => {        
        addBackground(x.x, x.y, '#FFF');
    });
}

function mover() {
    if (key.now == 'D' && key.pass != 'A') {
        snake.mover('direita');
    } else if (key.now == 'S' && key.pass != 'W') {
        snake.mover('baixo');
    } else if (key.now == 'A' && key.pass != 'D') {
        snake.mover('esquerda');
    } else if (key.now == 'W' && key.pass != 'S') {
        snake.mover('cima');
    } else if (key.pass == 'D') {
        snake.mover('direita');
    } else if (key.pass == 'S') {
        snake.mover('baixo');
    } else if (key.pass == 'A') {
        snake.mover('esquerda');
    } else if (key.pass == 'W') {
        snake.mover('cima');
    }
    verificarColisao();
}

function verificarColisao() {
    if (snake.x > 10) {
        snake.x = 1;
    } else if (snake.y > 10) {
        snake.y = 1;
    } else if (snake.x < 1) {
        snake.x = 10;
    } else if (snake.y < 1) {
        snake.y = 10;
    }
}

function renderizaComida() {
    addBackground(comida.x, comida.y, 'red');
}
