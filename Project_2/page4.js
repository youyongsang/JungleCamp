const machine_detail_dict = {
    "정글 오락실": {
        address: "경기도 용인시 처인구 영문로 55 1층",
        machines: {
            "Dance_Pad": [
                { name: "펌프 잇 업 XX" },
                { count: 2 },
                { desc: "최신 댄스 게임 기계" },
                { writer: "jungler123" },
                { img: null }
            ],
            "Claw_Machine": [
                { name: "크레인 게임" },
                { count: 1 },
                { desc: "인형 뽑기 기계" },
                { writer: "dollmaster" },
                { img: null }
            ],
            "Fighting": [
                { name: "철권 7" },
                { count: 2 },
                { desc: "대전 격투 게임" },
                { writer: "arcadefan" },
                { img: null }
            ]
        }
    },
    "타이거 게임존": {
        address: "서울특별시 강남구 테헤란로 123",
        machines: {
            "Racing": [
                { name: "마리오 카트" },
                { count: 3 },
                { desc: "레이싱 게임" },
                { writer: "speedking" },
                { img: null }
            ],
            "Gun_Shooter": [
                { name: "타임 크라이시스" },
                { count: 1 },
                { desc: "건 슈팅 게임" },
                { writer: "gunner" },
                { img: null }
            ],
            "Claw_Machine": [
                { name: "크레인 게임" },
                { count: 1 },
                { desc: "인형 뽑기" },
                { writer: "dollmaster" },
                { img: null }
            ],
            "Puzzle_Game": [
                { name: "테트리스" },
                { count: 2 },
                { desc: "퍼즐 게임" },
                { writer: "puzzler" },
                { img: null }
            ]
        }
    },
    "레트로 플레이": {
        address: "부산광역시 해운대구 해운대로 456",
        machines: {
            "Retro_Game": [
                { name: "갤러그" },
                { count: 4 },
                { desc: "레트로 슈팅 게임" },
                { writer: "retrofan" },
                { img: null }
            ],
            "Boxing_Machine": [
                { name: "복싱 머신" },
                { count: 1 },
                { desc: "펀치력 측정" },
                { writer: "boxer" },
                { img: null }
            ],
            "Rhythm": [
                { name: "비트매니아" },
                { count: 2 },
                { desc: "리듬 게임" },
                { writer: "rhythmer" },
                { img: null }
            ]
        }
    },
    "스포츠 아케이드": {
        address: "대구광역시 수성구 동대구로 789",
        machines: {
            "Air_Hockey_Ball_Toss": [
                { name: "에어 하키" },
                { count: 2 },
                { desc: "스포츠 게임" },
                { writer: "sportsman" },
                { img: null }
            ],
            "Sports": [
                { name: "농구 게임" },
                { count: 3 },
                { desc: "농구 슈팅" },
                { writer: "basketfan" },
                { img: null }
            ],
            "Punching_Machine": [
                { name: "펀칭 머신" },
                { count: 1 },
                { desc: "펀치력 측정" },
                { writer: "boxer" },
                { img: null }
            ]
        }
    },
    "펀펀월드": {
        address: "인천광역시 남동구 인하로 321",
        machines: {
            "Claw_Machine": [
                { name: "크레인 게임" },
                { count: 2 },
                { desc: "인형 뽑기" },
                { writer: "dollmaster" },
                { img: null }
            ],
            "Puzzle_Game": [
                { name: "테트리스" },
                { count: 1 },
                { desc: "퍼즐 게임" },
                { writer: "puzzler" },
                { img: null }
            ],
            "Driving_Simulate": [
                { name: "드라이빙 시뮬레이터" },
                { count: 2 },
                { desc: "운전 체험" },
                { writer: "driver" },
                { img: null }
            ]
        }
    }
};

let selectedTags = ["ATM"]; // 기본값: ATM만 활성화

function getArcadeFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const arcadeStr = params.get('arcade');
    if (!arcadeStr) return null;
    try {
        return JSON.parse(decodeURIComponent(arcadeStr));
    } catch {
        return null;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const arcade = getArcadeFromQuery();
    if (!arcade) return;

    // 가게명, 주소, 태그 렌더링
    document.querySelector('.store-name').textContent = arcade.name;
    document.querySelector('.store-address').textContent = arcade.address;

    // 태그 렌더링
    const tagGroup = document.querySelector('.tag-group');
    tagGroup.innerHTML = '';
    (arcade.features || []).forEach(tag => {
        const btn = document.createElement('button');
        btn.className = 'tag-btn has';
        btn.textContent = tag;
        tagGroup.appendChild(btn);
    });

    // machine_detail_dict에서 해당 가게의 머신 정보 가져와서 배열로 변환
    let machines = [];
    if (
        machine_detail_dict[arcade.name] &&
        machine_detail_dict[arcade.name].machines
    ) {
        Object.values(machine_detail_dict[arcade.name].machines).forEach(arr => {
            let machineObj = {};
            arr.forEach(obj => {
                Object.assign(machineObj, obj);
            });
            machines.push(machineObj);
        });
    }

    // 머신 리스트 렌더링
    const list = document.querySelector('.machine-list');
    list.innerHTML = '';
    machines.forEach(machine => {
        const card = document.createElement('div');
        card.className = 'machine-card';
        card.innerHTML = `
            <div class="machine-writer">
                <a href="#" class="writer-link" data-writer="${machine.writer}">작성자: ${machine.writer}</a>
            </div>
            <div class="machine-img">${machine.img ? `<img src="${machine.img}" style="width:100%;height:100%;object-fit:cover;">` : ''}</div>
            <div class="machine-count">기계 ${machine.count}대</div>
            <div class="machine-desc">${machine.desc}</div>
        `;
        list.appendChild(card);
    });

    // 팝업 기계 목록 렌더링
    function renderPopupMachineList() {
        const scroll = document.querySelector('.machine-list-scroll');
        scroll.innerHTML = '';
        machines.forEach((machine, idx) => {
            const item = document.createElement('div');
            item.className = 'popup-machine-item';
            item.innerHTML = `
                <span class="machine-name">${machine.name}</span>
                <input class="machine-count-input" type="number" min="1" value="${machine.count}" style="width:48px; margin-right:6px;">
                <label class="machine-upload-label">
                    <input type="file" class="machine-upload-input" accept="image/*" style="display:none;">
                    <span class="machine-upload-btn">사진 업로드</span>
                </label>
                <button class="machine-delete-btn" type="button">삭제</button>
            `;
            // 삭제 버튼 이벤트
            item.querySelector('.machine-delete-btn').onclick = () => {
                machines.splice(idx, 1);
                renderPopupMachineList();
                renderMachineList();
            };
            // 개수 변경 이벤트
            item.querySelector('.machine-count-input').oninput = (e) => {
                machines[idx].count = parseInt(e.target.value) || 1;
                renderMachineList();
            };
            // 사진 업로드 이벤트
            item.querySelector('.machine-upload-btn').onclick = () => {
                item.querySelector('.machine-upload-input').click();
            };
            item.querySelector('.machine-upload-input').onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    const url = URL.createObjectURL(file);
                    machines[idx].img = url;
                    renderMachineList();
                }
            };
            scroll.appendChild(item);
        });
    }

    // 메인 카드 렌더링 함수
    function renderMachineList() {
        list.innerHTML = '';
        machines.forEach(machine => {
            const card = document.createElement('div');
            card.className = 'machine-card';
            card.innerHTML = `
                <div class="machine-writer">
                    <a href="#" class="writer-link" data-writer="${machine.writer}">작성자: ${machine.writer}</a>
                </div>
                <div class="machine-img">${machine.img ? `<img src="${machine.img}" style="width:100%;height:100%;object-fit:cover;">` : ''}</div>
                <div class="machine-count">기계 ${machine.count}대</div>
                <div class="machine-desc">${machine.desc}</div>
            `;
            list.appendChild(card);
        });
    }

    // 팝업 태그 렌더링 함수
    function renderMainTags() {
        const tagGroup = document.querySelector('.tag-group');
        if (!tagGroup) return;
        tagGroup.innerHTML = '';
        const tags = ["ATM", "현금교환기", "주차장", "흡연실", "와이파이", "24시간"];
        tags.forEach(tag => {
            const btn = document.createElement('button');
            btn.className = 'tag-btn' + (selectedTags.includes(tag) ? ' has' : '');
            btn.type = 'button';
            btn.textContent = tag;
            tagGroup.appendChild(btn);
        });
    }

    // infoAddBtn, popup, popupClose, popupConfirm, tagBtns 등 변수 선언
    const infoBtn = document.getElementById('infoAddBtn');
    const popup = document.getElementById('popup');
    const popupClose = document.getElementById('popupClose');
    const popupConfirm = document.querySelector('.popup-confirm-btn');
    const tagBtns = document.querySelectorAll('.tag-btn-group .tag-btn');

    infoBtn.addEventListener('click', function () {
        renderPopupMachineList();
        popup.style.display = 'flex';

        // 팝업 내부의 tag-btn만 선택해서 이벤트 등록
        const popupTagBtns = popup.querySelectorAll('.tag-btn-group .tag-btn');
        popupTagBtns.forEach(function (btn) {
            if (selectedTags.includes(btn.textContent.trim())) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
            btn.onclick = function () {
                btn.classList.toggle('active');
                const tag = btn.textContent.trim();
                if (btn.classList.contains('active')) {
                    if (!selectedTags.includes(tag)) selectedTags.push(tag);
                } else {
                    selectedTags = selectedTags.filter(t => t !== tag);
                }
                renderMainTags();
            };
        });
    });
    popupClose.addEventListener('click', function () {
        popup.style.display = 'none';
    });
    popup.addEventListener('click', function (e) {
        if (e.target === popup) popup.style.display = 'none';
    });
    document.querySelector('.popup-content').addEventListener('click', function(e) {
        e.stopPropagation();
    });

    popupConfirm.addEventListener('click', () => {
        const machineNameInput = document.querySelector('.popup-left input[type="text"].popup-input');
        const machineCountInput = document.querySelector('.popup-left input[type="number"].popup-input');
        const fileInput = document.querySelector('.popup-left input[type="file"].popup-input');
        const machineTypeInput = document.querySelector('.popup-left select.popup-machine-type');
        const name = machineNameInput.value.trim();
        const count = parseInt(machineCountInput.value, 10);
        const type = machineTypeInput.value;

        if (!name || !count || count < 1 || !type) {
            popup.style.display = 'none';
            return;
        }

        let img = null;
        if (fileInput.files[0]) {
            img = URL.createObjectURL(fileInput.files[0]);
        }

        machines.push({
            name: name,
            type: type,
            count: count,
            desc: name,
            recommend: "",
            writer: "admin123",
            img: img
        });

        renderMachineList();
        popup.style.display = 'none';
    });

    document.querySelector('.machine-list').addEventListener('click', function (e) {
        const link = e.target.closest('.writer-link');
        if (!link) return;
        e.preventDefault();
        const writer = link.getAttribute('data-writer');
        const writerPopup = document.getElementById('writer-popup');
        const tbody = document.getElementById('writerEditBody');
        tbody.innerHTML = '';

        const writerMachines = machines.filter(m => m.writer === writer);

        if (writerMachines.length === 0) {
            tbody.innerHTML = `<tr><td colspan="3">수정 내역이 없습니다.</td></tr>`;
        } else {
            writerMachines.forEach(machine => {
                tbody.innerHTML += `
                    <tr>
                        <td>기계 이름</td>
                        <td colspan="2">${machine.name}</td>
                    </tr>
                    <tr>
                        <td>개수</td>
                        <td colspan="2">${machine.count}대</td>
                    </tr>
                    <tr>
                        <td>사진</td>
                        <td colspan="2">
                            ${machine.img ? `<img src="${machine.img}" style="width:60px;height:40px;border-radius:6px;">` : '<div style="width:60px;height:40px;background:#b3d1ff;border-radius:6px;margin:auto;"></div>'}
                        </td>
                    </tr>
                `;
            });
        }
        writerPopup.style.display = 'flex';
    });

    document.getElementById('writerPopupClose').onclick = function () {
        document.getElementById('writer-popup').style.display = 'none';
    };
    document.getElementById('writer-popup').onclick = function (e) {
        if (e.target === this) this.style.display = 'none';
    };
    document.querySelector('.writer-report-btn').onclick = function () {
        alert('신고가 접수되었습니다.');
        document.getElementById('writer-popup').style.display = 'none';
    };

    document.getElementById('backBtn').onclick = function () {
        const arcade = getArcadeFromQuery();
        if (!arcade) {
            location.href = 'page2.html';
            return;
        }
        let machinesObj = {};
        machines.forEach(machine => {
            machinesObj[machine.type || machine.name] = [
                { name: machine.name },
                { count: machine.count },
                { desc: machine.desc },
                { writer: machine.writer },
                { img: machine.img }
            ];
        });
        const newArcade = {
            name: arcade.name,
            address: arcade.address,
            features: selectedTags,
            machines: machinesObj
        };
        const arcadeData = encodeURIComponent(JSON.stringify(newArcade));
        location.href = `page2.html?arcade=${arcadeData}`;
    };
});