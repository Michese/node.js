const toCurrency = (price) => {
    return new Intl.NumberFormat('ru-RU', {
        currency: 'rub',
        style: 'currency'
    }).format(price);
}

document.querySelectorAll('.price').forEach(node => {
    node.textContent = toCurrency(node.textContent);
})

const $card = document.querySelector('#cart');
if ($card) {
    $card.addEventListener('click', event => {
        if (event.target.classList.contains('btn-remove')) {
            fetch('/cart/remove/' + event.target.dataset.id, {
                method: 'delete'
            }).then(result => result.json())
                .then(card => {
                    if (card.courses.length) {
                        let html = card.courses.map(course => {
                            return `
                            <tr>
                                <td>${course.title}</td>
                                <td>${course.count}</td>
                                <td>
                                    <button class="btn waves-effect waves-light btn-remove" data-id="${course._id}">Удалить</button>
                                </td>
                            </tr>
                            `;
                        }).join('');

                        $card.querySelector('tbody').innerHTML = html;
                        $card.querySelector('.price').textContent = toCurrency(card.price);
                    } else {
                        $card.innerHTML = '<p>Корзина пуста</p>';
                    }
                });
        }

    })
}