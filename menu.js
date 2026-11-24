document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu-toggle'), nav = document.getElementById('topnav');
    if (menu && nav) {
        menu.addEventListener('click', () => {
            let show = menu.getAttribute('aria-expanded') !== 'true';
            menu.setAttribute('aria-expanded', String(show));
            nav.classList.toggle('nav-open', show)
        });
    }
    const tips = ['실수했을 때는 혼자 해결하려고 하기보다 먼저 상황을 정확히 전달해요!', '첫 출근 전에는 근무시간과 준비물을 담당자에게 다시 확인해요!', '모르는 업무는 추측하지 말고 선배에게 질문하는 것이 안전해요.', '주문과 결제는 작은 차이도 생길 수 있으니 한 번 더 확인해요!', '근무한 날짜와 시간을 개인적으로 기록해 두면 급여 확인에 도움이 돼요.'];
    const tip = document.getElementById('tip-text'), next = document.getElementById('next-tip');
    let ti = 0; if (tip && next) next.addEventListener('click', () => {
        ti = (ti + 1) % tips.length; tip.textContent = tips[ti]
    });
    const toc = document.getElementById('toc-links'), body = document.getElementById('guide-content');
    if (toc && body) {
        body.querySelectorAll('h2').forEach((h, i) => {
            h.id = 'section-' + (i + 1); let a = document.createElement('a');
            a.href = '#' + h.id; a.textContent = String(i + 1).padStart(2, '0') + ' · ' + h.textContent; toc.appendChild(a)
        });
    }
    const toggle = document.getElementById('toc-toggle'); if (toggle && toc) toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') !== 'true';
        toggle.setAttribute('aria-expanded', String(expanded)); toc.hidden = !expanded;
        toggle.textContent = expanded ? '목차 접기⌄' : '목차 펼치기⌃';
    });
    if (body) {
        body.querySelectorAll('h2').forEach(h => {
            if (h.textContent.includes('체크리스트')) {
                let list = h.nextElementSibling;
                if (list && list.tagName === 'UL') {
                    list.classList.add('interactive-checklist');
                    list.querySelectorAll('li').forEach(li => {
                        const t = li.textContent; li.textContent = '';
                        let label = document.createElement('label'), input = document.createElement('input'); input.type = 'checkbox';
                        label.append(input, document.createTextNode(' ' + t)); li.appendChild(label)
                    })
                }
            }
        })
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const results = document.querySelector('[data-search-results]');
    if (!results) return;

    const query = new URLSearchParams(window.location.search).get('q')?.trim();
    if (!query) return;

    const normalize = (text) => text.normalize('NFC').toLowerCase();
    const keywords = normalize(query).split(/\s+/);
    let count = 0;

    for (const card of results.querySelectorAll('article')) {
        const text = normalize(
            Array.from(card.querySelectorAll('h3, .small-tag, p'), (element) => element.textContent)
                .join(' ')
        );
        const matches = keywords.every((keyword) => text.includes(keyword));
        card.hidden = !matches;
        if (matches) count += 1;
    }

    const status = document.getElementById('search-status');
    status.textContent = count
        ? `“${query}” 검색 결과 ${count}개`
        : `“${query}”에 해당하는 검색 결과가 없어요.`;
    status.hidden = false;
    document.getElementById('clear-search').hidden = false;
});