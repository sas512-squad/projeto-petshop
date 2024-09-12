// ----------------------------------- CARRINHO DE COMPRAS 
let cart = [];
let modalQt = 0;
let key = 0;
//constante para carregar estrutura, limpando o código
const c = (el) => document.querySelector(el); //para localizar o primeiro item
const cs = (el) => document.querySelectorAll(el); //para localizar todos os itens

//Mapear os dados recebidos via Json
//Criando a lista de produtos, modelos
modelsJson.map((item, index) => {
    let modelsItem = c('.models .models-item').cloneNode(true);
    modelsItem.setAttribute('data-key', index);
    modelsItem.querySelector('.models-item--img img').src = item.img;
    modelsItem.querySelector('.models-item--price').innerHTML = `R$ ${item.price[0].toFixed(2)}`;
    modelsItem.querySelector('.models-item--name').innerHTML = item.name;
    modelsItem.querySelector('.models-item--desc').innerHTML = item.description;
    modelsItem.querySelector('#btn-buy').addEventListener('click', (e) => {
        e.preventDefault();
        key = e.target.closest('.models-item').getAttribute('data-key');
        modalQt = 1;
        c('.modelsBig img').src = modelsJson[key].img;
        c('.modelsInfo h1').innerHTML = modelsJson[key].name;
        c('.modelsInfo--desc').innerHTML = modelsJson[key].description;
        c('.modelsInfo--size.selected').classList.remove('selected');
        cs('.modelsInfo--size').forEach((size, sizeIndex) => {
            if (sizeIndex == 2) {
                size.classList.add('selected');
                c('.modelsInfo--actualPrice').innerHTML = `R$ ${modelsJson[key].price[sizeIndex].toFixed(2)}`;
            }
            size.querySelector('span').innerHTML = modelsJson[key].sizes[sizeIndex];
        });
        c('.modelsInfo--qt').innerHTML = modalQt;
        c('.modelsWindowArea').style.opacity = 0;
        c('.modelsWindowArea').style.display = 'flex';
        setTimeout(() => {
            c('.modelsWindowArea').style.opacity = 1;
        }, 200);
    });
    c('.models-area').append(modelsItem);
});

//Ações do Modal - janela
function closeModal() {
    c('.modelsWindowArea').style.opacity = 0;
    setTimeout(() => {
        c('.modelsWindowArea').style.display = 'none';
    }, 500);
}

cs('.modelsInfo--cancelButton, .modelsInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});

c('.modelsInfo--qtmenos').addEventListener('click', () => {
    if (modalQt > 1) {
        modalQt--;
        c('.modelsInfo--qt').innerHTML = modalQt;
    }
});

c('.modelsInfo--qtmais').addEventListener('click', () => {
    modalQt++;
    c('.modelsInfo--qt').innerHTML = modalQt;
});

cs('.modelsInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', (e) => {
        c('.modelsInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
        c('.modelsInfo--actualPrice').innerHTML = `R$ ${modelsJson[key].price[sizeIndex].toFixed(2)}`;
    });
});

let isFirstClick = true;

c('.modelsInfo--addButton').addEventListener('click', () => {
    let size = parseInt(c('.modelsInfo--size.selected').getAttribute('data-key'));
    let identifier = modelsJson[key].id + '@' + size;
    let locaId = cart.findIndex((item) => item.identifier == identifier);

    if (locaId > -1) {
        cart[locaId].qt += modalQt;
    } else {
        cart.push({
            identifier,
            id: modelsJson[key].id,
            size,
            qt: modalQt
        });
    }

    // Verifica se o clique é o primeiro e se a largura da tela é maior que 768px
    if (isFirstClick && window.innerWidth > 768) {
        c('aside').style.left = '50vw';
        c('aside').style.width = '50vw';
        isFirstClick = false;
    }

    c('.menu-openner span').classList.add('custom-contador');
    updateCart();
    closeModal();
});



// Fechar o modal de produto ao clicar fora dele
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modelsWindowArea')) {
        closeModal();
    }
});

//ajustando o mobile
c('.menu-openner').addEventListener('click', () => {
    if (cart.length > 0) {
        c('aside').classList.add('show');
        
        // Verifica se a largura da tela é maior que 768px
        if (window.innerWidth < 768) {
            c('aside').style.left = '0vw';
        } else if (window.innerWidth > 768) {
            c('aside').style.left = '50vw';
        }
    }
});

c('.menu-closer').addEventListener('click', () => {
    c('aside').style.left = '100vw';
});

function updateCart() {
    c('.menu-openner span').innerHTML = cart.length;
    if (cart.length > 0) {
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';
        let subtotal = 0;
        let desconto = 0;
        let total = 0;
        cart.map((itemCart, index) => {
            let modelItem = modelsJson.find((itemBD) => itemBD.id == itemCart.id);
            subtotal += modelItem.price[itemCart.size] * itemCart.qt;
            let cartItem = c('.models .cart--item').cloneNode(true);
            let modelSizeName;
            switch (itemCart.size) {
                case 0:
                    modelSizeName = 'P';
                    break;
                case 1:
                    modelSizeName = 'M';
                    break;
                case 2:
                    modelSizeName = 'G';
            }
            cartItem.querySelector('img').src = modelItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = `${modelItem.name} (${modelSizeName})`;
            cartItem.querySelector('.cart--item--qt').innerHTML = itemCart.qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if (itemCart.qt > 1) {
                    itemCart.qt--;
                } else {
                    cart.splice(index, 1);
                }
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                itemCart.qt++;
                updateCart();
            });
            c('.cart').append(cartItem);
        });
        desconto = subtotal * 0.0;
        total = subtotal - desconto;
        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;
    } else {
        c('aside').classList.remove('show');
    }
}

// ----------------------------------- FILTRO DE PRODUTOS
function renderProducts(products) {
    let modelsArea = c('.models-area');
    modelsArea.innerHTML = '';
    products.map((item, index) => {
        let modelsItem = c('.models .models-item').cloneNode(true);
        modelsItem.setAttribute('data-key', index);
        modelsItem.querySelector('.models-item--img img').src = item.img;
        modelsItem.querySelector('.models-item--price').innerHTML = `R$ ${item.price[0].toFixed(2)}`;
        modelsItem.querySelector('.models-item--name').innerHTML = item.name;
        modelsItem.querySelector('.models-item--desc').innerHTML = item.description;
        modelsItem.querySelector('#btn-buy').addEventListener('click', (e) => {
            e.preventDefault();
            key = index;
            modalQt = 1;
            c('.modelsBig img').src = item.img;
            c('.modelsInfo h1').innerHTML = item.name;
            c('.modelsInfo--desc').innerHTML = item.description;
            c('.modelsInfo--size.selected').classList.remove('selected');
            cs('.modelsInfo--size').forEach((size, sizeIndex) => {
                if (sizeIndex === 2) {
                    size.classList.add('selected');
                    c('.modelsInfo--actualPrice').innerHTML = `R$ ${item.price[sizeIndex].toFixed(2)}`;
                }
                size.querySelector('span').innerHTML = item.sizes[sizeIndex];
            });
            c('.modelsInfo--qt').innerHTML = modalQt;
            c('.modelsWindowArea').style.opacity = 0;
            c('.modelsWindowArea').style.display = 'flex';
            setTimeout(() => {
                c('.modelsWindowArea').style.opacity = 1;
            }, 200);

        });
        modelsArea.append(modelsItem);
    });
}

function filterProducts(category) {
    if (category === 'all') {
        renderProducts(modelsJson);
    } else {
        let filteredProducts = modelsJson.filter(item => item.category === category);
        renderProducts(filteredProducts);
    }
}

c('#filter-racao').addEventListener('click', () => filterProducts('ração'));
c('#filter-brinquedo').addEventListener('click', () => filterProducts('brinquedo'));
c('#filter-higiene').addEventListener('click', () => filterProducts('higiene'));
c('#filter-all').addEventListener('click', () => filterProducts('all'));

renderProducts(modelsJson);

// ----------------------------------- AGENDAMENTO
document.querySelectorAll(".btn-agendar").forEach(button => {
    button.addEventListener("click", function() {
        document.getElementById("modalAgendamento").style.display = "flex";
    });
});

document.querySelector(".close").addEventListener("click", function() {
    document.getElementById("modalAgendamento").style.display = "none";
});

// Fechar o modal de agendamento ao clicar fora dele
window.addEventListener("click", function(event) {
    if (event.target == document.getElementById("modalAgendamento")) {
        document.getElementById("modalAgendamento").style.display = "none";
    }
});

document.getElementById("agendamentoForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const servico = document.getElementById("servico").value;
    const data = document.getElementById("data").value;
    const horario = document.getElementById("horario").value;

    document.getElementById("modalAgendamento").style.display = "none";
    document.getElementById("confirmacaoEmail").classList.remove("hidden");
    
    setTimeout(function() {
        document.getElementById("confirmacaoEmail").classList.add("hidden");
        alert(`Agendamento confirmado!\nNome: ${nome}\nServiço: ${servico}\nData: ${data}\nHorário: ${horario}`);
    }, 3000);
});

// ----------------------------------- ADICIONAR CUPOM E FINALIZAR COMPRA
document.getElementById('btn-finalizar-compra').addEventListener('click', () => {
    alert('Compra realizada com sucesso!');
    cart = []; // Limpa o carrinho
    updateCart();
});

function aplicarCupom() {
    const cupomInput = document.getElementById('cupom-input');
    const cupomCodigo = cupomInput.value.trim();
    
    if (cupomCodigo === 'trabalhotop10') {
        // Aplica o desconto de 10%
        const subtotal = parseFloat(document.querySelector('.subtotal span:last-child').textContent.replace('R$ ', '').replace(',', '.'));
        const desconto = subtotal * 0.10;
        const total = subtotal - desconto;

        // Atualiza os valores no carrinho
        document.querySelector('#desc-10').innerHTML = 'Desconto (-10%)'
        document.querySelector('.desconto span:last-child').textContent = `R$ ${desconto.toFixed(2).replace('.', ',')}`;
        document.querySelector('.total span:last-child').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        
        // Exibe uma mensagem de sucesso
        alert('Cupom aplicado com sucesso!');
    } else {
        // Exibe uma mensagem de erro se o cupom for inválido
        alert('Cupom inválido. Por favor, verifique o código e tente novamente.');
    }

    // Limpa o campo de cupom
    cupomInput.value = '';
}

document.getElementById('btn-aplicar-cupom').addEventListener('click', aplicarCupom);