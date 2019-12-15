const cenario = document.querySelector('#cenario');
const jogo = {
    status: true,
    velocidade: 1000,
    ponto: 0
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

function criarCenario() {
    for (let i = 0; i < 10; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < 10; j++) {
            const td = document.createElement('td');
            tr.appendChild(td);
        }
        cenario.appendChild(tr);
    }
}

function iniciarJogo() {
    const interval = setInterval(() => {
        if (!jogo.status) clearInterval(interval);


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
    cenario.querySelector(`tr:nth-child(${y}) td:nth-child(${x})`).style.background = cor;
}

function limparSnake() {
    addBackground(snake.x, snake.y, '#FFF');
    snake.corpo.forEach(x => {        
        addBackground(x.x, x.y, '#FFF');
    });
}