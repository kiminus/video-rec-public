// Video data
const videos = [
    {
        id: 1,
        title: "Introduction to Machine Learning",
        category: "technology",
        tags: ["AI", "ML", "programming"],
        duration: "15:32",
        views: "1.2M",
        icon: "🤖",
        description: "Learn the basics of machine learning and how it's changing the world of technology."
    },
    {
        id: 2,
        title: "Web Development in 2024",
        category: "technology",
        tags: ["web", "programming", "javascript"],
        duration: "22:15",
        views: "890K",
        icon: "💻",
        description: "Explore the latest trends and best practices in modern web development."
    },
    {
        id: 3,
        title: "The Science of Black Holes",
        category: "science",
        tags: ["space", "physics", "astronomy"],
        duration: "18:45",
        views: "2.1M",
        icon: "🌌",
        description: "Dive deep into the fascinating world of black holes and their mysteries."
    },
    {
        id: 4,
        title: "Quantum Computing Explained",
        category: "science",
        tags: ["quantum", "physics", "technology"],
        duration: "20:10",
        views: "1.5M",
        icon: "⚛️",
        description: "Understand the fundamentals of quantum computing and its potential impact."
    },
    {
        id: 5,
        title: "Stand-up Comedy Special",
        category: "entertainment",
        tags: ["comedy", "humor", "performance"],
        duration: "45:00",
        views: "3.2M",
        icon: "🎭",
        description: "Laugh out loud with this hilarious stand-up comedy performance."
    },
    {
        id: 6,
        title: "Music Production Masterclass",
        category: "entertainment",
        tags: ["music", "production", "creative"],
        duration: "35:20",
        views: "750K",
        icon: "🎵",
        description: "Learn professional music production techniques from industry experts."
    },
    {
        id: 7,
        title: "History of Ancient Rome",
        category: "education",
        tags: ["history", "ancient", "culture"],
        duration: "28:30",
        views: "1.8M",
        icon: "🏛️",
        description: "Explore the rise and fall of one of history's greatest empires."
    },
    {
        id: 8,
        title: "Mastering Photography",
        category: "education",
        tags: ["photography", "art", "creative"],
        duration: "25:45",
        views: "920K",
        icon: "📷",
        description: "Learn essential photography skills to capture stunning images."
    },
    {
        id: 9,
        title: "Artificial Intelligence Ethics",
        category: "technology",
        tags: ["AI", "ethics", "society"],
        duration: "19:15",
        views: "680K",
        icon: "🧠",
        description: "Discuss the ethical implications of AI in modern society."
    },
    {
        id: 10,
        title: "Climate Change Science",
        category: "science",
        tags: ["climate", "environment", "earth"],
        duration: "24:50",
        views: "1.3M",
        icon: "🌍",
        description: "Understand the science behind climate change and its global effects."
    },
    {
        id: 11,
        title: "Film Analysis: Classic Cinema",
        category: "entertainment",
        tags: ["film", "cinema", "art"],
        duration: "32:10",
        views: "550K",
        icon: "🎬",
        description: "Analyze the techniques and storytelling of classic cinema masterpieces."
    },
    {
        id: 12,
        title: "Mathematics for Beginners",
        category: "education",
        tags: ["math", "education", "learning"],
        duration: "30:00",
        views: "1.1M",
        icon: "🔢",
        description: "Build a strong foundation in mathematics with clear explanations."
    }
];

let currentVideo = null;

// Recommendation algorithm
function getRecommendations(video, count = 6) {
    // Score videos based on similarity
    const scored = videos
        .filter(v => v.id !== video.id)
        .map(v => {
            let score = 0;
            
            // Same category gets high score
            if (v.category === video.category) {
                score += 50;
            }
            
            // Shared tags increase score
            const sharedTags = v.tags.filter(tag => video.tags.includes(tag));
            score += sharedTags.length * 20;
            
            // Add some randomness for variety
            score += Math.random() * 10;
            
            return { video: v, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, count)
        .map(item => item.video);
    
    return scored;
}

// Create video card HTML
function createVideoCard(video, isRecommendation = false) {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.innerHTML = `
        <div class="video-thumbnail">${video.icon}</div>
        <div class="video-info">
            <div class="video-title">${video.title}</div>
            <div class="video-meta">
                <span class="video-category">${video.category}</span>
                <span>${video.duration}</span>
            </div>
            <div class="video-meta">
                <span>👁️ ${video.views} views</span>
            </div>
            <div class="video-tags">
                ${video.tags.map(tag => `<span class="video-tag">#${tag}</span>`).join(' ')}
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => selectVideo(video));
    return card;
}

// Display selected video
function selectVideo(video) {
    currentVideo = video;
    
    const currentVideoEl = document.getElementById('current-video');
    currentVideoEl.innerHTML = `
        <div class="video-thumbnail">${video.icon}</div>
        <div class="video-title">${video.title}</div>
        <div class="video-meta">
            <span class="video-category">${video.category}</span>
            <span>${video.duration}</span>
            <span>👁️ ${video.views} views</span>
        </div>
        <div class="video-description">${video.description}</div>
        <div class="video-tags">
            ${video.tags.map(tag => `<span class="video-tag">#${tag}</span>`).join(' ')}
        </div>
    `;
    
    // Show selected video section
    document.getElementById('selected-video').classList.remove('hidden');
    
    // Get and display recommendations
    const recommendations = getRecommendations(video);
    const recommendedEl = document.getElementById('recommended-videos');
    recommendedEl.innerHTML = '';
    recommendations.forEach(rec => {
        recommendedEl.appendChild(createVideoCard(rec, true));
    });
    
    // Show recommendations section
    document.getElementById('recommendations').classList.remove('hidden');
    
    // Scroll to selected video
    document.getElementById('selected-video').scrollIntoView({ behavior: 'smooth' });
}

// Display all videos
function displayVideos(filter = 'all') {
    const catalog = document.getElementById('video-catalog');
    catalog.innerHTML = '';
    
    const filtered = filter === 'all' 
        ? videos 
        : videos.filter(v => v.category === filter);
    
    filtered.forEach(video => {
        catalog.appendChild(createVideoCard(video));
    });
}

// Initialize app
function init() {
    // Display all videos initially
    displayVideos();
    
    // Setup category filter
    const categoryFilter = document.getElementById('category-filter');
    categoryFilter.addEventListener('change', (e) => {
        displayVideos(e.target.value);
    });
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
