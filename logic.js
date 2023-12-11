import anime from './assets/anime.js';

// for syntax highlighting :]
const html = (str, ...args) => {
    let result = str[0];
    for ( let i = 1, l = str.length; i < l; i++ ) {
    result += args[i - 1] + str[i];
    }
    return result;
};
const sleep = ms => new Promise(r => setTimeout(r, ms));

const rd_input = document.querySelector('input[type="rd"]');

const rd_regular = "22 12 17 12 15 3 13 21 10 6 9 12 2 12";
const rd_flat_line = "22 12 17 12 15 12 13 12 10 12 9 12 2 12";

rd_input.addEventListener('focus', async () => {
    doIt();
});

async function doIt() {
    document.activeElement.blur();
    anime({
        targets: rd_input,
        translateY: -13.75,
        translateX: -12.75,
        scale: 0.99,
        "border-bottom": "2.8px solid white",
        "border-radius": "0"
    });

    await sleep(400);

    rd_input.outerHTML = html`
    <div class="container rd">
        <div class="line7">
            <div class="rd 7beat"></div>
            <div class="rd 7beat"></div>
            <div class="rd 7beat"></div>
            <div class="rd 7beat"></div>
            <div class="rd 7beat"></div>
            <div class="rd 7beat"></div>
            <div class="rd 7beat"></div>
            <div class="rd heart"></div>
        </div>
        <p id="time" style="text-align: center"></p>
        <style>
            div.rd {
                min-width: 30px;
                margin: -2px;
            }

            .line7 {
                display: flex;
            }
        </style>
    </div>
    `
    const cardiogram = document.querySelector('.rd.container');
    
    let start_time, end_time, deltaTime, beat = 0, dbeat = 0;
    let normal_beats = document.querySelectorAll('.rd.\\37 beat');
    let clap = new Audio('assets/clap.wav'), kick = new Audio('assets/kick.wav');
    let kys = new Audio('assets/urtrash.wav');
    let clicked = false, pass = 5, over = false;
    normal_beats.forEach(el => {
        el.innerHTML = html`
        <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="${rd_flat_line}"></polyline>
        </svg>
        `
    });
    await sleep(500);

    var heart = document.querySelector('.rd.heart');
    heart.innerHTML = html`
    <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
        </path>
    </svg>
    `
    
    anime({
        targets: heart,
        scale: [0, 1],
        rotateZ: 10,
        translateX: -3
    });
    await sleep(1500);
    
    var start = Date.now();
    // BPB = beats per bar, BS = beat spacing
    const BPM = 420, BPB = 7, BS = 0.2;
    const SPB = 60 / BPM;
    RAFManager.add(() => {
        if (over) throw new Error("Fuck you.");
        if (pass == 1) location.href = `/gg.html#${document.querySelector('#username').value}`;
        start_time = (Date.now() - start) / 1000;
        let bar_time = (start_time % (SPB * BPB + BS));
        let is_cooldown = bar_time < BS;
        if (is_cooldown) {
            beat = 0;
        } else {
            beat = Math.ceil((bar_time - BS) / SPB);
        }

        document.querySelector("#time").innerHTML = html`
            <!-- Time: ${start_time}s <br> -->
            <!-- Beat: ${beat} -->
            Do it ${pass} more times.
        `;

        anime({
            targets: ".rd.\\37 shot > svg > polyline",
            points: rd_regular,
            easing: "cubicBezier(0.000, 1.105, 0.000, 0.935);",
            // delay: anime.stagger(500, {start: 1000})
        });

        anime({
            targets: ".rd.\\37 beat > svg > polyline",
            points: rd_flat_line,
            easing: "cubicBezier(0.000, 1.105, 0.000, 0.935);",
            // delay: anime.stagger(500, {start: 1000})
        });

        var line7 = document.querySelectorAll('.line7');

        line7.forEach(el => {
            for (const beat_el of el.children) {
                beat_el.classList.replace('7shot', '7beat');
            }
            try {
                el.children[beat - 1].classList.replace('7beat', '7shot');
            } catch (e) {}
        });

        end_time = (Date.now() - start) / 1000;
        deltaTime = end_time - start_time;

        if (dbeat != beat && beat) {
            kick.load();
            if (beat != BPB) {
                kick.play();
            }
        }

        if (beat == 1) clicked = false;

        document.addEventListener('click', () => {
            if (clicked) return;
            clicked = true;
            if (beat != BPB) {
                kys.load();
                kys.play();
                cardiogram.innerHTML = 'Nope.';
                over = true;
                throw new Error('Fuck you.');
            } else {
                pass--;
                clap.load();
                clap.play();
            }
        });

        if (beat == 0 && dbeat == BPB && !clicked) {
            kys.load();
            kys.play();
            cardiogram.innerHTML = 'Nope.';
            over = true;
            throw new Error('Fuck you.');
        }

        dbeat = beat;
    });
};