// 드래그로 스크롤 구현
const arcadeBar = document.getElementById('arcadeBar');
let isDown = false;
let startX, scrollLeft;

arcadeBar.addEventListener('mousedown', (e) => {
    isDown = true;
    arcadeBar.classList.add('active');
    startX = e.pageX - arcadeBar.offsetLeft;
    scrollLeft = arcadeBar.scrollLeft;
});
arcadeBar.addEventListener('mouseleave', () => {
    isDown = false;
    arcadeBar.classList.remove('active');
});
arcadeBar.addEventListener('mouseup', () => {
    isDown = false;
    arcadeBar.classList.remove('active');
});
arcadeBar.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - arcadeBar.offsetLeft;
    const walk = (x - startX) * 1.2;
    arcadeBar.scrollLeft = scrollLeft - walk;
});

// 모바일 터치 지원
let touchStartX = 0;
let touchScrollLeft = 0;
arcadeBar.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].pageX;
    touchScrollLeft = arcadeBar.scrollLeft;
});
arcadeBar.addEventListener('touchmove', function(e) {
    const x = e.touches[0].pageX;
    const walk = (x - touchStartX) * 1.2;
    arcadeBar.scrollLeft = touchScrollLeft - walk;
});

// 태그 종류 17개
const TAGS = [
    "Action", "Air_Hockey","Ball_Toss", "Boxing_Machine", "Claw_Machine", "Dance_Pad", "Dart",
    "Driving_Simulate", "Fighting", "Gun_Shooter", "Punching_Machine", "Puzzle_Game", "Racing",
    "Retro_Game", "Rhythm", "Run_and_Gun", "Sports"
];

// 선택된 태그 관리
const selectedTags = [];
const selectedTagsDiv = document.getElementById('selectedTags');

function renderSelectedTags() {
    selectedTagsDiv.innerHTML = '';
    selectedTags.forEach(tag => {
        const tagDiv = document.createElement('div');
        tagDiv.className = 'selected-tag-label';
        tagDiv.innerText = tag;
        tagDiv.onclick = function() {
            const idx = selectedTags.indexOf(tag);
            if(idx > -1) selectedTags.splice(idx, 1);
            renderSelectedTags();
            document.querySelectorAll('.arcade-img').forEach((img, i) => {
                if(TAGS[i % TAGS.length] === tag) {
                    img.classList.remove('selected');
                }
            });
        };
        selectedTagsDiv.appendChild(tagDiv);
    });
}

document.querySelectorAll('.arcade-img').forEach((img, idx) => {
    img.addEventListener('click', function() {
        let tagName = TAGS[idx % TAGS.length];
        if(img.classList.contains('selected')) {
            img.classList.remove('selected');
            const i = selectedTags.indexOf(tagName);
            if(i > -1) selectedTags.splice(i, 1);
            renderSelectedTags();
        } else {
            img.classList.add('selected');
            if(!selectedTags.includes(tagName)) {
                selectedTags.push(tagName);
                renderSelectedTags();
            }
        }
    });
});

// 오락실 데이터 사전
const arcade_dict = {
    "정글 오락실": {
        "address": "경기도 용인시 처인구 영문로 55 1층",
        "machines": {
            "Dance_Pad": 2,
            "Claw_Machine": 1,
            "Fighting": 2
        },
        "features": ["ATM", "와이파이"]
    },
    "타이거 게임존": {
        "address": "서울특별시 강남구 테헤란로 123",
        "machines": {
            "Racing": 3,
            "Gun_Shooter": 1,
            "Claw_Machine": 1,
            "Puzzle_Game": 2
        },
        "features": ["현금교환기", "주차장"]
    },
    "레트로 플레이": {
        "address": "부산광역시 해운대구 해운대로 456",
        "machines": {
            "Retro_Game": 4,
            "Boxing_Machine": 1,
            "Rhythm": 2
        },
        "features": ["ATM", "24시간"]
    },
    "스포츠 아케이드": {
        "address": "대구광역시 수성구 동대구로 789",
        "machines": {
            "Air_Hockey_Ball_Toss": 2,
            "Sports": 3,
            "Punching_Machine": 1
        },
        "features": ["주차장", "와이파이"]
    },
    "펀펀월드": {
        "address": "인천광역시 남동구 인하로 321",
        "machines": {
            "Claw_Machine": 2,
            "Puzzle_Game": 1,
            "Driving_Simulate": 2
        },
        "features": ["흡연실", "와이파이"]
    }
};

// 리스트 생성 함수 (선택된 태그 기반 필터링)
function showArcadeList() {
    const listDiv = document.getElementById('arcadeList');
    listDiv.innerHTML = '';
    const filteredArcades = Object.entries(arcade_dict).filter(([name, info]) => {
        if (selectedTags.length === 0) return true;
        const machineTags = Object.keys(info.machines);
        return selectedTags.some(tag => machineTags.includes(tag));
    });
    if (filteredArcades.length === 0) {
        listDiv.innerHTML = `<div style="color:#fff;text-align:center;font-size:1.2rem;padding:40px 0;">선택한 태그에 해당하는 오락실이 없습니다.</div>`;
    } else {
        filteredArcades.forEach(([name, info], idx) => {
            let machinesStr = Object.entries(info.machines)
                .map(([type, count]) => `${type.replace(/_/g, ' ')}: ${count}대`)
                .join(', ');
            let featuresHtml = info.features.map(f => `<span class="arcade-feature-tag">${f}</span>`).join('');
            const arcadeData = encodeURIComponent(JSON.stringify({name, ...info}));
            listDiv.innerHTML += `
                <div class="arcade-item">
                    <div class="arcade-info">
                        <div class="arcade-name">${name}</div>
                        <div class="arcade-address">${info.address}</div>
                        <div class="arcade-machines">${machinesStr}</div>
                        <div class="arcade-features">${featuresHtml}</div>
                    </div>
                    <div class="arcade-img-list" style="cursor:pointer;" onclick="location.href='page4.html?arcade=${arcadeData}';"></div>
                </div>
            `;
        });
    }
    listDiv.style.display = 'flex';
}

// 검색 버튼 클릭 시 동작 수정
const searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', function() {
    const bar = document.getElementById('arcadeBar');
    bar.classList.add('moved-down');
    document.getElementById('selectedTags').innerHTML = '';
    document.querySelectorAll('.arcade-img').forEach(img => img.classList.remove('selected'));
    showArcadeList();
});