document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('cosmic-canvas');
    const instructions = document.getElementById('instructions');
    
    function createStars() {
        const starCount = 100;
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.width = `${Math.random() * 3 + 1}px`;
            star.style.height = star.style.width;
            star.style.animationDuration = `${Math.random() * 2 + 1.5}s`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            canvas.appendChild(star);
        }
    }

    function createFireflies() {
        setInterval(() => {
            if (document.visibilityState === "hidden") return; 
            const firefly = document.createElement('div');
            firefly.className = 'firefly';
            firefly.style.left = `${Math.random() * 100}%`;
            const duration = Math.random() * 10 + 8;
            firefly.style.animationDuration = `${duration}s`;
            firefly.style.setProperty('--drift-x', `${Math.random() * 200 - 100}px`);
            
            canvas.appendChild(firefly);
            
            setTimeout(() => {
                firefly.remove();
            }, duration * 1000);

        }, 400); 
    }
    
    createStars();
    createFireflies();

    canvas.addEventListener('click', (e) => {
         if (!instructions.classList.contains('hidden')) {
            instructions.style.transition = 'opacity 0.5s';
            instructions.style.opacity = '0';
            setTimeout(() => instructions.classList.add('hidden'), 500);
        }

        const ripple = document.createElement('div');
        ripple.className = 'click-ripple';
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        canvas.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());

        createFlower(e.clientX, e.clientY);
    });

    function createFlower(x, y) {
        const wrapper = document.createElement('div');
        wrapper.className = 'flower-wrapper';
        
        const art = document.createElement('div');
        art.className = 'flower-art';

        const stem = document.createElement('div');
        stem.className = 'flower-stem';

        const head = document.createElement('div');
        head.className = 'flower-head';
        
        const center = document.createElement('div');
        center.className = 'flower-center';

        const growTime = Math.random() * 1.5 + 1;
        const stemHeight = Math.random() * 100 + (window.innerHeight - y - 50);
        
        const baseHue = 300 + Math.random() * 60; 

        wrapper.style.setProperty('--pos-x', `${x}px`);
        stem.style.setProperty('--grow-time', `${growTime}s`);
        stem.style.setProperty('--stem-height', `${Math.min(stemHeight, window.innerHeight * 0.8)}px`);
        head.style.setProperty('--grow-time', `${growTime}s`);
        center.style.setProperty('--grow-time', `${growTime}s`);
        
        const petalLayers = [
            { count: 10, bloomTime: 1.5, offset: 0 },
            { count: 10, bloomTime: 1.5, offset: 18 } 
        ];
        
        petalLayers.forEach((layer) => {
             for (let i = 0; i < layer.count; i++) {
                const petal = document.createElement('div');
                petal.className = 'flower-petal';
                const angle = (360 / layer.count) * i + layer.offset;
                
                petal.style.setProperty('--angle', `${angle}deg`);
                petal.style.setProperty('--hue', `${baseHue}`);
                petal.style.setProperty('--bloom-time', `${layer.bloomTime}s`);
                petal.style.animationDelay = `${growTime * 0.8 + Math.random() * 0.5}s`;
                
                head.appendChild(petal);
            }
        });
       
        head.appendChild(center);
        art.appendChild(head);
        art.appendChild(stem);
        wrapper.appendChild(art);
        canvas.appendChild(wrapper);
    }
});
