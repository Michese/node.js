const toCurrency = (price) => {
    return new Intl.NumberFormat('ru-RU', {
        currency: 'rub',
        style: 'currency'
    }).format(price);
}

const toDateFormat = (date) => {
    return new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(new Date(date));
}

document.querySelectorAll('.price').forEach(node => {
    node.textContent = toCurrency(node.textContent);
})

document.querySelectorAll('.date').forEach(node => {
    node.textContent = toDateFormat(node.textContent);
})

const $card = document.querySelector('#cart');
if ($card) {
    $card.addEventListener('click', event => {
        if (event.target.classList.contains('btn-remove')) {
            fetch('/cart/remove/' + event.target.dataset.id, {
                method: 'delete',
                headers: {
                    'X-XSRF-TOKEN': event.target.dataset.csrf
                }
            }).then(result => result.json())
                .then(card => {
                    if (card.courses.length) {
                        let html = card.courses.map(course => {
                            return `
                            <tr>
                                <td>${course.title}</td>
                                <td>${course.count}</td>
                                <td>
                                    <button class="btn waves-effect waves-light btn-remove" data-id="${course._id} data-csrf="${scrf}">Удалить</button>
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

M.Tabs.init(document.querySelectorAll('.tabs'));