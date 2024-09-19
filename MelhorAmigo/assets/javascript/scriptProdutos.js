// CARRINHO DE COMPRAS 
let cart = []; // Array do carrinho de compras
let modalQt = 0; // Quantidade inicial dos produtos
let key = 0; // Chave individual do produto

// Constante para carregar estrutura, limpando o código
const loadingFirstItem = (el) => document.querySelector(el); // Para localizar o primeiro item
const loadingAllItens = (el) => document.querySelectorAll(el); // Para localizar todos os itens

//Mapear os dados recebidos via Json
//Criando a lista de produtos, modelos
modelsJson.map((item, index) => {
    let modelsItem = loadingFirstItem('.models .models-item').cloneNode(true);
    modelsItem.setAttribute('data-key', index);
    modelsItem.querySelector('.models-item--img img').src = item.img;
    modelsItem.querySelector('.models-item--price').innerHTML = `R$ ${item.price[0].toFixed(2)}`;
    modelsItem.querySelector('.models-item--name').innerHTML = item.name;
    modelsItem.querySelector('.models-item--desc').innerHTML = item.description;
    modelsItem.querySelector('#btn-buy').addEventListener('click', (e) => {
        e.preventDefault();
        key = e.target.closest('.models-item').getAttribute('data-key');
        modalQt = 1;
        loadingFirstItem('.modelsBig img').src = modelsJson[key].img;
        loadingFirstItem('.modelsInfo h1').innerHTML = modelsJson[key].name;
        loadingFirstItem('.modelsInfo--desc').innerHTML = modelsJson[key].description;
        loadingFirstItem('.modelsInfo--size.selected').classList.remove('selected');
        loadingAllItens('.modelsInfo--size').forEach((size, sizeIndex) => {
            if (sizeIndex == 2) {
                size.classList.add('selected');
                loadingFirstItem('.modelsInfo--actualPrice').innerHTML = `R$ ${modelsJson[key].price[sizeIndex].toFixed(2)}`;
            }
            size.querySelector('span').innerHTML = modelsJson[key].sizes[sizeIndex];
        });
        loadingFirstItem('.modelsInfo--qt').innerHTML = modalQt;
        loadingFirstItem('.modelsWindowArea').style.opacity = 0;
        loadingFirstItem('.modelsWindowArea').style.display = 'flex';
        setTimeout(() => {
            loadingFirstItem('.modelsWindowArea').style.opacity = 1;
        }, 200);
    });
    loadingFirstItem('.models-area').append(modelsItem);
});

//Ações do Modal - Janela
function closeModal() {
    loadingFirstItem('.modelsWindowArea').style.opacity = 0;
    setTimeout(() => {
        loadingFirstItem('.modelsWindowArea').style.display = 'none';
    }, 500);
}

loadingAllItens('.modelsInfo--cancelButton, .modelsInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});

loadingFirstItem('.modelsInfo--qtmenos').addEventListener('click', () => {
    if (modalQt > 1) {
        modalQt--;
        loadingFirstItem('.modelsInfo--qt').innerHTML = modalQt;
    }
});

loadingFirstItem('.modelsInfo--qtmais').addEventListener('click', () => {
    modalQt++;
    loadingFirstItem('.modelsInfo--qt').innerHTML = modalQt;
});

loadingAllItens('.modelsInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', (e) => {
        loadingFirstItem('.modelsInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
        loadingFirstItem('.modelsInfo--actualPrice').innerHTML = `R$ ${modelsJson[key].price[sizeIndex].toFixed(2)}`;
    });
});

let isFirstClick = true;

loadingFirstItem('.modelsInfo--addButton').addEventListener('click', () => {
    let size = parseInt(loadingFirstItem('.modelsInfo--size.selected').getAttribute('data-key'));
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
        loadingFirstItem('aside').style.left = '50vw';
        loadingFirstItem('aside').style.width = '50vw';
        isFirstClick = false;
    }

    loadingFirstItem('.menu-openner span').classList.add('custom-contador');
    updateCart();
    closeModal();
});



// Fechar o modal de produto ao clicar fora dele
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modelsWindowArea')) {
        closeModal();
    }
});

// Ajustando para o mobile
loadingFirstItem('.menu-openner').addEventListener('click', () => {
    if (cart.length > 0) {
        loadingFirstItem('aside').classList.add('show');
        
        // Verifica se a largura da tela é maior que 768px
        if (window.innerWidth < 768) {
            loadingFirstItem('aside').style.left = '0vw';
        } else if (window.innerWidth > 768) {
            loadingFirstItem('aside').style.left = '50vw';
        }
    }
});

loadingFirstItem('.menu-closer').addEventListener('click', () => {
    loadingFirstItem('aside').style.left = '100vw';
});

function updateCart() {
    loadingFirstItem('.menu-openner span').innerHTML = cart.length;
    if (cart.length > 0) {
        loadingFirstItem('aside').classList.add('show');
        loadingFirstItem('.cart').innerHTML = '';
        let subtotal = 0;
        let desconto = 0;
        let total = 0;
        cart.map((itemCart, index) => {
            let modelItem = modelsJson.find((itemBD) => itemBD.id == itemCart.id);
            subtotal += modelItem.price[itemCart.size] * itemCart.qt;
            let cartItem = loadingFirstItem('.models .cart--item').cloneNode(true);
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
            loadingFirstItem('.cart').append(cartItem);
        });
        desconto = subtotal * 0.0;
        total = subtotal - desconto;
        loadingFirstItem('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        loadingFirstItem('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        loadingFirstItem('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;
    } else {
        loadingFirstItem('aside').classList.remove('show');
    }
}

// FILTRO DE PRODUTOS
function renderProducts(products) {
    let modelsArea = loadingFirstItem('.models-area');
    modelsArea.innerHTML = '';
    products.map((item, index) => {
        let modelsItem = loadingFirstItem('.models .models-item').cloneNode(true);
        modelsItem.setAttribute('data-key', index);
        modelsItem.querySelector('.models-item--img img').src = item.img;
        modelsItem.querySelector('.models-item--price').innerHTML = `R$ ${item.price[0].toFixed(2)}`;
        modelsItem.querySelector('.models-item--name').innerHTML = item.name;
        modelsItem.querySelector('.models-item--desc').innerHTML = item.description;
        modelsItem.querySelector('#btn-buy').addEventListener('click', (e) => {
            e.preventDefault();
            key = index;
            modalQt = 1;
            loadingFirstItem('.modelsBig img').src = item.img;
            loadingFirstItem('.modelsInfo h1').innerHTML = item.name;
            loadingFirstItem('.modelsInfo--desc').innerHTML = item.description;
            loadingFirstItem('.modelsInfo--size.selected').classList.remove('selected');
            loadingAllItens('.modelsInfo--size').forEach((size, sizeIndex) => {
                if (sizeIndex === 2) {
                    size.classList.add('selected');
                    loadingFirstItem('.modelsInfo--actualPrice').innerHTML = `R$ ${item.price[sizeIndex].toFixed(2)}`;
                }
                size.querySelector('span').innerHTML = item.sizes[sizeIndex];
            });
            loadingFirstItem('.modelsInfo--qt').innerHTML = modalQt;
            loadingFirstItem('.modelsWindowArea').style.opacity = 0;
            loadingFirstItem('.modelsWindowArea').style.display = 'flex';
            setTimeout(() => {
                loadingFirstItem('.modelsWindowArea').style.opacity = 1;
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

loadingFirstItem('#filter-racao').addEventListener('click', () => filterProducts('ração'));
loadingFirstItem('#filter-brinquedo').addEventListener('click', () => filterProducts('brinquedo'));
loadingFirstItem('#filter-higiene').addEventListener('click', () => filterProducts('higiene'));
loadingFirstItem('#filter-all').addEventListener('click', () => filterProducts('all'));

renderProducts(modelsJson);

// AGENDAMENTO
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
        confirmacaoEmail.classList.add("hidden");
        }, 2500);
});

// ADICIONAR CUPOM E FINALIZAR A COMPRA
document.getElementById('btn-finalizar-compra').addEventListener('click', () => {
    alert('Compra realizada com sucesso!');
    cart = []; // Limpa o carrinho
    updateCart();
});

function aplicarCupom() {
    const cupomInput = document.getElementById('cupom-input');
    const cupomCodigo = cupomInput.value.trim().toLowerCase();
    
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
