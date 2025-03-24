class MusicController {
    static init() {
        if (!window.musicInstance) {
            window.musicInstance = new Audio('music.mp3');
            window.musicInstance.loop = true;
            window.musicInstance.volume = 0.45;
            window.musicInstance.autoplay = true;
        }

        this.startMusic();
        this.handlePageChanges();
    }

    static startMusic() {
        const tryPlay = async () => {
            try {
                const savedTime = localStorage.getItem('musicTime');
                if (savedTime) {
                    window.musicInstance.currentTime = parseFloat(savedTime);
                }
                await window.musicInstance.play();
            } catch (e) {
                setTimeout(tryPlay, 100);
            }
        };

        tryPlay();
        
        // Backup autoplay attempts
        window.addEventListener('load', tryPlay);
        document.addEventListener('DOMContentLoaded', tryPlay);
    }

    static handlePageChanges() {
        // Save music position before page unload
        window.addEventListener('beforeunload', () => {
            localStorage.setItem('musicTime', window.musicInstance.currentTime);
        });

        // Handle visibility changes
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && window.musicInstance) {
                window.musicInstance.play();
            }
        });
    }
}

// Start music controller immediately
MusicController.init();