// PUBG API 전적 검색 및 결과 애니메이션
function q1() {
	$("#names-q1").empty();
	const playerName = $("#player-name").val().trim();
	const platformRaw = $("#platform").val().trim().toLowerCase();
	const shardMap = {
		steam: "steam",
		"스팀": "steam",
		tmxla: "steam",
		"스침": "steam",
		stim: "steam",
		kakao: "kakao",
		"카카오": "kakao",
		"카카오톡": "kakao",
		psn: "psn",
		"플스": "psn",
		xbox: "xbox",
		"엑박": "xbox",
	};
	const platform = shardMap[platformRaw] || platformRaw;
	const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJlZDliMjc1MC01OTcyLTAxM2UtNWY3MS03NmNhZDljYTc2ODYiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNzU0OTc5ODcwLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6Ii05NzUwYzczNy05MWU0LTQxZTctYjVkMy1lMWVmMDc2MGVkYWYifQ.wzPMT07l_4WHcC2lMVSIx9cVhMTOBys0GI54BB9gbmY";
	if (!playerName || !platform) {
		alert("닉네임과 플랫폼을 모두 입력하세요.");
		return;
	}
	const allowed = ["steam", "kakao", "psn", "xbox"];
	if (!allowed.includes(platform)) {
		alert(`지원하지 않는 플랫폼: ${platform}`);
		return;
	}
	const headers = {
		Authorization: `Bearer ${apiKey}`,
		Accept: "application/vnd.api+json",
	};
	console.log("여기까진 실행");
	$.ajax({
		type: "GET",
		url: `https://api.pubg.com/shards/${platform}/players`,
		headers,
		data: { "filter[playerNames]": playerName },
		success: function (response) {
			console.log("첫번째성공");
			const player = response.data[0];
			const name = player.attributes.name;
			const shardId = player.attributes.shardId;
			const playerId = player.id;
			$.ajax({
				type: "GET",
				url: `https://api.pubg.com/shards/${platform}/players/${playerId}/seasons/lifetime`,
				headers,
				success: function (response) {
					let stats = response?.data?.attributes?.gameModeStats || {};
					let sum = { kills: 0, wins: 0, rounds: 0, time: 0 };
					for (let mode of Object.keys(stats)) {
						let m = stats[mode];
						if (!m) continue;
						sum.kills += m.kills || 0;
						sum.wins += m.wins || 0;
						sum.rounds += m.roundsPlayed || 0;
						sum.time += m.timeSurvived || 0;
					}
					const deaths = sum.rounds - sum.wins;
					const kd = deaths ? sum.kills / deaths : sum.kills;
					const avgSec = sum.rounds ? sum.time / sum.rounds : 0;
					const resultList = [
						`Player Name: ${name}`,
						`Platform: ${shardId}`,
						`Total Matches: ${sum.rounds.toLocaleString()}`,
						`Wins: ${sum.wins.toLocaleString()}`,
						`KD Ratio: ${kd.toFixed(2)}`,
						`Avg. Survival Time: ${avgTime(avgSec)}`,
					];
					showListAnimated(resultList);
				},
			});
		},
		error: function () {
			console.error("error 콘솔 실행");
			showErrorAnimated("None Player");
		},
	});
	function avgTime(timeInSeconds) {
		if (timeInSeconds > 3600) {
			const hours = Math.floor(timeInSeconds / 3600);
			const minutes = Math.floor((timeInSeconds % 3600) / 60);
			const seconds = Math.floor(timeInSeconds % 60);
			return `${hours}시간 ${String(minutes).padStart(2, "0")}분 ${String(seconds).padStart(2, "0")}초`;
		} else if (timeInSeconds > 60) {
			const minutes = Math.floor(timeInSeconds / 60);
			const seconds = Math.floor(timeInSeconds % 60);
			return `${minutes}분 ${String(seconds).padStart(2, "0")}초`;
		} else {
			return `${Math.floor(timeInSeconds)}초`;
		}
	}
	function showListAnimated(list) {
		const $ul = $("#names-q1");
		$ul.empty();
		let delay = 0;
		const bulletImgUrl = "/static/image/bullet.png";
		const $box = $(".center-top-box");
		const baseWidth = 420;
		const baseHeight = 420;
		const growStep = 48;
		list.forEach((html, idx) => {
			setTimeout(() => {
				const $li = $("<li>").css({
					display: "flex",
					alignItems: "center",
					gap: "4px",
					background: "none",
					borderRadius: "0",
					padding: "0",
					marginBottom: "-10px",
					opacity: 0,
					position: "relative",
					left: 0,
					top: 0,
					transform: "scale(0.7)",
					transition: "opacity 0.5s, transform 0.7s cubic-bezier(.4,2,.6,1)",
				});
				const $img = $("<img>")
					.attr("src", bulletImgUrl)
					.attr("alt", "총알")
					.css({
						width: "48px",
						height: "48px",
						flexShrink: 0,
						position: "relative",
						left: "60px",
						opacity: 0,
						transition: "left 0.25s cubic-bezier(.7,2,.6,1), opacity 0.3s",
						zIndex: 2,
					});
				const $text = $("<span>").html(html).css({
					color: "white",
					position: "relative",
					left: "60px",
					opacity: 0,
					transition: "left 0.35s cubic-bezier(.7,2,.6,1), opacity 0.3s",
					zIndex: 1,
					fontSize: "1.5rem",
					letterSpacing: "2px", 
				});
				$li.append($img).append($text);
				$ul.append($li);
				setTimeout(() => {
					$li.css({ opacity: 1, transform: "scale(1)" });
					setTimeout(() => {
						$img.css({ left: "-32px", opacity: 1 });
						setTimeout(() => {
							$text.css({ left: "-25px", opacity: 1 });
						}, 180);
					}, 80);
					$box.css({
						width: baseWidth + growStep * (idx + 1),
						height: baseHeight + growStep * (idx + 1),
						maxWidth: baseWidth + growStep * list.length,
						maxHeight: baseHeight + growStep * list.length,
						transition: "width 0.5s, height 0.5s",
					});
				}, 50);
			}, delay);
			delay += 350;
		});
	}

	// 사용자 검색 실패 시에도 동일한 스타일로 출력
	function showErrorAnimated(message) {
		const $ul = $("#names-q1");
		$ul.empty();
		const bulletImgUrl = "/static/image/bullet.png";
		const $li = $("<li>").css({
			display: "flex",
			alignItems: "center",
			gap: "4px",
			background: "none",
			borderRadius: "0",
			padding: "0",
			marginBottom: "-10px",
			opacity: 0,
			position: "relative",
			left: 0,
			top: 0,
			transform: "scale(0.7)",
			transition: "opacity 0.5s, transform 0.7s cubic-bezier(.4,2,.6,1)",
		});
		const $img = $("<img>")
			.attr("src", bulletImgUrl)
			.attr("alt", "총알")
			.css({
				width: "48px",
				height: "48px",
				flexShrink: 0,
				position: "relative",
				left: "60px",
				opacity: 0,
				transition: "left 0.25s cubic-bezier(.7,2,.6,1), opacity 0.3s",
				zIndex: 2,
			});
		const $text = $("<span>").html(message).css({
			color: "#ff4d4f", // 실패 메시지는 빨간색
			position: "relative",
			left: "60px",
			opacity: 0,
			transition: "left 0.35s cubic-bezier(.7,2,.6,1), opacity 0.3s",
			zIndex: 1,
			fontSize: "1.5rem",
		});
		$li.append($img).append($text);
		$ul.append($li);

		// 박스 크기 초기화 추가
		const $box = $(".center-top-box");
		const baseWidth = 420;
		const baseHeight = 420;
		$box.css({
			width: baseWidth,
			height: baseHeight,
			maxWidth: baseWidth,
			maxHeight: baseHeight,
			transition: "width 0.5s, height 0.5s",
		});

		setTimeout(() => {
			$li.css({ opacity: 1, transform: "scale(1)" });
			setTimeout(() => {
				$img.css({ left: "-32px", opacity: 1 });
				setTimeout(() => {
					$text.css({ left: "-25px", opacity: 1 });
				}, 180);
			}, 80);
		}, 50);
	}
}

// UI 및 애니메이션, 이벤트 전체 통합
$(function () {
	// 팬 이미지 경로
	const panNormal = "/static/image/pan.png"; // 경로 수정
	const panLoading = "/static/image/pan_loading.png"; // 경로 수정

	// 로딩 애니메이션 제어
	function startLoadingAnim() {
		$("#pan-loading-img").addClass("pan-tilt");
	}
	function stopLoadingAnim() {
		$("#pan-loading-img").removeClass("pan-tilt");
	}

	// 검색 버튼 hover 시 팬 이미지 변경
	$("#search-button").on("mouseenter", function () {
		$("#pan-img").attr("src", panLoading);
	});
	$("#search-button").on("mouseleave", function () {
		$("#pan-img").attr("src", panNormal);
	});

	// 검색 버튼 클릭 시
	$("#search-button").on("click", function () {
		q1();
	});

	// 엔터 입력 시 검색
	$("#player-name, #platform").on("keydown", function (e) {
		if (e.key === "Enter") {
			$("#search-button").click();
		}
	});

	// ajaxStart에서 3초간 로딩
	$(document).ajaxStart(function () {
		console.log("ajaxStart 실행");
		$("#loading").removeClass("hidden");
		$("#pan-img").attr("src", panLoading);
		startLoadingAnim();
	});
	$(document).ajaxStop(function () {
		console.log("ajaxStop 실행");
		$("#loading").addClass("hidden");
		$("#search-button").prop("disabled", false);
		$("#pan-img").attr("src", panNormal);
		stopLoadingAnim();
	});

	// 시작 버튼 클릭 시 center-top-box 활성화, 버튼 숨김, 음악 재생
	$("#start-search-btn").on("click", function () {
		$(this).fadeOut(300, function () {
			$(".center-top-box").fadeIn(300);
		});
		const bgm = document.getElementById("bgm");
		if (bgm) {
			bgm.play();
		}
	});

	// 낙하산 애니메이션 및 폭발 효과, 킬 카운트, 게임 버튼 노출
	const parachuteImgUrl = "/static/image/parachute.png"; // 경로 수정
	let killCount = 0;
	let goPlayShown = false;
	function showExplosion(x, y, size = 120) {
		const explosion = document.createElement("img");
		explosion.src = "/static/image/explosion.png"; // 경로 수정
		explosion.alt = "폭발";
		explosion.style.position = "fixed";
		explosion.style.left = x - size / 2 + "px";
		explosion.style.top = y - size / 2 + "px";
		explosion.style.width = size + "px";
		explosion.style.height = size + "px";
		explosion.style.pointerEvents = "none";
		explosion.style.zIndex = 9999;
		explosion.style.opacity = 0.95;
		explosion.style.transition = "opacity 0.5s";
		document.body.appendChild(explosion);
		setTimeout(() => {
			explosion.style.opacity = 0;
			setTimeout(() => explosion.remove(), 500);
		}, 350);
	}
	function spawnParachute() {
		const area = document.getElementById("parachute-area");
		const parachute = document.createElement("img");
		parachute.className = "parachute";
		parachute.src = parachuteImgUrl;
		parachute.alt = "낙하산";
		parachute.style.pointerEvents = "auto";
		const scale = 2 + Math.random() * 3;
		const baseWidth = 60, baseHeight = 80;
		const width = baseWidth * scale;
		const height = baseHeight * scale;
		parachute.style.width = width + "px";
		parachute.style.height = height + "px";
		parachute.style.top = -height + "px";
		const startLeft = Math.random() * (window.innerWidth - width);
		parachute.style.left = `${startLeft}px`;
		const duration = 3 + Math.random() * 4;
		parachute.style.animationDuration = duration + "s";
		const wind = Math.random();
		let windDir = 0;
		if (wind < 0.33) windDir = -1;
		else if (wind > 0.66) windDir = 1;
		const windDist = (100 + Math.random() * 300) * windDir;
		const anim = parachute.animate([
			{
				top: -height + "px",
				left: startLeft + "px",
				transform: "rotate(0deg)",
			},
			{
				top: "110vh",
				left: startLeft + windDist + "px",
				transform: `rotate(${windDir * 20}deg)`,
			},
		], {
			duration: duration * 1000,
			easing: "linear",
			fill: "forwards",
		});
		area.appendChild(parachute);
		parachute.addEventListener("click", function (e) {
			e.stopPropagation();
			e.preventDefault();
			if (parachute._clicked) return;
			parachute._clicked = true;
			const rect = parachute.getBoundingClientRect();
			const x = rect.left + rect.width / 2;
			const y = rect.top + rect.height / 2;
			showExplosion(x, y, Math.max(parachute.width, parachute.height) * 1.1);
			parachute.remove();
			killCount++;
			const killCounter = document.getElementById("kill-counter");
			if (killCounter.style.display === "none") {
				killCounter.style.display = "block";
			}
			document.getElementById("kill-count").textContent = killCount;
			if (killCount > 5 && !goPlayShown) {
				goPlayShown = true;
				const btn = document.getElementById("go-play-btn");
				btn.classList.add("show");
			}
		});
		setTimeout(() => {
			parachute.remove();
		}, duration * 1000 + 100);
	}
	setInterval(() => {
		if (Math.random() < 0.7) {
			spawnParachute();
		}
	}, 500 + Math.random() * 700);

	// 파티클 효과 (총알 트레일)
	if ($("#power-canvas").length === 0) {
		$("body").append('<canvas id="power-canvas" style="position:fixed;left:0;top:0;width:100vw;height:100vh;pointer-events:none;z-index:9999;"></canvas>');
	}
	const canvas = document.getElementById("power-canvas");
	const ctx = canvas.getContext("2d");
	let W = 0, H = 0;
	const DPR = Math.max(1, window.devicePixelRatio || 1);
	function resizeCanvas() {
		W = window.innerWidth;
		H = window.innerHeight;
		canvas.width = W * DPR;
		canvas.height = H * DPR;
		canvas.style.width = W + "px";
		canvas.style.height = H + "px";
		ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
	}
	resizeCanvas();
	window.addEventListener("resize", resizeCanvas);
	const COLORS = ["#ff9800", "#ffc107", "#ffd700", "#fff176"];
	const GRAVITY = 0.12, FRICTION = 0.96, PARTICLE_BASE = 8;
	let particles = [];
	function spawn(x, y, amount = PARTICLE_BASE, power = 1200) {
		for (let i = 0; i < amount; i++) {
			const ang = Math.random() * Math.PI * 2;
			const spd = power * (0.8 + Math.random() * 50);
			const color = COLORS[Math.floor(Math.random() * COLORS.length)];
			particles.push({
				x,
				y,
				vx: Math.cos(ang) * spd,
				vy: Math.sin(ang) * spd - 8,
				life: 1200 + Math.random() * 300,
				r: 16 + Math.random() * 3.5,
				color: color,
			});
		}
	}
	const BULLET_IMG = new Image();
	BULLET_IMG.src = "/static/image/bullet.png"; // 경로 수정
	function loop() {
		ctx.clearRect(0, 0, W, H);
		for (let i = particles.length - 1; i >= 0; i--) {
			const p = particles[i];
			if (!p.prev) p.prev = { x: p.x, y: p.y };
			p.vx *= FRICTION;
			p.vy = p.vy * FRICTION + GRAVITY;
			p.x += p.vx;
			p.y += p.vy;
			p.life -= 1;
			const a = Math.max(0, Math.min(1, p.life / 1200));
			ctx.globalAlpha = a;
			ctx.save();
			ctx.translate(p.x, p.y);
			ctx.rotate(Math.atan2(p.vy, p.vx));
			ctx.drawImage(BULLET_IMG, -p.r, -p.r, p.r * 2, p.r * 2);
			ctx.restore();
			p.prev = { x: p.x, y: p.y };
			if (p.life <= 0 || p.x < -50 || p.x > W + 50 || p.y > H + 50)
				particles.splice(i, 1);
		}
		ctx.globalAlpha = 1;
		requestAnimationFrame(loop);
	}
	requestAnimationFrame(loop);
	function caretInInput(el) {
		const isInput = el.tagName === "INPUT";
		const div = document.createElement("div");
		const cs = getComputedStyle(el);
		[
			"font-size",
			"font-family",
			"font-weight",
			"font-style",
			"letter-spacing",
			"text-transform",
			"text-indent",
			"text-align",
			"line-height",
			"padding-top",
			"padding-right",
			"padding-bottom",
			"padding-left",
			"border-top-width",
			"border-left-width",
			"box-sizing",
			"white-space",
			"word-wrap",
			"overflow-wrap",
			"width",
			"height",
		].forEach((p) => (div.style[p] = cs[p]));
		div.style.position = "absolute";
		div.style.visibility = "hidden";
		div.style.whiteSpace = isInput ? "pre" : "pre-wrap";
		div.style.wordWrap = "break-word";
		const before = el.value.substring(0, el.selectionStart);
		const afterChar = el.value.substring(el.selectionStart)[0] || ".";
		div.textContent = before;
		const span = document.createElement("span");
		span.textContent = afterChar;
		div.appendChild(span);
		el.parentNode.appendChild(div);
		const sRect = span.getBoundingClientRect();
		el.parentNode.removeChild(div);
		const x = sRect.left + 20;
		const y = sRect.top - 20;
		return { x: x, y: y };
	}
	$(".center-top-box input[type='text'], .center-top-box textarea, .center-top-box [contenteditable]").on("keydown", function (e) {
		const pos = caretInInput(this);
		if (!pos) return;
		const boost = e.key === "Enter" ? 20 : 0;
		if (e.key === "Backspace") {
			const $box = $(".center-top-box");
			const shakeX = Math.round((Math.random() - 0.5) * 16);
			const shakeY = Math.round((Math.random() - 0.5) * 16);
			const shakeX2 = Math.round((Math.random() - 0.5) * 10);
			const shakeY2 = Math.round((Math.random() - 0.5) * 10);
			$box[0].style.setProperty("--shake-x", `${shakeX}px`);
			$box[0].style.setProperty("--shake-y", `${shakeY}px`);
			$box[0].style.setProperty("--shake-x2", `${shakeX2}px`);
			$box[0].style.setProperty("--shake-y2", `${shakeY2}px`);
			$box.removeClass("shake");
			void $box[0].offsetWidth;
			$box.addClass("shake");
			setTimeout(() => $box.removeClass("shake"), 150);
			return;
		}
		const pow = e.key === "Backspace" ? 0 : 2.3;
		spawn(pos.x, pos.y, PARTICLE_BASE + boost, pow);
	});
});
